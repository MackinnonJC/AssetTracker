

function formatTime(date) {
  var originalHours = Utilities.formatDate(date, 'America/New_York', 'HH');
  var originalMinutes = Utilities.formatDate(date, 'America/New_York', 'mm');
  var hours = parseInt(originalHours);
  if (hours > 12) {
    hours -= 12;
  }
  return hours + ":" + originalMinutes;
}

function obtainMainInfo(data) {
  let info = "";
  var list = {};
  // Format: Every person is an entry in list, then for every person there is another list with all the tools correlating to their times.
  for (var i = 1; i < data.length; i++) {
    var row = data[i]
    var tool = row[1];
    var checkedIn = row[3];
    var checkedOut = row[2];
    var name = row[0];
    if (name == "") continue;
    if (list[name] == null) list[name] = {}; // Add an entry to list only if it does not exist

    var status = "";
    // An empty cell returns an empty string instead of an object. I use typeof to determine empty cell
    if (typeof(checkedIn) == "string") {
      status = "";
    } else {
      status = " (at " + formatTime(checkedOut) + ")";
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