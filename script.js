let result;

async function getList(){
    let response = await fetch("https://baza-de-date-project.firebaseio.com/.json");
    result = await response.json();
    draw();
    
}


function draw(){
    let str = "";


for(let i in result){
    str += `
    <div class="col-xs-12 col-sm-6 col-lg-4">
        <div class="box">
            <img src="${result[i].image}" alt="imagine">
            <p>${result[i].name}</p>
            <div class="access">
            <span>${result[i].price} $</span>
            <button class="detalii">Detalii</button>
            </div>
        </div>
    </div>`;
}
    document.querySelector(".wrapper").innerHTML = str;

}
