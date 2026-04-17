function flipCard() {
    const card = document.getElementById('card');
    card.classList.toggle('flipped');
}

// Card Number Formatting (Adds spaces every 4 digits)
document.getElementById('card-num').addEventListener('input', function (e) {
    let cursorPosition = e.target.selectionStart;
    let originalLength = e.target.value.length;
    let value = e.target.value.replace(/\D/g, ''); // Numbers only
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) formattedValue += ' ';
        formattedValue += value[i];
    }
    
    e.target.value = formattedValue.trim();
    
    // Adjust cursor position after formatting
    let newLength = e.target.value.length;
    cursorPosition += (newLength - originalLength);
    e.target.setSelectionRange(cursorPosition, cursorPosition);
});

// Expiration Date Formatting (MM/YY)
document.getElementById('card-date').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
        e.target.value = value.slice(0, 2) + '/' + value.slice(2, 4);
    } else {
        e.target.value = value;
    }
});

// CVV Numeric only
document.getElementById('card-cvv').addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});

function submitData() {
    const cardNum = document.getElementById('card-num').value.replace(/\s/g, '');
    const cardName = document.getElementById('card-name').value.trim();
    const cardDate = document.getElementById('card-date').value;
    const cvv = document.getElementById('card-cvv').value;

    if (cardNum.length < 16 || cardName === "" || cardDate.length < 5 || cvv.length < 3) {
        alert("Please complete the card details first"); 
        return;
    }

    const btn = document.querySelector('.confirm-btn');
    btn.innerText = " Saving... ";
    btn.disabled = true;
    btn.style.opacity = "0.7";
    btn.style.cursor = "not-allowed";
    
    setTimeout(() => {
        localStorage.removeItem('cart');
        window.location.href = '../thank-you.html';
    }, 1500);
}