var table = document.getElementById("myTable");
let term=document.querySelector("#seach_bar")

function renderData(data) {
  table.innerHTML = "";
  var row = table.insertRow(0);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  var cell4 = row.insertCell(4);
  var cell5 = row.insertCell(5);
  cell0.innerHTML = `NAME`;
  cell1.innerHTML = `SYMBOL`;
  cell2.innerHTML = `CURRENT PRICE`;
  cell3.innerHTML = `ATH`;
  cell4.innerHTML = `PERCENTAGE`;
  cell5.innerHTML = `MARKET CAP`;
  function styleCell(cell) {
    cell.style.fontSize = "1.5rem";
    cell.style.color = "rgba(227, 255, 127, 0.689)";
  }
  styleCell(cell0);
  styleCell(cell1);
  styleCell(cell2);
  styleCell(cell3);
  styleCell(cell4);
  styleCell(cell5);

  let i = 1;
  data.forEach((element) => {
    var row = table.insertRow(i);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.marginLeft = "30%";
    div.style.gap = "10px";
    var img = document.createElement("img");
    img.src = element.image;
    img.width = 30;
    img.height = 30;
    var name = document.createTextNode(`${element.name}`);
    div.appendChild(img);
    div.appendChild(name);
    cell0.appendChild(div);
    cell1.innerHTML = `${element.symbol}`;
    cell2.innerHTML = `$${element.current_price}`;
    cell3.innerHTML = `$${element.ath}`;
    cell4.innerHTML = `${element.market_cap_change_percentage_24h}`;
    if (element.market_cap_change_percentage_24h >= 0) {
      cell4.style.color = "green";
    } else {
      cell4.style.color = "red";
    }
    cell5.innerHTML = `$${element.market_cap}`;

    i++;
  });
}
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    renderData(data);
  });

function sortPercentage() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      let sortedDataPer = data.sort((a, b) => {
        return (
          b.market_cap_change_percentage_24h -
          a.market_cap_change_percentage_24h
        );
      });

      renderData(sortedDataPer);
    });
}

function sortAth() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      let i = 1;
      let sortedData = data.sort((a, b) => b.ath - a.ath);
      renderData(sortedData);
    });
}


function search(){
    fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        let searchTerm=term.value
        let filterData=data.filter((value)=>
        value.symbol.toLowerCase().includes(searchTerm.toLowerCase())||value.name.toLowerCase().includes(searchTerm.toLowerCase()));
      renderData(filterData);
    });  
}