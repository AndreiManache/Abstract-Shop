let result;

async function getList(){
    let response = await fetch("https://baza-de-date-project.firebaseio.com/.json");
    result = await response.json();

    document.querySelector("#loader").style.display = "none";
    document.querySelector(".wrapper").classList.remove("hide");

    draw();
    
}


function draw(){
    let str = "";


for(let i in result){
    str += `<div class="col-xs-12 col-sm-6 col-lg-4">

                <div class="box">

                    <a href="detalii.html?idItem=${[i]}" id="item" target="_blank">

                            <img src="${result[i].image}" alt="imagine">
                            

                        <div class="access">

                            <span id="name">${result[i].name}</span>
                            <span>${result[i].price} $</span>
                    
                        </div>
                    </a>

                </div>
            </div>`;
}
    document.querySelector(".wrapper").innerHTML = str;

}
