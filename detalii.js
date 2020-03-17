let item;
let id = window.location.search.substr(8);

async function getItem(){

    
    let accessDb = await fetch(`https://baza-de-date-project.firebaseio.com/${id}.json`)
    item = await accessDb.json();

    draw();

}

function draw(){

    document.querySelector("#poza").src = item.image;
    document.querySelector("#detalii").innerHTML = item.about;

}

function drawSearch(){

    let input = document.querySelector("#nav li input").value;
    window.location = "index.html?id="+input;
    return;
}





function addToCart(){
    let cartStr = localStorage.getItem("cart");
    let cart;
    let found = false;


    if(cartStr === null){
        cart = [];
    }else{
        cart = JSON.parse(cartStr);
    }


    for(let i=0; i<cart.lenght ; i++){

        if(cart[i].idProdus === id){

            if(item.stock >= 1){
            cart[i].quantity ++;
            }else{
                alert("Nu mai sunt BOSS");
            }

        found = true;
        }
    }
    

    if(!found){

        let itemForCart = {
 
             "idProdus": id,
             "price": item.price ,
             "stock": item.stock ,
             "image": item.image ,
             "name": item.name ,
         }

         for(let i in cart){

                    if(cart[i].idProdus === itemForCart.idProdus){

                        alert("Produsul este deja in cos");
                        return;
                    }
                }

             cart.push(itemForCart);

              document.querySelector(".bg-modal").style.display = "block";
              document.querySelector("#prodAdd img").src = `${itemForCart.image}`;
              document.querySelector("#prodAdd p").innerText = `${itemForCart.name}`;
              
              
             let btnPa = document.querySelector("#pa"); 
             btnPa.addEventListener('click', function clicked(){
                document.querySelector(".bg-modal").style.display = "none";
              })

              
            }

 
     localStorage.setItem("cart", JSON.stringify(cart));


}
