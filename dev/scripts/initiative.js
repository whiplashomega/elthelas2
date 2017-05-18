/* global $ */

    function addrow() {
      var numchars = Number($("#chartablebody tr:last-child").attr("name").replace(/\D/g,''));
      var chartbody = $("#chartablebody");
      var newrow = $("#chartablebody tr:last-child").clone();
      $(newrow).attr("name", "char" + (numchars + 1));
      $(newrow).attr("id", "char" + (numchars +1));
      $(newrow).find("input[type='text']").attr("name", "char" + (numchars + 1) + "name");
      $(newrow).find("input[type='number']").attr("name", "char" + (numchars + 1) + "init");
      $(newrow).find("input[type='text']").attr("id", "char" + (numchars + 1) + "name");
      $(newrow).find("input[type='number']").attr("id", "char" + (numchars + 1) + "init");
      $(chartbody).append(newrow);
    }
    
    $("#addCharButton").click(function() {
      addrow();
    });
    var sort_rows = function(a, b) {
      var val1 = Number($(a).find(".charroll").html());
      var val2 = Number($(b).find(".charroll").html());
      if (val1 > val2) {
        return -1;
      } else if (val2 > val1) {
        return 1;
      } else {
        var val12 = Number($(a).find(".charinit").val());
        var val22 = Number($(b).find(".charinit").val());
        if (val12 > val22) {
          return -1;
        } else if (val22 > val12) {
          return 1;
        } else {
          return 0;
        }
      }
    };
    $("#rollinit").click(function() {
      $(".characterinit").each(function() {
          var score = Number($(this).find(".charinit").val());
          var roll = Math.floor((Math.random() * 20) + 1);
          $(this).find(".charroll").html(score + roll);
        });
      var list = $(".characterinit").get();
      list.sort(sort_rows);
      for(var i = 0; i < list.length; i++) {
        list[i].parentNode.appendChild(list[i]);
      }
    });