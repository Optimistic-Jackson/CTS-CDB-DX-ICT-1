// Variable declaration

// DOM ELEMENT VARIABLES

const classInputfield = document.getElementById("class-input");
const perfomranceInputfield = document.getElementById("performance-input");
const getRepBtn = document.getElementById("get-rep-btn");
const tableBody = document.getElementById("table-body");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
let inputValues = new Array();

// Fetching data from josn files
const dataObj = fetch("data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    starterFunction(data);
  });

// Function Declarations
function getInput(dataObj) {
  getRepBtn.addEventListener("click", function () {
    inputValues = [
      Number(classInputfield.value),
      String(perfomranceInputfield.value),
    ];
    while (tableBody.lastChild) {
      tableBody.removeChild(tableBody.lastChild);
    }
    printTable(inputValues, dataObj);
  });
}

function printTable(inputValues, dataObj) {
  console.log(inputValues[1]);
  console.log(dataObj.classes[inputValues[0]]);
  let holderObj = dataObj.classes[inputValues[0]];
  console.log(holderObj.studentresults);
  let holderArray = holderObj.studentresults;

  holderArray.forEach(function (e, i) {
    let iconColor;
    if (holderArray[i].peformanceLevel === "Above-Level") {
      iconColor = "green";
    } else if (holderArray[i].peformanceLevel === "On-Level") {
      iconColor = "orange";
    } else if (holderArray[i].peformanceLevel === "Below-Level") {
      iconColor = "red";
    }

    let studentDOMElement = `
      <tr class="student-row" id="student-${i}">
        <td class="student-name" id="student-${i}-name">${holderArray[i].studentName}</td>
        <td class="student-rank" id="student-${i}-rank">${holderArray[i].rank}</td>
        <td style="text-align: left, margin-left: 5px" class="student-performance" id="student-{i}-performance">
          <span>
            ${holderArray[i].rank}
          </span>
          <span>
            <ion-icon style="color: ${iconColor};" name="ellipse"></ion-icon>
          </span>
          <span>
            ${holderArray[i].peformanceLevel}
          </span>
        </td>
        <td class="student-mid-1" id="student-${i}-mid-1">
          ${holderArray[i].mid1Score}
        </td>
        <td class="student-mid-2" id="student-${i}-mid-2">
          ${holderArray[i].mid2score}
        </td>
        <td class="student-final" id="student-${i}-final">
          ${holderArray[i].finalscore}
        </td>
      </tr>
    `;

    if (inputValues[1] == "All") {
      tableBody.insertAdjacentHTML("beforeend", studentDOMElement);
    } else if (
      inputValues[1] == "Above-Level" &&
      holderArray[i].peformanceLevel == "Above-Level"
    ) {
      tableBody.insertAdjacentHTML("beforeend", studentDOMElement);
    } else if (
      inputValues[1] == "On-Level" &&
      holderArray[i].peformanceLevel == "On-Level"
    ) {
      tableBody.insertAdjacentHTML("beforeend", studentDOMElement);
    } else if (
      inputValues[1] == "Below-Level" &&
      holderArray[i].peformanceLevel == "Below-Level"
    ) {
      tableBody.insertAdjacentHTML("beforeend", studentDOMElement);
    }
  });
}

function sortTable(table, sortColumn) {
  // get the data from the table cells
  const tableBody = table.querySelector("tbody");
  const tableData = table2data(tableBody);
  // sort the extracted data
  tableData.sort((a, b) => {
    if (a[sortColumn] > b[sortColumn]) {
      return 1;
    }
    return -1;
  });
  // put the sorted data back into the table
  data2table(tableBody, tableData);
}

// this function gets data from the rows and cells
// within an html tbody element
function table2data(tableBody) {
  const tableData = []; // create the array that'll hold the data rows
  tableBody.querySelectorAll("tr").forEach((row) => {
    // for each table row...
    const rowData = []; // make an array for that row
    row
      .querySelectorAll("td") // for each cell in that row
      .forEach((cell) => {
        rowData.push(cell.innerText); // add it to the row data
      });
    tableData.push(rowData); // add the full row to the table data
  });
  return tableData;
}

// this function puts data into an html tbody element
function data2table(tableBody, tableData) {
  tableBody
    .querySelectorAll("tr") // for each table row...
    .forEach((row, i) => {
      const rowData = tableData[i]; // get the array for the row data
      row
        .querySelectorAll("td") // for each table cell ...
        .forEach((cell, j) => {
          cell.innerText = rowData[j]; // put the appropriate array element into the cell
        });
    });
}

function sort() {
  const table = document.querySelector("table"); //get the table to be sorted

  table
    .querySelectorAll("th") // get all the table header elements
    .forEach((element, columnNo) => {
      // add a click handler for each
      element.addEventListener("click", (event) => {
        sortTable(table, columnNo); //call a function which sorts the table by a given column number
      });
    });
}

function starterFunction(dataObj) {
  getInput(dataObj);
}

function rightClick() {
  const rankRow = document.querySelectorAll("student-rank");
  const rankHead = document.getElementById("rank-head");
  const studentFinal = document.querySelectorAll("student-final");
  const lastHead = document.getElementById("last-head");

  console.log(rankRow, rankRow[1]);

  rightBtn.addEventListener("click", function () {
    rankRow.forEach((e) => (e.style.display = "none"));
    rankHead.style.display = "none";
    studentFinal.forEach((e) => (e.style.display = "block"));
    lastHead.style.display = "block";
  });
}

function leftClick() {
  const rankRow = document.querySelectorAll("student-rank");
  const rankHead = document.getElementById("rank-head");
  const studentFinal = document.querySelectorAll("student-final");
  const lastHead = document.getElementById("last-head");

  console.log(rankRow, rankRow[1]);
  leftBtn.addEventListener("click", function () {
    rankRow.forEach((e) => (e.style.display = "block"));
    rankHead.style.display = "block";
    studentFinal.forEach((e) => (e.style.display = "none"));
    lastHead.style.display = "none";
  });
}

leftClick();
rightClick();
