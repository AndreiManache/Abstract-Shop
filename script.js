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

function drawSearch(){
    let str = "";
    let input = document.querySelector("#nav li input").value;

for(let i in result){

    if(result[i].name.toLowerCase().indexOf(input) > -1 || result[i].about.toLowerCase().indexOf(input) > -1){

        document.querySelector(".backGround").style.display = "none";
        document.querySelector("#message").innerHTML = `Search results for "${input}"... `;

    
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
          }else{
            document.querySelector(".backGround").style.display = "none";
            document.querySelector("#message").innerHTML = `Oopss! there are no results for "${input}"... `;
          }  
}
    document.querySelector(".wrapper").innerHTML = str;

    if(input === ""){
        document.querySelector("#message").style.display = "none";
        document.querySelector(".backGround").style.display = "flex";
    }

}
