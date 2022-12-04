const btnUpload = document.getElementsByClassName("btn-upload")[0]

function handleClickUpload(event) {
    const form = document.getElementById('upload-form')
    const data = new URLSearchParams()
    for (const pair of new FormData(form)) {
        data.append(pair[0], pair[1])
    }

    fetch('/api/v1/mark', {
        method: "POST", 
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then((response) => {
        console.log(response.status)
        createUploadResult(response.status == 200)
        if (response.status == 200){
            createMarksTableRow(data)
        }
        form.reset()
    })
}

function createMarksTableRow(data){
    const table = document.getElementsByClassName("table")[0]
    const tr = document.createElement("tr")
    const tableBody = table.tBodies[0]

    const th = document.createElement("th")
    th.innerHTML = table.rows.length
    tr.appendChild(th)

    const td1 = document.createElement("td")
    const td2 = document.createElement("td")

    td1.innerHTML = data.get("mark") 
    td2.innerHTML = data.get("comment") 
    tr.appendChild(td1)
    tr.appendChild(td2)

    tableBody.appendChild(tr)
}

function createUploadResult(result){
    try{ document.getElementsByClassName("upload-result-p")[0].remove() } catch {}

    const relative = document.getElementsByClassName("result-container")[0]
    const p = document.createElement("p")
    p.classList.add("mt-3", "upload-result-p")
    
    if(result) {
        p.innerHTML = "Success"
        p.classList.add("text-success")
    } else {
        p.innerHTML = "Failure"
        p.classList.add("text-danger")
    }

    relative.appendChild(p)
}

btnUpload.addEventListener('click', handleClickUpload)