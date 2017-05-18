$('.dropdown-toggle').dropdown();

$('.accordion').accordion({
    active: false
  });
$(".racediv").hide();
$(".racebutton").click(function() {
  var race = $(this).attr("data-race");
  var racecontent = $("#" + race).html();
  $("#raceDetails").html(racecontent);
  ga('send','pageview',location.pathname + "/" + race);
});


$(".datatable").DataTable();