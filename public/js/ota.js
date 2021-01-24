const addBtn = document.querySelector("#add-btn");
const subBtn = document.querySelector("#sub-btn");
const amount = document.querySelector("#t-amount");
const offAddBtn = document.querySelector(".off-add-btn");
const offSubBtn = document.querySelector(".off-sub-btn");
let value = amount.textContent;

//window.addEventListener("load", () => {})
function testOnline() {
    if (navigator.onLine) {
        addBtn.classList.remove("off-add-btn");
        subBtn.classList.remove("off-sub-btn");
        console.log("You're online!");
        alert("You're online!");
    }
    else {
        addBtn.classList.add("off-add-btn");
        subBtn.classList.add("off-sub-btn");
    }
}

offAddBtn.onclick = function() {
    console.log("(Offline) $" + value + " added");
    alert("(Offline) $" + value + " added");
}

offSubBtn.onclick = function() {
    console.log("(Offline) $" + value + " subtracted");
    alert("(Offline) $" + value + " subtracted");
}

window.addEventListener("online", testOnline);
window.addEventListener("offline", testOnline);