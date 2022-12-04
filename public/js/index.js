const btnUpload = document.getElementsByClassName("btn-upload")[0]
const btnGetList = document.getElementsByClassName("btn-get-list")[0]

function handleClickUpload(event) {
    const form = document.getElementById('upload-form')
    const formData = new FormData(form)
    fetch('/api/v1/upload', {
        method: "POST", 
        body: formData
    })
    .then((response) => {
        console.log(response.status)
        createUploadResult(response.status == 200)
        form.reset()
    })
}

function createUploadResult(result){
    const relative = document.getElementsByClassName("form-container")[0]
    const p = document.createElement("p")
    p.classList.add("mt-3")
    
    if(result) {
        p.innerHTML = "Success"
        p.classList.add("text-success")
    } else {
        p.innerHTML = "Failure"
        p.classList.add("text-danger")
    }

    relative.appendChild(p)
}

function handleClickGetList(event) {
    fetch('/api/v1/files/list', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        addListElement(JSON.parse(data))
    })
}

function addListElement(data){
    const ul = document.getElementsByClassName("files-list")[0]

    data.forEach(element => {
        const li = document.createElement("li")

        li.classList.add("list-group-item")
        li.addEventListener('click', (event) => openInNewTab(`view-file/${element.id}`))
        li.innerHTML = element.filename
        ul.appendChild(li)
    })
}

function openInNewTab(url) {
    window.open(url, '_blank').focus()
}

btnUpload.addEventListener('click', handleClickUpload)
btnGetList.addEventListener('click', handleClickGetList)