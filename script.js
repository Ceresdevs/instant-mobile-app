//firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
const firebaseConfig = {};
const app = initializeApp(firebaseConfig);
console.log(app)

let myLeads = [];
let oldLeads = [1, 2, 3, 4, 5];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const tabBtn = document.querySelector("#tab-btn");
const deleteBtn = document.querySelector("#delete-btn");
const ulEl = document.querySelector("#ul-el");
// turn the localStorage into object/Array and Get the leads from the localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);


//if may laman (true), if so then render the leads
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

//save the current 'tab' to the array and localStorage
tabBtn.addEventListener("click", function () {
  //Grab the URL of the current tab and push it to the array 'myLeads' and save it to localStorage
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
     console.log("The current tab URL cannot be accessed.");
  });
});

//function to render the value of arrays with argument 'leads' to be more dynamic and reusable
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // 2. Add the item to the listItems variable
    listItems += `<li><a  href="${leads[i]}" target='_blank' >${leads[i]}</a></li>`;
  }
  ulEl.innerHTML = listItems;
}

//deleting localStorage, Array, and DOM
deleteBtn.addEventListener("dblclick", function () {
  //dialog for confirmation before deleting all the leads
  confirm("Are you sure you want to delete all the leads?");

  if (confirm) {
    //clear
    localStorage.clear();
    myLeads = [];

    //after deleting, call the function to render the leads
    render(myLeads);
  } else {
    //if the user click cancel, then return to the page without deleting
    return;
  }
});

//refering to the input-btn
inputBtn.addEventListener("click", function () {
  //pushing values from the inputs to the array 'myLeads'

  //if not empty input, then push
  if (inputEl.value.trim() !== "") {
    myLeads.push(inputEl.value.trim());
  }

  //clear inputs
  inputEl.value = "";

  // Save the myLeads array to localStorage and transform the array to string -
  // within this statement to store the items in arrays as string
  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  //calling the function to render the arrays when it's click
  render(myLeads);
});
