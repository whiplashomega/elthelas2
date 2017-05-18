/* global $ loadallpath addpath loadpath */

var currentchar;
var onerow = false; 
function fillform(creature) {
  $("#charform").removeClass("hidden");
  for(var trait in creature) {
    $("#" + trait).val(creature[trait]);
    currentchar = creature;
  }
  $("#charid").val(creature.id);
  $("#attacksdiv .attackrow").remove();
  if (creature.attacks) {
    for(var x = 0; x < creature.attacks.length; x++) {
      var newrow = addAttack();
      newrow.find(".attack").val(creature.attacks[x].attack);
      newrow.find(".bonus").val(creature.attacks[x].bonus);
      newrow.find(".damage").val(creature.attacks[x].damage);
      onerow = true;
    }
  }
}


function loadlist() {
  $.get(loadallpath, {}, function(characters) {
      var select = $("#charselect");
      select.children().remove();
      for (var x = 0; x < characters.length; x++) {
        var option = $("<option></option>").val(characters[x].id).html(characters[x].name);
        option.appendTo(select);
      }
      var newchar = $("<option></option>").val("new").html("New Character");
      newchar.appendTo(select);
    });
}

function loadchar() {
  var selected = $("#charselect").find(":selected").val();
  if (selected == "new") {
    $.post(addpath, function(creature) {
        fillform(creature);
        loadlist();
      });
  } else if(selected == "undefined") {
  } else {
    var correctpath = loadpath.slice(0, -1) + $("#charselect").find(":selected").val();
    $.get(correctpath, function(creature) {
      fillform(creature);
    });
  }
}

function savechar() {
  var charid = $("#charid").val();
  if (charid === "NOCHARLOADED") {
    alert("you must create a new character or load an existing character before you can save.");
  } else {
    var newchar = {};
    for(var trait in currentchar) {
      newchar[trait] = $("#" + trait).val();
      console.log(newchar.trait);
    }
    attacks = [];
    $(".attackrow").each(function() {
      row = $(this);
      attacks.push({
          "attack": row.find(".attack").val(),
          "bonus": row.find(".bonus").val(),
          "damage": row.find(".damage").val()
        });   
    });
    newchar.id = $("#charid").val();
    newchar.attacks = attacks;
    var correctpath = updatepath.slice(0, -1) + newchar.id;
    $.post(correctpath, JSON.stringify(newchar), function() {
      $("#charform").addClass("hidden");        
      loadlist();
    });
  }
}

function deletechar() {
  var charid = $("#charselect").find(":selected").val();
  if (charid !== "new" && charid !== "") {
    var correctpath = deletepath.slice(0, -1) + charid;
    $.post(correctpath, function() {
        loadlist();
        $("#charform").addClass("hidden");
      });
  }
}

function addAttack() { 
  var newrow = $("<div class='row attackrow'><div class='col-md-4'><label>Attack: <input type='text' class='form-control attack' /></label>" +
        "</div><div class='col-md-2'><label for='attackbonus1'>Bonus: <input type='number' class='form-control bonus' /></label>" +
        "</div><div class='col-md-3'><label for='attackdamage1'>Damage: <input type='text' class='form-control damage' /></label></div></div>");
  $("#attacksdiv").append(newrow);
  return newrow;
}

function deleteAttack(btn) {
  $(btn).parent().remove();
}

//implement our callbacks, then load the list
$("#loadchar").click(function() {
  loadchar();
});
$("#savechar").click(function() {
  savechar();  
});
$("#deletechar").on("click", function() {
  deletechar();  
});

$("#addattack").click(function() {
  addAttack();
});

loadlist();