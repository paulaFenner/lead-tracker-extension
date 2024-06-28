const inputBtnEl = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');

let myLeads = [];

inputBtnEl.addEventListener('click', execute);

function saveLead() {
  myLeads.push(inputEl.value);
}

function renderLeads() {
  let listItems = '';
  for (const lead of myLeads) {
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

function clearAll() {
  inputEl.value = '';
}

function execute() {
  saveLead();
  clearAll();
  renderLeads();
}
