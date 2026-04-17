function flipCard() {
    const card = document.getElementById('card');
    card.classList.toggle('flipped');
}


document.getElementById('card-num').addEventListener('input', function (e) {
    let target = e.target;
    let position = target.selectionEnd;
    let length = target.value.length;
    
    target.value = target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
    if(length !== target.value.length) {
        position += (target.value.length - length);
    }
    target.setSelectionRange(position, position);
});
function submitData() {
    const cardNum = document.getElementById('card-num').value;
    const cardName = document.getElementById('card-name').value;
    const cvv = document.getElementById('card-cvv').value;

    if(cardNum === "" || cvv === "") {
        alert("Please complete the card details first");
    } else {
        const btn = document.querySelector('.confirm-btn');
        btn.innerText = " Saving...";
        btn.style.opacity = "0.7";
        
        setTimeout(() => {
            localStorage.removeItem('cart');
            window.location.href = '../thank-you.html';
        }, 1500);
    }
}