
function obtainMainInfo(data) {
  let info = "";
  var list = {};
  let rows = data.split("\n").slice(1)
  console.log(rows)
  // Format: Every person is an entry in list, then for every person there is another list with all the tools correlating to their times.
  for (var i = 0; i < rows.length; i ++) {
    var row = rows[i].split(",");
    console.log(row);
    var tool = row[1];
    var checkedIn = row[3];
    var checkedOut = row[2];
    var name = row[0];
    if (name == "") continue;
    if (list[name] == null) list[name] = {}; // Add an entry to list only if it does not exist

    var status = "";
    // An empty cell returns an empty string instead of an object. I use typeof to determine empty cell
    console.log(checkedIn == "");
    if (checkedIn == "\r" || checkedIn == "") {
      status = "";
    } else {
      status = " (at " + checkedOut + ")";
    }
    list[name][tool] = status;
  }

  var keys = list;
  console.log(list);
  // Now display the data
  for (var key in list) { 
    console.log(key) 
    var data = list[key]
    var subsection = "<div class=\"Item\" style=\"order:" + (key.charCodeAt(0)) + ";\">";
    subsection += "<h1>" + key + "</h1>";
  
    for (var item in data) {
      if (data[item] == "") {
        subsection += "<h2>" + item + data[item] + "</h2>";
      } else {
        subsection += "<h2 class=\'Done\'>" + item + data[item] + "</h2>";
      }
    }
    subsection += "</div>";

    info += subsection;
  }
  return info;
}

function ready() {
  document.getElementById("FileHolder").innerHTML = "<input type=\"file\" id=\"FileInput\">"
  let fileSelector = document.getElementById("FileInput");
  fileSelector.addEventListener('change', (event) => {
    const file = event.target.files[0];
    console.log(file)
    let fileReader = new FileReader(); 
      fileReader.readAsText(file); 
      fileReader.onload = function() {
        let info = obtainMainInfo(fileReader.result);
        document.getElementById("Content").innerHTML = info;
        ready();
      }; 
      fileReader.onerror = function() {
        alert(fileReader.error);
      }; 
  })  
}
ready();