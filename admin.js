let result;

async function getDb(){

     let response = await fetch ("https://baza-de-date-project.firebaseio.com/.json");
     result = await response.json();

     drawAdmin();
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
                    <button onclick="erase(event)">Remove</button>
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

function erase(event){

    event.target.parentNode.parentNode.remove(); 

}