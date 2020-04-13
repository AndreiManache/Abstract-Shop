let result;

async function getList(){
    let response = await fetch("https://baza-de-date-project.firebaseio.com/.json");
    result = await response.json();

    document.querySelector("footer").classList.remove("margin");
    document.querySelector("#loader").style.display = "none";
    document.querySelector(".wrapper").classList.remove("hide");

    draw();
    
}


function draw(){
    let str = "";


    let url = new URL(window.location.search, window.location);
    let searchParams = url.searchParams;
    let input = "";
    
        for(let [key,val] of searchParams){
                console.log(key,val);
                
	            if(key==="id"){
		        input=val;
		        break;
                }
            }



    let found = false;

    for(let i in result){

        if(result[i].name.toLowerCase().indexOf(input) > -1 || result[i].about.toLowerCase().indexOf(input) > -1){

            str += `<div class="col-xs-12 col-sm-6 col-lg-4">

                        <div class="box">

                            <a href="detalii.html?idItem=${[i]}" id="item">

                                    <img src="${result[i].image}" alt="imagine" class="main_img">
                                    

                                    <div class="access">

                                        <div id="name">${result[i].name}</div>
                                        <div>${result[i].price}$</div>
                                
                                    </div>
                            </a>

                        </div>
                    </div>`;
                
        }

        if(result[i].name.toLowerCase().indexOf(input) !== -1 || result[i].about.toLowerCase().indexOf(input) !== -1) {
            found = true;
        }
        
    }

    if(input === ""){

    }else if(found === false){
        
        document.querySelector(".backGround").classList.add('hide');
        document.querySelector(".carousel").classList.add('hide');
        document.querySelector("#h1").classList.add('hide');
        document.querySelector("#message").classList.remove('hide');
        document.querySelector("#message").innerHTML = `Ooops! There were no results for "${input}"... `;
        document.querySelector("#message").classList.add("height");
        document.querySelector(".showDesktop input").value = "";
        
    }else{
        document.querySelector(".backGround").classList.add('hide');
        document.querySelector(".carousel").classList.add('hide');
        document.querySelector("#h1").classList.add('hide');
        document.querySelector("#message").classList.remove("height");
        document.querySelector("footer").classList.add("margin");
        document.querySelector("#message").classList.remove('hide');
        document.querySelector("#message").innerHTML = `Search results for "${input}"... `;
        document.querySelector(".showDesktop input").value = "";
    }

    document.querySelector(".wrapper").innerHTML = str;

}

function drawSearch(){
    let input = document.querySelector(".showDesktop input").value;
    window.location = "index.html?id="+input;
    return;
}

function drawMobileSearch(){
    let input = document.querySelector("#search").value;
    window.location = "index.html?id="+input;
}





