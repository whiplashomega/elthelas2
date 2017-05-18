/* global $ loadpath loadallpath */

function loadchar(location) {
  var correctpath = loadpath.slice(0, -1) + $("#charselect").find(":selected").val();
  $.get(correctpath, function(data) {
      if (location !== "initiative") {
        buildchar(data, location);
      } else {
        addinit(data);
      }
      
    });
}

function buildchar(character, location) {
  var chardiv = $("#templates .character").clone();
  //TODO: Add data
  chardiv.find(".ac").text(character.ac);
  chardiv.find(".speed").text(character.speed);
  chardiv.find(".acrobatics").text(character.acrobatics);
  chardiv.find(".alignment").text(character.alignment);
  chardiv.find(".animalhandling").text(character.animalhandling);
  chardiv.find(".arcana").text(character.arcana);
  chardiv.find(".athletics").text(character.athletics);
  var attacks = character.attacks;
  for (var x in attacks) {
    var attackrow = $("#templates .attack").clone();
    attackrow.find(".attackname").text(attacks[x].attack);
    attackrow.find(".bonus").text(attacks[x].bonus);
    attackrow.find(".damage").text(attacks[x].damage);
    chardiv.find(".attacks").append(attackrow);
  }
  chardiv.find(".background").text(character.background);
  chardiv.find(".cha").text(character.cha);
  chardiv.find(".chasave").text(character.chasave);
  chardiv.find(".classlevel").text(character.classlevel);
  chardiv.find(".con").text(character.con);
  chardiv.find(".consave").text(character.consave);
  chardiv.find(".cr").text(character.cr);
  chardiv.find(".deception").text(character.deception);
  chardiv.find(".dex").text(character.dex);
  chardiv.find(".dexsave").text(character.dexsave);
  chardiv.find(".experience").text(character.experience);
  chardiv.find(".features").text(character.features);
  chardiv.find(".history").text(character.history);
  chardiv.find(".hitdice").text(character.hitdice);
  chardiv.find(".hpmax").text(character.hpmax);
  chardiv.find(".insight").text(character.insight);
  chardiv.find(".intel").text(character.intel);
  chardiv.find(".intimidation").text(character.intimidation);
  chardiv.find(".intsave").text(character.intsave);
  chardiv.find(".investigation").text(character.investigation);
  chardiv.find(".medicine").text(character.medicine);
  chardiv.find(".name").text(character.name);
  chardiv.find(".nature").text(character.nature);
  chardiv.find(".passiveperception").text(character.passiveperception);
  chardiv.find(".perception").text(character.perception);
  chardiv.find(".performance").text(character.performance);
  chardiv.find(".persuasion").text(character.persuasion);
  chardiv.find(".physicaldescription").text(character.physicaldescription);
  chardiv.find(".possessions").text(character.possessions);
  chardiv.find(".proficiencybonus").text(character.proficiencybonus);
  chardiv.find(".race").text(character.race);
  chardiv.find(".religion").text(character.religion);
  chardiv.find(".slightofhand").text(character.slightofhand);
  chardiv.find(".stealth").text(character.stealth);
  chardiv.find(".str").text(character.str);
  chardiv.find(".strsave").text(character.strsave);
  chardiv.find(".survival").text(character.survival);
  chardiv.find(".wis").text(character.wis);
  chardiv.find(".damageresistances").text(character.damageresistances);
  chardiv.find(".immunities").text(character.immunities);
  chardiv.find(".senses").text(character.senses);
  chardiv.find(".languages").text(character.languages);
  chardiv.find(".wissave").text(character.wissave);
  chardiv.find(".accordion").accordion({
      heightStyle: "content",
      collapsible: true
    });
  //Append
  chardiv.find(".delete").click(function() {
    $(this).parent().remove();
  });
  $("#" + location).append(chardiv);  
}

function addinit(character) {
  var initiative = Math.floor((character.dex - 10)/2);
  $("#chartablebody tr:last-child .charname").val(character.name);
  $("#chartablebody tr:last-child .charinit").val(initiative);
}

$(document).ready(function () {
$.get(loadallpath, function(data) {
  for (var character in data) {
    var option = $("<option></option>");    
    option.text(data[character].name);
    option.val(data[character].id);
    $("#charselect").append(option);
  }
});

$("#addparty").click(function(){
  loadchar("party");
  });

$("#addencounter").click(function(){
  loadchar("encounter");
  });

$("#addinitiative").click(function() {
  loadchar("initiative");
});

});
