
function draw(){
    let str = "";
    let local = JSON.parse(localStorage.getItem("cart"));
    for(let i in local){

        

        str += `<li id="li"><img src="${local[i].image}"></li>`

    
        

    }

    document.querySelector("#ul").innerHTML = str;

}