
let local = JSON.parse(localStorage.getItem("cart"));

function draw(){

    let str = "";

    let head = 
       //Asta este capul de lista de la cart
    `  
        <li class="head">
            <div class="head_box1">Item</div>
            <div class="head_box2">Name</div>
            <div class="head_box3">Quantity</div>
            <div class="head_box4">Price</div>
            <div class="head_box5">Subtotal</div>
            <div class="head_box6">Edit</div>
        </li>
    `;

    for(let i in local){ //Fiecare row al listei din cart
        
        str += `
            
            <li id="li" class="cart-row">

                <div class="box1">

                    <a href="detalii.html?idItem=${local[i].idProdus}"style="text-decoration: none;color:black">
                        <img src="${local[i].image}" id="imgCart">
                    </a>

                </div>
            
                <div class="box1" id="item_name">

                    <a href="detalii.html?idItem=${local[i].idProdus}"style="text-decoration: none;color:black">
                        <p class="cart-p">${local[i].name}</p>
                    </a>

                </div>
            
            
                <div class="box1" id="one">

                    <select style="width:39px" class="cart-quantity-input" onchange="updateCartTotal()"></select>

                </div>

                <div class="box1">

                    <span class="cart-price">$${parseFloat(local[i].price).toFixed(1)}</span>

                </div>

                <div class="box1">

                    <span class="cart-subtotal-price"></span>

                </div>
        
                <div class="box1">

                    <button id="btn-del" onclick="erase(event) ; updateCartTotal()">Delete</button>

                </div>

            </li>
        `

    }
            
    document.querySelector("#ul").innerHTML = head + str;  //Deseneaza cart-ul

    const allSelects =  document.getElementsByClassName("cart-quantity-input");

    for (let k=0; k<local.length ; k++){//Adauga in drop-down atatea produse cate sunt in stoc

        for(let i=1 ; i<= local[k].stock;i++){

            const productQuantity = local[k].quantity;
            const isSelected = productQuantity === i;
            allSelects[k].innerHTML += `<option ${isSelected ? 'selected' : ''}>${i}</option>`

        }
        
    }
            
}

function erase(event){ //Sterge produsul (si din localStorage)

    event.target.parentNode.parentNode.remove();
    for(let i=0 ; i< local.length ; i++){

        if(event.target.parentNode.parentNode.querySelector(".box1 p").innerText === local[i].name){
            local.splice(local[i],1);
            localStorage.setItem("cart",JSON.stringify(local));
        }

    }  

}

function updateCartTotal(){ //Actualizeaza pretul total si subtotal

    let cartItemContainer = document.getElementsByClassName("cart-items")[0]
    let cartRows = cartItemContainer.getElementsByClassName("cart-row")
    let total = 0;
    let subtotal = 0;

    const allSelects =  document.getElementsByClassName("cart-quantity-input");
    
    for (let k=0; k<local.length ; k++){

        local[k].quantity = parseInt(allSelects[k].value);
        localStorage.setItem("cart",JSON.stringify(local));
            
    }

    for(let i=0; i<cartRows.length ; i++){ //Stabileste valorile totalului si subtotalului(si il deseneaza)
        
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        let price = parseFloat(priceElement.innerText.replace("$",''));
        let quantity = quantityElement.value;
        
        total = parseInt(total + (price*quantity));
        subtotal = price*quantity;

        document.querySelectorAll(".cart-subtotal-price")[i].innerText = `$${subtotal.toFixed(1)}`;
    } 
    
    document.getElementsByClassName("cart-total-price")[0].innerText =`Total $${total.toFixed(1)}`; //Deseneaza total

    if(cartRows.length == 0){// Afiseaza mesajul ca nu este nimic in cos (daca este cazul)

        document.getElementsByClassName("total")[0].style.display = "none";
        document.querySelector(".head").classList.add("hide");
        document.getElementById("message2").innerText = "The cart is empty!";

    }else{

        document.querySelector(".head").classList.remove("hide");

    } 
} 

