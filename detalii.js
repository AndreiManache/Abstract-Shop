let item;
let id = window.location.search.substr(8);

async function getItem(){

    let accessDb = await fetch(`https://baza-de-date-project.firebaseio.com/${id}.json`)
    item = await accessDb.json();
    
    draw();

}

function draw(){

    document.querySelector("#poza").src = item.image;

    document.querySelector("#detalii").innerHTML =`<span id="numeDetalii">${item.name}</span>`+`<p>${item.about}</p>`;

    document.querySelector(".btn-ipt").innerHTML = `
        <p style="font-size:200%">$${item.price}</p>
        <button id="addToCart" onclick="addToCart()" style="margin: 15px;">ADD TO CART</button>
        <select></select>
    `

    for(let i=1; i<=item.stock ; i++){

        document.querySelector(".btn-ipt select").innerHTML += `<option>${i}</option>`;

    }

}

function drawSearch(){

    let input = document.querySelector(".showDesktop input").value;
    window.location = "index.html?id="+input;
    return;

}

function drawMobileSearch(){

    let input = document.querySelector("#search").value;
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
    

    if(!found){
        
        let itemForCart = { //Creez produsul de ataugat in localStorage
        "idProdus": id,
        "price": item.price ,
        "stock": item.stock ,
        "image": item.image ,
        "name": item.name ,
        "quantity" : parseInt(document.querySelector(".btn-ipt select").value)
        }

        for(let i in cart){ //Avertizare ca produsul este deja in cos

            if(cart[i].idProdus === itemForCart.idProdus){

                alert("Produsul este deja in cos");
                return;

            }

        }

        cart.push(itemForCart); //Se actualizeaza variabila "cart"

        //[Deschide modalul] - Se afiseaza mesajul ca produsul a fost adaugat in cos
        document.querySelector(".bg-modal").classList.remove("hide"); 
        document.querySelector("#prodAdd img").src = `${itemForCart.image}`;
        document.querySelector("#prodAdd p").innerText = `${itemForCart.name}`; 
    
              
        let btnPa = document.querySelector("#pa"); 

        btnPa.addEventListener('click', function clicked(){ //[Inchide modalul]
            document.querySelector(".bg-modal").classList.add("hide");
        }) 

    }

 
    localStorage.setItem("cart", JSON.stringify(cart)); //Se trimite variabila "cart" in localStorage


}
