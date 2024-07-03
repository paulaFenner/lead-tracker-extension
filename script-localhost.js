const inputBtnEl = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const deleteBtnEl = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');

let myLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

inputBtnEl.addEventListener('click', execute);
deleteBtnEl.addEventListener('dblclick', clearAll);
tabBtn.addEventListener('click', saveLog);

function saveLog() {
  chrome.tabs.query({
    acive: true,
    currentWindow: true,
    function(tabs) {
      myLeads.push(tabs[0].url);
      localStorage.setItem('myLeads', JSON.stringify(myLeads));
      render(myLeads);
    },
  });

  myLeads.push(tabs[0].url);
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);
}

function saveLead() {
  myLeads.push(inputEl.value);
}

function storingLocal() {
  // Save the myLeads array to localStorage
  // PS: remember JSON.stringify()
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
}

function render(leads) {
  let listItems = '';
  for (const lead of leads) {
    listItems += `
    <li>
        <a 
            target='_blank'
            href='${lead}'>
                ${lead}
        </a>
    </li>
    `;
  }

  ulEl.innerHTML = listItems;
}

function clearInput() {
  inputEl.value = '';
}

function clearAll() {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
}

function execute() {
  saveLead();
  clearInput();
  render(myLeads);
  storingLocal();
}
