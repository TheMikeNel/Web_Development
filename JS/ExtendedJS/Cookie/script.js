const formEl = document.querySelector('#promo-form');
const promoInputEl = document.querySelector('.promo-input');
const promoDescEl = document.querySelector('.promo-description');

const promocodeArr = [
 {
   promocode: 'PROM10',
   gift: "Скидка 10%"
 },
 {
   promocode: 'PROM50',
   gift: "Скидка 50%"
 },
 {
   promocode: 'GIFT',
   gift: "Подарок в корзине"
 }
]

formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = promoInputEl.value.trim();
    const promoObj = getPromo(input);
    if (promoObj) usePromo(promoObj);
    else resetPromo();
});

function getPromo(input) {
    for (const promoObj of promocodeArr){
        if (promoObj.promocode === input) return promoObj;
    }

    return null;
}

function usePromo(promoObj) {
    console.log('used promo: ', promoObj);
    if (!promoObj) resetPromo();
    promoDescEl.textContent = "Промокод применён. " + promoObj.gift + '!';
    document.cookie = "promocode=" + encodeURIComponent(JSON.stringify(promoObj))
    
    if (!promoInputEl.classList.contains("used-promo")) promoInputEl.classList.toggle("used-promo")
    
    if (promoDescEl.classList.contains("used-promo")) return;
    promoDescEl.classList.toggle("used-promo")
}

function resetPromo() {
    formEl.reset();
    promoDescEl.textContent = "";
    promoDescEl.classList.remove("used-promo")
    promoInputEl.classList.remove("used-promo")
    document.cookies
}

function getPromoFromCookie() {
    const cookies = document.cookie.split(';');
    if (Array.isArray(cookies)) {
        for (const value of cookies) {
            const pair = value.split('=');
            if (pair[0].trim() === "promocode") {
                return JSON.parse(decodeURIComponent(pair[1]));
            }
        }
    }

    return null;
}

const promoFromCookie = getPromoFromCookie();
console.log("value from cookie: ", promoFromCookie)
if (promoFromCookie) usePromo(promoFromCookie);