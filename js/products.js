
    // start season logic 
    let seasonBtn = document.querySelectorAll(".buttons .btn")


    seasonBtn.forEach(function(btn){
        btn.addEventListener("click", function(){
            seasonBtn.forEach(function(btn){
                btn.classList.remove("active")
            })
            this.classList.add("active")
        })
    })
    // end season logic 
    // start load page effect  
    const content = document.querySelector(".products");
        content.style.opacity = '0';

        setTimeout(() => {
            content.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            content.style.opacity = '1';
            }, 150);

    // end load page effect 

            // start logic of products => json
            fetch("products.json")
            .then(response => response.json())
            .then(data => {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const  currentSeason = new Date().getMonth() < 6 ? 'Summer' : 'Winter';
                const summerSection = document.getElementById("summerSection");
                const winterSection = document.getElementById("winterSection");
                const winterBtn = document.getElementById("winterBtn");
                const summerBtn = document.getElementById("summerBtn");
                let statusQuo = ""
                let stock = ""

                data.forEach(product => {
                    const inCart = cart.some(item => item.id === product.id);
                    statusStock(product)    
                    getWinterSection(product, inCart)
                    getSummerSection(product, inCart)
                    
                });
                function statusStock (status){
                        // Chick in Stock
                        if(status.in_stock){
                            statusQuo = "in-stock"
                            stock = "In Stock"
                            if(status.limited){
                                stock = "LIMITED"
                            }
                        }else{
                            statusQuo = "out-stock"
                            stock = "Out of stock"
                        }
                }
                function getSummerSection (product , inCart){
                    if(product.season === "summer"){
                        summerSection.innerHTML += `
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

                }
                function getWinterSection (product , inCart){
                    // Elements of Product Card
                    if(product.season === "winter"){
                        winterSection.innerHTML += `
                            <div class="product-card">
                                <div class="status-icon ${statusQuo}">${stock}</div>
                                <div class="icon"><img src= "${product.icon}" ></div>
                                <div class="product-img"><img src="${product.image}"></div>
                                <div class="product-title">${product.title}</div>
                                <p class="product-desc">${product.desc}</p>
                                <span class="unactive">${product.old_price} EGP</span>
                                <span class="price">${product.new_price} EGP</span>
                                <button class="buy-btn ${inCart ? 'in-cart' : ''}"  data-id="${product.id}">
                                    ${inCart ? '<i class="fa-solid fa-bag-shopping"></i> In Cart' : 'Add To Cart'}
                                </button>
                            </div>
                        `
                    }
                }
            
            })
            // end logic of products => json 







