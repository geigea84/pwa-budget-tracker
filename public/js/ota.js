const addBtn = document.querySelector("#add-btn");
const subBtn = document.querySelector("#sub-btn");
const amount = document.querySelector("#t-amount");
const offAddBtn = document.querySelector(".off-add-btn");
const offSubBtn = document.querySelector(".off-sub-btn");

function testOnline() {
    if (navigator.onLine) {
        //addBtn.removeAttribute("class");
        //subBtn.removeAttribute("class");
        console.log("You're online!");
        alert("You're online!");
    }
    //else {
    //    addBtn.setAttribute("class", "off-add-btn");
    //    subBtn.setAttribute("class", "off-sub-btn");
    //}
}
/*
function offlineAdd() {
    console.log("(Offline) add $" + amount.value + " saved");
    alert("(Offline) add $" + amount.value + " saved");
}

function offlineSub() {
    console.log("(Offline) subtract $" + amount.value + " saved");
    alert("(Offline) subtract $" + amount.value + " saved");
}
*/
//==================================================
//==================================================

function offlineAdd() {
    if (navigator.onLine == false) {
        console.log("(Offline) add $" + amount.value + " saved");
        alert("(Offline) add $" + amount.value + " saved");
    }
}

function offlineSub() {
    if (navigator.onLine == false) {
        console.log("(Offline) subtract $" + amount.value + " saved");
        alert("(Offline) subtract $" + amount.value + " saved");
    }
}

window.addEventListener("online", testOnline);
//window.addEventListener("offline", testOnline);
offAddBtn.addEventListener("click", offlineAdd);
offSubBtn.addEventListener("click", offlineSub);