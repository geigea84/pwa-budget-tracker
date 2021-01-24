const addBtn = document.querySelector("#add-btn");
const subBtn = document.querySelector("#sub-btn");
const amount = document.querySelector("#t-amount");

function testOnline() {
    if (navigator.onLine) {
        console.log("You're online!");
        alert("You're online!");
    }
}

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
addBtn.addEventListener("click", offlineAdd);
subBtn.addEventListener("click", offlineSub);