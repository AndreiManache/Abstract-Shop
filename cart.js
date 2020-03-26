
let local = JSON.parse(localStorage.getItem("cart"));

function draw(){
    let str = "";
    for(let i in local){
        

        str += `<li id="li" class="cart-row">
        <a href="detalii.html?idItem=${local[i].idProdus}" id="item">
            <div class="box1">
                <img src="${local[i].image}" id="imgCart">
            </div>
        </a>
            

            <div class="box1">
            <p>${local[i].name}</p>
            </div>

            <div class="box1" id="one">
            <input type="number" onchange="updateCartTotal()" class="cart-quantity-input" value="1">
            </div>

            <div class="box1">
                <span class="cart-price">$${local[i].price}</span>
            </div>

            <div class="box1">
                <button id="btn-del" onclick="erase(event) ; updateCartTotal()">Delete</button>
            </div>
                </li>`

            }


    document.querySelector("#ul").innerHTML = str;       
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

    for(let i=0; i<cartRows.length ; i++){
    
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        let price = parseFloat(priceElement.innerText.replace("$",''));
        let quantity = quantityElement.value;


            for(let i=0 ; i< local.length ; i++){

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
                
        total = total + (price*quantity);
        
    }
    
    document.getElementsByClassName("cart-total-price")[0].innerText =`Total $${total}`;

    if(cartRows.length == 0){
        document.getElementsByClassName("total")[0].style.display = "none";
        document.getElementById("message2").innerText = "Cosul de cumparaturi este gol!";


        
    }

    
}

