'use strict';

//getrandom func
function getRandomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let allUsers = [];
//create constructor func
function User(name, type) {

  this.name = name;
  this.type = type;
  this.price = getRandomPrice(100, 500);
  this.condition = '';

  allUsers.push(this);
  this.renderingContentFunction();

}

//create the eventlistner
let form = document.getElementById('form');
form.addEventListener('submit', dataSubmitterFunction);

function dataSubmitterFunction(event) {
  event.preventDefault();
  console.log(event);

  let name = event.target.name.value;
  let type = event.target.type.value;

  //make new instance
  new User(name, type);

  console.log(allUsers);

  settingFunction();

}

//get the table container div from HTML
let tableContainer = document.getElementById('table-container');

//create table element
let table = document.createElement('table');
tableContainer.appendChild(table);

//array for header content
let headerContent = ['User', 'Type', 'Price', 'Condition'];

//make a function to render the header
function headerRenderFunction() {

  //create header row
  let headerRow = document.createElement('tr');
  table.appendChild(headerRow);

  //create header cells
  for (let i = 0; i < headerContent.length; i++) {

    let headerCell = document.createElement('th');
    headerRow.appendChild(headerCell);
    headerCell.textContent = headerContent[i];
  }
}

//render the header
headerRenderFunction();

//create proto method for rendering the content
User.prototype.renderingContentFunction = function () {

  //create new row for the new user object
  let newUserRow = document.createElement('tr');
  table.appendChild(newUserRow);

  //create name cell for the user
  let nameDataCell = document.createElement('td');
  newUserRow.appendChild(nameDataCell);
  nameDataCell.textContent = this.name;

  //create type cell for the user
  let typeDataCell = document.createElement('td');
  newUserRow.appendChild(typeDataCell);
  typeDataCell.textContent = this.type;

  //create price cell for the user
  let priceDataCell = document.createElement('td');
  newUserRow.appendChild(priceDataCell);
  priceDataCell.textContent = this.price;

  //create condition cell for the user
  let conditionDataCell = document.createElement('td');
  newUserRow.appendChild(conditionDataCell);

  //creat if statement to determine the data of condition

  if (this.price < 200) {
    this.condition = 'Used';
    conditionDataCell.textContent = this.condition;
  } else if (this.price >= 200) {
    this.condition = 'New';
    conditionDataCell.textContent = this.condition;
  }



};


//store the data of allUsers in local storage
function settingFunction() {

  let allUsersString = JSON.stringify(allUsers);
  localStorage.setItem('allUsers', allUsersString);

}


//getting stored data for making update of allUsers
function gettingStoredDataFunction() {
  let allUsersFromStorage = localStorage.getItem('allUsers');
  let allUsersParse = JSON.parse(allUsersFromStorage);

  //don't update if the sotrage is empty
  if (allUsersParse) {

    //reinstantiation to restor the missed proto methods
    for (let i = 0; i < allUsersParse.length; i++) {

      new User(allUsersParse[i].name, allUsersParse[i].type);

    }
  }

}

//get data from storage and updte the allUsers array
gettingStoredDataFunction();

//stretch goal: create button to clear the table and local storage
let deletButton = document.createElement('button');
tableContainer.appendChild(deletButton);
deletButton.textContent = 'Clear Data';
deletButton.setAttribute('type', 'button');
deletButton.setAttribute('id', 'button');

//create event listner for clear button
deletButton.addEventListener('click', deleteDataFunction);
function deleteDataFunction() {

  //clear renderd table
  table.textContent = '';
  //render the header again
  headerRenderFunction();
  //clear local storage
  localStorage.clear();

}
