const inputBtnEl = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const deleteBtnEl = document.getElementById('delete-btn');

let myLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

inputBtnEl.addEventListener('click', execute);
deleteBtnEl.addEventListener('dblclick', clearAll);

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
