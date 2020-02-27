let item;

async function getItem(){

    let id = window.location.search.substr(8);
    let accessDb = await fetch(`https://baza-de-date-project.firebaseio.com/${id}.json`)
    item = await accessDb.json();

    draw();

}

function draw(){

    document.querySelector("#poza").src = item.image;
    document.querySelector("#detalii").innerHTML = item.about;

}

function drawSearch(){

    let input = document.querySelector("#nav li input").value;
    window.location = "index.html?id="+input;
    return;

}