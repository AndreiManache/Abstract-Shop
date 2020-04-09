
let local = JSON.parse(localStorage.getItem("cart"));

function draw(){
    let str = "";
    let head = `
    <li class="head">
        <div class="head_box1">
        Item
        </div>
        <div class="head_box2">
        Name
        </div>
        <div class="head_box3">
        Quantity
        </div>
        <div class="head_box4">
        Price
        </div>
        <div class="head_box5">
        Subtotal
        </div>
        <div class="head_box6">
        Edit
        </div>
    </li>`;
    for(let i in local){
        

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
                <input type="number" onchange="updateCartTotal()" class="cart-quantity-input" value="1">
                </div>

                <div class="box1">
                    <span class="cart-price">$${local[i].price}</span>
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


    document.querySelector("#ul").innerHTML = head + str;       
}

function erase(event){

    event.target.parentNode.parentNode.remove();
    for(let i=0 ; i< local.length ; i++){

        if(event.target.parentNode.parentNode.querySelector(".box1 p").innerText === local[i].name){
            local.splice(local[i],1);
            localStorage.setItem("cart",JSON.stringify(local));
        }

    }  

}

function updateCartTotal(){
    let cartItemContainer = document.getElementsByClassName("cart-items")[0]
    let cartRows = cartItemContainer.getElementsByClassName("cart-row")
    let total = 0;
    let subtotal = 0;

    for(let i=0; i<cartRows.length ; i++){
    
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        let price = parseFloat(priceElement.innerText.replace("$",''));
        let quantity = quantityElement.value;


            for(let i=0 ; i<local.length ; i++){

                if(quantity > local[i].stock){
                    alert(`Ai atins maximul stocului disponibil! Numar de produse disponibile:${local[i].stock}`);
                    quantityElement.value = local[i].stock;
                    updateCartTotal();
                    return;
                }
            }

            if(quantity < 1){
                quantityElement.value = 1;
                return;
            }
                
        total = parseInt(total + (price*quantity));
        subtotal = parseInt(price*quantity);
        document.querySelectorAll(".cart-subtotal-price")[i].innerText = `$${subtotal}`;
        console.log();    
    }
    
    document.getElementsByClassName("cart-total-price")[0].innerText =`Total $${total}`;

    if(cartRows.length == 0){
        document.getElementsByClassName("total")[0].style.display = "none";
        document.querySelector(".head").classList.add("hide");
        document.getElementById("message2").innerText = "The cart is empty!";
    }else{
        document.querySelector(".head").classList.remove("hide");
    }

    
}

