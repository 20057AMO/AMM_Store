    // start season logic 
    let seasonBtn = document.querySelectorAll(".buttons .btn")
    const summerSection = document.getElementById("summerSection");
    const winterSection = document.getElementById("winterSection");

    seasonBtn.forEach(function(btn){
        btn.addEventListener("click", function(e){
            // Prevent default anchor behavior
            e.preventDefault();

            seasonBtn.forEach(function(b){
                b.classList.remove("active")
            })
            this.classList.add("active")

    // Show/Hide sections logic with smooth transition
            const changeSeason = (show, hide) => {
                hide.style.opacity = '0';
                hide.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    hide.style.display = "none";
                    show.style.display = "grid";
                    setTimeout(() => {
                        show.style.opacity = '1';
                        show.style.transform = 'translateY(0)';
                    }, 50);
                }, 400);
            };

            if(this.id === "summerBtn") {
                changeSeason(summerSection, winterSection);
            } else {
                changeSeason(winterSection, summerSection);
            }
        })
    })

    // Setup initial visibility for transition
    summerSection.classList.add('section-transition');
    winterSection.classList.add('section-transition');

    // Auto-detect current season based on URL parameter or month
    const urlParams = new URLSearchParams(window.location.search);
    const collectionParam = urlParams.get('collection');
    const currentMonth = new Date().getMonth();
    
    let isSummer;
    if (collectionParam === 'summer') {
        isSummer = true;
    } else if (collectionParam === 'winter') {
        isSummer = false;
    } else {
        // logic of months the current month is summer  or winter 
        isSummer = currentMonth >= 3 && currentMonth <= 8;
    }

    if (isSummer) {
        summerSection.style.display = "grid";
        summerSection.style.opacity = "1";
        winterSection.style.display = "none";
        document.getElementById("summerBtn").classList.add("active");
    } else {
        summerSection.style.display = "none";
        winterSection.style.display = "grid";
        winterSection.style.opacity = "1";
        document.getElementById("winterBtn").classList.add("active");
    }
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
                const summerSection = document.getElementById("summerSection");
                const winterSection = document.getElementById("winterSection");
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







