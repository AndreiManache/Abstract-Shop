let result;
let btn = document.querySelector("#add_btn");

async function getDb(){

    let response = await fetch ("https://baza-de-date-project.firebaseio.com/.json");
    result = await response.json();

    drawAdmin();
}

btn.addEventListener('click', function(){
    document.querySelector(".bg-modal-admin").style.display = "block";

    let save = document.querySelector('#btn2');
    let cancel = document.querySelector('#btn3');

    save.addEventListener('click', function(){
        saveProduct();
        document.querySelector(".bg-modal-admin").style.display = "none";
        getDb();
    })

    cancel.addEventListener('click', function(){
        document.querySelector(".bg-modal-admin").style.display = "none";
    })

});


function saveProduct(){
    
    fetch("https://baza-de-date-project.firebaseio.com/.json", {
    method : "POST",
    
    body :JSON.stringify({
        image: document.getElementById("image_value").value,
        name : document.getElementById("name_value").value,
        about: document.getElementById("description_value").value,
        price: document.getElementById("price_value").value,
        stock: document.getElementById("stock_value").value,
    })
})
.then(res =>{return res.json()} )
.then(data => console.log(data))

}


function drawAdmin(){

    let str = "";

    for(let i in result){

        str += 
        `<a href="detalii.html?idItem=1" id="item">
            <tr class="list_row">
                <td class="row_data">
                    <img src="${result[i].image}" class="row_img" alt="imagine">
                </td>
                <td class="row_data">
                    <p>${result[i].name}</p>
                </td>
                <td class="row_data">
                    <p>${result[i].price}</p>
                </td>
                <td class="row_data">
                    <p>${result[i].stock}</p>
                </td>
                <td class="row_data">
                    <button data-id="${i}" onclick="erase(event)">Remove</button>
                </td>
            </tr></a>`

    }

    document.querySelector(".item_list").innerHTML = str;

}

function drawSearch(){

    let input = document.querySelector("#nav li input").value;
    window.location = "index.html?id="+input;
    document.querySelector("#nav li input").value = "";
    return;
}

async function erase(event){
    event.target.parentNode.parentNode.remove();
    let id = event.target.dataset.id;

    let response = await fetch ("https://baza-de-date-project.firebaseio.com/.json");
     result = await response.json();

    for(let i in result){
        let product = result[i];

        if(product === null){
            continue
        }
        if(i === id){
          let deleteResponse = await fetch(`https://baza-de-date-project.firebaseio.com/${id}.json`, 
          {method : "DELETE"}
          )
        }

    }
}