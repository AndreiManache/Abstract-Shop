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
    let input = window.location.search.substr(4);
    let found = false;

    for(let i in result){

        if(result[i].name.toLowerCase().indexOf(input) > -1 || result[i].about.toLowerCase().indexOf(input) > -1){
            str += `<div class="col-xs-12 col-sm-6 col-lg-4">

                        <div class="box">

                            <a href="detalii.html?idItem=${[i]}" id="item">

                                    <img src="${result[i].image}" alt="imagine" class="main_img">
                                    

                                    <div class="access">

                                        <span id="name">${result[i].name}</span>
                                        <span>${result[i].price}$</span>
                                
                                    </div>
                            </a>

                        </div>
                    </div>`;
                
        }

        if(result[i].name.toLowerCase().indexOf(input) !== -1) {
            found = true;
        }
        
    }

    if(input === ""){

        document.querySelector("#message").style.display = "none";
        document.querySelector(".backGround").style.display = "";
        document.querySelector(".carousel").style.display = "block";

    }else if(found === false){
        
        document.querySelector(".backGround").style.display = "none";
        document.querySelector(".carousel").style.display = "none";
        document.querySelector("#h1").style.display = "none";
        document.querySelector("#message").innerHTML = `Ooops! There were no results for "${input}"... `;
        document.querySelector(".bk_to_school").style.display = "block";
        document.querySelector(".showDesktop input").value = "";
        
    }else{
        document.querySelector(".backGround").style.display = "none";
        document.querySelector(".carousel").style.display = "none";
        document.querySelector("#h1").style.display = "none";
        document.querySelector("#message").style.display = "block";
        document.querySelector("#message").innerHTML = `Search results for "${input}"... `;
        document.querySelector(".showDesktop input").value = "";
    }

    document.querySelector(".wrapper").innerHTML = str;

}

function drawSearch(){

    let input = document.querySelector(".showDesktop input").value;
    window.location = "index.html?id="+input;
    
}





