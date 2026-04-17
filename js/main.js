// Inject Preloader HTML
const loaderHTML = `
    <div id="preloader">
        <div class="loader-content">
            <div class="loader-logo">AMM</div>
            <div class="loader-bar"></div>
        </div>
    </div>
`;
document.body.insertAdjacentHTML('afterbegin', loaderHTML);

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 900);
    }
});

// Path Detection for subdirectories
const isSubDir = window.location.pathname.includes('/Card/');
const basePath = isSubDir ? '../' : '';

// Start NavBar Logic
navBar.innerHTML = `
    <div class="logo">
    <a href="${basePath}index.html"><img src="${basePath}design/logo.png" alt="logo"></a> 
    </div>
    <div class="links">
    <ul>
    <li><a href="${basePath}itm.html"><i class="fa-solid fa-shirt"></i></a></li>
    <li class="cart-icon">
    <div class="openCloseCart"><i class="fa-solid fa-bag-shopping"></i></div>
    <span class="count">0</span>
    </li>
    <li><a href="${basePath}login.html"><i class="fa-solid fa-circle-user"></i></a></li>
    </ul>
    </div>
`



// Start Cart Logic
cart.innerHTML = `
        <div class="top_cart">
            <h3>Your Items : <span class="Count_item_cart">0</span></h3>
            <span class="close_cart openCloseCart"><i class="fa-regular fa-circle-xmark"></i></span>
        </div>
        <div class="items_of_cart" id="cart_items">
            
        </div>
        <div class="bottom_cart">
            <div class="total">
                <p style="letter-spacing: 3px;">Subtotal</p>
                <p class="price_cart_total">0 EGP</p>
            </div>
            <div class="button_cart">
                <button  class="btn_cart btn checkout open-popup" data-popup="checkout">Checkout</button>
                <span  class="btn_cart btn trans_bg openCloseCart" >Shop More</span>
            </div>
        </div>
    `
    
let cartOpenBtn = document.querySelectorAll(".openCloseCart")
cartOpenBtn.forEach((btn)=>{
    btn.addEventListener("click",  ()=>{
        cart.classList.toggle("active")
    })
})

const checkoutPopup = document.getElementById("checkout");
// start checkout popup logic
checkoutPopup.innerHTML = `
        <div class="checkout-container">
            <div class="brand-header">
                <h1>AMM</h1>
                <p>ABSOLUTE MODERN MASTERY</p>
            </div>
    
            <form class="luxury-form" id="checkout-form">
                <div class="form-group">
                    <label>FULL NAME</label>
                    <input type="text" id="cust-name" placeholder="Enter your name" required autofocus>
                </div>
    
                <div class="form-row">
                    <div class="form-group">
                        <label>PHONE NUMBER</label>
                        <input type="tel" id="cust-phone" placeholder="01xxxxxxxxx" required>
                    </div>
                    <div class="form-group">
                        <label>EMAIL</label>
                        <input type="email" id="cust-email" placeholder="example@email.com" required>
                    </div>
                </div>
    
                <div class="form-group">
                    <label>ADDRESS</label>
                    <textarea id="cust-address" rows="3" placeholder="Your address" required></textarea>
                </div>
    
                <div class="form-footer">
                    <div class="price-summary" id="totalAmount"></div>
    
                    <div class="btn-group">
                        <button type="submit" class="buy-button">Proceed to Payment</button>
                        <button type="button" class="cancel-button cancel-btn" data-popup="checkout">Cancel</button>
                    </div>
                </div>
            </form>
        </div>

`



// Popup Logic
const buyButtons = document.querySelectorAll('.open-popup');
const popups = document.querySelectorAll('.popup');
const cancelButtons = document.querySelectorAll('.cancel-button');

buyButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const popupId = button.getAttribute('data-popup');
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.add('active');
        }
    });
});
// Close popup when clicking cancel buttons
cancelButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const popupId = button.getAttribute('data-popup');
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.remove('active');
        }
    });
});

// Close popup when clicking outside the content area
popups.forEach((popup) => {
    popup.addEventListener('click', (e) => {
        console.log(e.target);
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
});



// Close popup with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const activePopups = document.querySelectorAll(".popup.active");
        activePopups.forEach((popup) => {
        popup.classList.remove("active");
        });
    }
});