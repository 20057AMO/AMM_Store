document.addEventListener("DOMContentLoaded" , ()=>{
    
    
    fetch('products.json')
    .then(response => response.json())
    .then(data =>{
    
        let productBtn = document.querySelectorAll(".buy-btn")
        productBtn.forEach(button => {
            button.addEventListener("click" , (even)=>{
                const productId = even.target.getAttribute('data-id');
                const selectedProduct = data.find(product => product.id == productId);
                addToCart(selectedProduct)

                const allMatchingButtons = document.querySelectorAll(`.buy-btn[data-id="${productId}"]`);
                allMatchingButtons.forEach(btn => {
                    btn.classList.add("in-cart"); 
                    btn.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> In Cart`;
                    btn.disabled = true;
                });
            })
        })
    })
    

    function addToCart(product){
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [] ;
    
        let existingProduct = cart.find(item => item.id == product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({... product , quantity: 1});
        }
    
        localStorage.setItem('cart' , JSON.stringify(cart))
    
        updateCart()
    }
    
    function updateCart (){
        const cartItemsContainer = document.getElementById("cart_items");
    
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        var totalPrice = 0;
        var totalCount = 0;  
    
        cartItemsContainer.innerHTML = ""
        cart.forEach((item , index ) =>{
            let totalPriceItem = item.new_price * item.quantity;
            totalPrice += totalPriceItem;
            totalCount += item.quantity;
            
            cartItemsContainer.innerHTML +=`

            <div class="item_cart">
                    <img src="${item.image}" alt="">
                    <div class="content">
                        <h4>${item.title}</h4>
                        <p class="price_cart">${totalPriceItem}EGP</p>
                        <div class="quantity_control">
                            <button class="decrease_quantity" data-index=${index}>-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="Increase_quantity" data-index=${index}>+</button>
                        </div>
                    </div>
    
                    <button class="delete_item" data-index="${index}" ><i class="fa-regular fa-trash-can"></i></button>
                </div>
            `
        })
        
        document.querySelector(".price_cart_total").innerText = `${totalPrice} EGP`
        document.querySelector(".Count_item_cart").innerText = totalCount
        document.getElementById("totalAmount").innerHTML = `<p>Total Amount : <span>${totalPrice} EGP</span></p> `;
        document.querySelector(".count").innerText = totalCount;
        
        let checkoutBtn = document.querySelector(".checkout");
        checkoutBtn.innerText = `Checkout (${totalCount})`;
        if (totalCount > 0) {
            checkoutBtn.classList.remove("empty");
        } else {
            checkoutBtn.classList.add("empty");
            checkoutBtn.innerText = `Checkout`;
        }
        const increaseButtons = document.querySelectorAll(".Increase_quantity");
        const decreaseButtons = document.querySelectorAll(".decrease_quantity");

        increaseButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const indexItem = event.target.closest(".Increase_quantity").getAttribute("data-index");
                increaseQuantity(indexItem);
            });
        });

        decreaseButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const indexItem = event.target.closest(".decrease_quantity").getAttribute("data-index");
                decreaseQuantity(indexItem);
            });
        });




        // delete item from cart (logic)
        const deleteItemButtons = document.querySelectorAll(".delete_item");
        deleteItemButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const indexItem = event.target.closest(".delete_item").getAttribute("data-index");
                removeFromCart(indexItem);
            });
        });

    }

    function increaseQuantity(index){
        let cart = JSON.parse(localStorage.getItem('cart')) || []
        cart[index].quantity += 1
        localStorage.setItem('cart' , JSON.stringify(cart))
        updateCart()
    }

    function decreaseQuantity(index){
        let cart = JSON.parse(localStorage.getItem('cart')) || []

        if (cart[index].quantity > 1){
            cart[index].quantity -= 1
        }
    
        localStorage.setItem('cart' , JSON.stringify(cart))
        updateCart()
    }



    function removeFromCart(index){
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const removedItem = cart.splice(index, 1)[0];
        localStorage.setItem('cart' , JSON.stringify(cart))
        updateCart()
        if (removedItem) {
            updateBtnState(removedItem.id);
        }
    }
    
    function updateBtnState(productId) {
        const allMatchingButtons = document.querySelectorAll(`.buy-btn[data-id="${productId}"]`);
        allMatchingButtons.forEach(btn => {
            btn.classList.remove("in-cart");
            btn.innerHTML = `Add To Cart`;
            btn.disabled = false;
        });
    }

    // Checkout Form Submission Logic
    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Validate that cart is not empty
            let cartData = JSON.parse(localStorage.getItem('cart')) || [];
            if (cartData.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            // Redirect to payment page
            const isSubDir = window.location.pathname.includes('/Card/');
            const paymentPath = isSubDir ? 'Card.html' : 'Card/Card.html';
            window.location.href = paymentPath;
        });
    }
    
    updateCart()
});