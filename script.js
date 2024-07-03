import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const firebaseConfig = {
  databaseURL:
    'https://leads-tracker-app-be763-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, 'leads');

const inputBtnEl = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const deleteBtnEl = document.getElementById('delete-btn');

onValue(referenceInDB, function (snapshot) {
  const snapshotDoesExist = snapshot.exists();
  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    render(leads);
  }
});

inputBtnEl.addEventListener('click', execute);
deleteBtnEl.addEventListener('dblclick', clearAll);

function saveLead() {
  push(referenceInDB, inputEl.value);
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
  remove(referenceInDB);
  ulEl.innerHTML = '';
}

function execute() {
  saveLead();
  clearInput();
  // render(myLeads);
}
