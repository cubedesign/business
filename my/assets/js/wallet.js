//db temporary
let walletEUR = 4.23;
const walletNcv = 29500;

//values
const ncvb = 1000;
const ncvs = 1040;
const eurvs = 0.00096;
const eurvb = 0.001;

let timedout = true;
var timeout;
function updateWalletInfo(){
    const toE = walletNcv / ncvs;
    forEnum(document.getElementById("walletNCE"), 0.00, toE, toE / 23, true);
    forEnum(document.getElementById("walletEur"), 0.00, walletEUR, walletEUR / 23, true);
    forEnum(document.getElementById("walletNC"), 0, walletNcv, walletNcv / 23, false);
}
function forEnum(where, now, max, plus, dec){
    if(dec) where.innerHTML = now.toFixed(2);
    else where.innerHTML = now.toFixed(0);
    now+=plus;
    if(now <= max){
        if((max / 5) * 4 <= now){
            setTimeout(() => {
                forEnum(where, now, max, plus, dec);
            }, 95);
        }
        else if((max / 5) * 3 <= now){
            setTimeout(() => {
                forEnum(where, now, max, plus, dec);
            }, 70);
        }
        else if((max / 5) * 2 <= now){
            setTimeout(() => {
                forEnum(where, now, max, plus, dec);
            }, 55);
        }else if((max / 5) <= now){
            setTimeout(() => {
                forEnum(where, now, max, plus, dec);
            }, 40);
        }else{
            setTimeout(() => {
                forEnum(where, now, max, plus, dec);
            }, 40);
        }
    }else{
        if(dec) where.innerHTML = max.toFixed(2);
        else where.innerHTML = max.toFixed(0);
    }
}
function calcTrade(){
    const sel1 = document.getElementById("curr1");
    const val1 = document.getElementById("curr1val");
    if(sel1.value == "nc" && val1.value <= walletNcv){
        val1.style = "";
        const calc = val1.value / ncvs;
        document.getElementById("curr2val").value = calc.toFixed(2);
    }else if(sel1.value == "eur" && val1.value <= walletEUR){
        val1.style = "";
        const calc = val1.value * 1000;
        document.getElementById("curr2val").value = calc.toFixed(2);
    }else{
        displayError(val1, timedout, timeout, "Error", "Insufficient funds in your wallet!")
    }
}
function exchange(){
    const sel1 = document.getElementById("curr1");
    const val1 = document.getElementById("curr1val");
    if((getCurrency(sel1.value) == ncvb && val1.value >= 1040) || getCurrency(sel1.value) == eurvs && val1.value >= 0.8){
        updateWalletInfo(false);
    }else if(getCurrency(sel1.value) == eurvs && val1.value < 0.8) displayError(val1, timedout, timeout, "Error", "Minimum transaction is 0.8 EUR!");
    else displayError(val1, timedout, timeout, "Error", "Minimum transaction is 1040 NC!");
}
function addValue(perc){
    const sel1 = document.getElementById("curr1");
    const val1 = document.getElementById("curr1val");
    let value;
    if(getCurrency(sel1.value) == ncvb) value = walletNcv;
    else value = walletEUR;
    value /= 100;
    value *= perc;
    let tempValue = Number(val1.value) + value;
    val1.value = tempValue.toFixed(2);
    calcTrade();
}
function swapRates(){
    const sel1 = document.getElementById("curr1");
    const sel2 = document.getElementById("curr2");
    const val1 = document.getElementById("curr1val");
    let temp;
    //swap currency
    temp = sel1.value;
    sel1.value = sel2.value;
    sel2.value = temp;

    //clear values
    val1.value = "";
    calcTrade();
}
function getCurrency(curr){
    if(curr == "nc") return ncvb;
    else if(curr == "eur") return eurvs;
}
function displayError(val1, timedout, timeout, type, msg){
    val1.style = "border-color:red";
    val1.style.color = "red";
    const errorDoc = document.getElementById('error');
    errorDoc.innerHTML = `${type}:<i>${msg}</i>`;
    errorDoc.style.display = "block";
    if(timedout){
        errorDoc.style.animation = "showError ease .3s";
        timedout = false;
    }
    else{ 
        errorDoc.style.animation = "showError2 ease .3s";
        clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
        timedout = true;
        errorDoc.style.animation = "hideError ease .3s";
        setTimeout(() => {
            errorDoc.style.display = "none";
        }, 300);
    }, 3000);
}
updateWalletInfo();