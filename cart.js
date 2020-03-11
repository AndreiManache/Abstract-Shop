
function draw(){
    let str = "";
    let local = JSON.parse(localStorage.getItem("cart"));
    for(let i in local){

        

        str += `<li id="li">
            <div class="box1">
            <img src="${local[i].image}" id="imgCart">
            </div>

            <div class="box1">
            <p>${local[i].name}</p>
            </div>

            <div class="box1">
            <select name="number" id="nr">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
            </select>
            </div>

            <div class="box1">
            <span>${local[i].price} $</span>
            </div>

            <div class="box1">
            <button id="btn-del">Delete</button>
            </div>
                </li>`

    
        

    }

    document.querySelector("#ul").innerHTML = str;

}