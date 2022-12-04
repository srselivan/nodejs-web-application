const db = require("../storage/database/database.js")
const path = require("path")

function get_index_page(req, res) {
    try{
        res.render('pages/index')

    } catch(error) {
        console.log(error.stack)
        res.sendStatus(500)
    }
}

async function get_files_page(req, res) {
    try {
        const query = {
            text: 'SELECT * FROM marks WHERE file_id = $1',
            params: [req.params.id],
        }

        const { rows } = await db.query(query.text, query.params)

        res.render('pages/view-file', {
            id: req.params.id,
            tableData: rows
        })
        
    } catch(error) {
        console.log(error.stack)
        res.sendStatus(500)
    }
}

async function get_list_files(req, res) {
    try {
        const query = {
            text: 'SELECT * FROM files LIMIT 3',
            params: [],
        }

        const { rows } = await db.query(query.text, query.params)

        res.setHeader('Content-Type', 'application/json')
        res.json(JSON.stringify(rows))
        
    } catch(error) {
        console.log(error.stack)
        res.sendStatus(400)
    }
}

async function get_file(req, res) {
    try {
        const query = {
            text: 'SELECT filename FROM files WHERE id = $1',
            params: [req.params.id],
        }

        const { rows } = await db.query(query.text, query.params)
        const fileName = rows[0].filename
        res.sendFile(fileName, {root: path.join(__dirname, "../storage/file_storage")})
        
    } catch(error) {
        console.log(error.stack)
        res.sendStatus(400)
    }
}

module.exports = {
    get_index_page,
    get_files_page,
    get_list_files,
    get_file
}