//create variable to hold db connection
let db;

//establish connection to IndexedDB database
const request = indexedDB.open("budget_tracker", 1);

//this event will emit if the database version changes
request.onupgradeneeded = function(event) {
    //save a reference to the database
    const db = event.target.result;
    //create an object store called "new_transaction", set it to have an auto incrementing primary key
    db.createObjectStore("new_transaction", {autoIncrement: true});
}

//on successful transaction
request.onsuccess = function(event) {
    //when db is successfully created with its object store (from onupgradeneeded event above) 
    //or simply established a connection, save reference to db in global variable
    db = event.target.result;

    if (navigator.onLine) {
        //upload transactions
        uploadTransaction();
    }
};

//error transaction
request.onerror = function(event) {
    //log error here
    console.log(event.target.errorCode);
};

//this function will execute if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
    //open a new transaction with the database with read and write permissions
    const transaction = db.transaction(["new_transaction"], "readwrite");

    //access the object store for "new_transaction" aka nt
    const ntObjectStore = transaction.objectStore("new_transaction");

    //add record to object store with add method
    ntObjectStore.add(record);
}

function uploadTransaction() {
    //open a transaction on the db
    const transaction = db.transaction(["new_transaction"], "readwrite");

    //access the object store
    const ntObjectStore = transaction.objectStore("new_transaction");

    const getAll = ntObjectStore.getAll();

    //on successful getAll execution, run this function
    getAll.onsuccess = function() {
        //if there was data in indexedDB's store, send it to the api server
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.message) {
                    throw new Error(serverResponse);
                }
                //open one more transaction ====================================================================================================review
                const transaction = db.transaction(["new_transaction"], "readwrite");
                //access the new_transaction object store
                const ntObjectStore = transaction.objectStore("new_transaction");
                //clear all items in your store
                ntObjectStore.clear();

                alert("All saved transactions have been submitted!");
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
}

function testOnline() {
    console.log("You're online!");
    alert("You're online!");
}

//listen for app coming back online
window.addEventListener("online", uploadTransaction);
window.addEventListener("online", testOnline);