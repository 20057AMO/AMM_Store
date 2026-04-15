fetch("products.json")
.then(response => response.json())
.then(data => {
        const limited_section = document.getElementById("limited");
        let statusQuo = ""
        let stock = ""
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        function statusStock (status){
            // Chick in Stock
            if(status.limited){
                statusQuo = "in-stock"
                stock = "LIMITED"
                }else{
                    statusQuo = "out-stock"
                    stock = "Out of stock"
                }
        }
            
    data.forEach(product => {
        if(product.limited){
            statusStock(product)
            // Elements of Product Card
            const inCart = cart.some(item => item.id === product.id);
                limited_section.innerHTML += `
                <div class="product-card">
                        <div class="status-icon ${statusQuo}">${stock}</div>
                        <div class="icon"><img src= "${product.icon}" ></div>
                        <div class="product-img"><img src="${product.image}"></div>
                        <div class="product-title">${product.title}</div>
                        <p class="product-desc">${product.desc}</p>
                        <span class="unactive">${product.old_price} EGP</span>
                        <span class="price">${product.new_price} EGP</span>
                        <button class="buy-btn ${inCart ? 'in-cart' : ''}" data-id="${product.id}">
                            ${inCart ? '<i class="fa-solid fa-bag-shopping"></i> In Cart' : 'Add To Cart'}
                        </button>
                    </div>
                                
                    `
            }
                    
    });
})