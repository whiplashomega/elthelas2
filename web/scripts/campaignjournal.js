/* global deleteroute getallroute $ */

var days = ["Godsday", "Elvesday", "Gnomesday", "Dragonsday", "Mansday", "Dwarvesday", "Trollsday", "Orcsday"];
var months = ["Dorunor", "Trimalan", "Sylvanus", "Gaiana", "Maridia", "Moltyr", "Saris", "Tockra", "Amatherin"];

function getJournals() {
$.get(getallroute, function(journals) {
    var entries = $("#journalentries");
    entries.html(" ");
    journals.sort(sortdate);
    
    var deletefunction = function() {
        var thisdeleteroute = deleteroute.slice(0, -1) + $(this).attr("data-journal-id");
        $.post(thisdeleteroute, function(t) {
            if (t == "1") {
              getJournals();
            } else {
              alert("Error: Could not Delete");
            }
          });    
    };
    for (var x = 0; x < journals.length; x++) {
      entries.append("<p>" + journals[x].date + "<br />\n" + journals[x].text + "</p>");
      var deletebutton = $("<input type='button' value='Delete' />");
      deletebutton.attr("data-journal-id", journals[x].id);
      $(deletebutton).click(deletefunction);
      entries.append(deletebutton);
      entries.append("<br /><hr />");
    }
  }, "json");
}

function convertdatestring(date) {
  var chars = /^[a-zA-Z]+/;
  var month = date.match(chars);
  month = months.indexOf(month[0]);
  var year = date.substr(date.length - 4);
  var day = date.slice(-8, -5).match(/[0-9]+/);
  return [Number(year), month, Number(day[0])];
}

function sortdate(date1, date2) {
  var numdate1 = convertdatestring(date1.date);
  var numdate2 = convertdatestring(date2.date);
  if (numdate1[0] > numdate2[0]) {
    return -1;
  } else if (numdate1[0] < numdate2[0]) {
    return 1;
  } else if(numdate1[1] > numdate2[1]){
    return -1;
  } else if (numdate1[1] < numdate2[1]) {
    return 1;
  } else if (numdate1[2] > numdate2[2]) {
    return -1;
  } else if (numdate1[2] < numdate2[2]) {
    return 1;
  } else {
    return 0;
  }
}
getJournals();

$("#addjournal").click(function() {
  var month = $("#month").find(":selected").val();
  var day = $("#day").find(":selected").val();
  var year = $("#year").find(":selected").val();
  var date = month + " " + day + ", " + year;
  var text = $("#text").val();
  $.post(addroute, {"date": date, "text": text }, function(t) {
    if (t == "1") {
      console.log("success");
      getJournals();
    }
  }, "text");
});



