const btnUpload = document.getElementsByClassName("btn-upload")[0]

function handleClickUpload(event) {
    const form = document.getElementById('upload-form')
    const data = new URLSearchParams();
    for (const pair of new FormData(form)) {
        data.append(pair[0], pair[1]);
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
            createMarksTableRow()
        }
        form.reset()
    })
}

function createMarksTableRow(){

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

btnUpload.addEventListener('click', handleClickUpload)