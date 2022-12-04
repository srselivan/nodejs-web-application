const db = require("../storage/database/database.js")

async function upload_file(req, res) {
    try {
        const filedata = req.file;     

        const query = {
            text: 'INSERT INTO files VALUES(DEFAULT, $1, 0)',
            params: [filedata.filename],
        }

        await db.query(query.text, query.params)
        res.sendStatus(200)

    } catch(error) {
        console.log(error.stack)
        res.sendStatus(400)
    }
}

async function set_mark(req, res) {  
    try {
        const query = {
            text: 'INSERT INTO marks VALUES($1, $2, $3)',
            params: [req.body.id, req.body.mark, req.body.comment],
        }
        await db.query(query.text, query.params)

        const queryUpdate = {
            text: 'UPDATE files SET count_marks = (SELECT count_marks FROM files WHERE id = $1) + 1 WHERE id = $1',
            params: [req.body.id],
        }
        await db.query(queryUpdate.text, queryUpdate.params)

        res.sendStatus(200)

    } catch(error) {
        console.log(error.stack)
        res.sendStatus(400)
    }
}

module.exports = {
    upload_file,
    set_mark,
}