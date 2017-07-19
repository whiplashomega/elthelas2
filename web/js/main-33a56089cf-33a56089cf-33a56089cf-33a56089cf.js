"use strict";!function(e,t){var n=t.module("elthelas",["ui.router","hc.marked","ui.bootstrap","ngCookies","ngTimeline"]);n.run(["$state","$stateParams",function(e,t){}]),n.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,n){e.state("app",{url:"/",views:{header:{templateUrl:"/html/header/header.html",controller:"HeaderController"},footer:{templateUrl:"/html/footer/footer.html"},content:{templateUrl:"/html/content/home.html"},head:{templateUrl:"/html/head/home.html"},sidebar:{templateUrl:"/html/empty.html"}},data:{title:"Home"}}).state("app.domains",{url:"options/domains",views:{"content@":{templateUrl:"/html/content/options/domains.html"},"head@":{templateUrl:"/html/head/options/domains.html"},"sidebar@":{templateUrl:"/html/sidebar/options.html"}},data:{title:"Domains"}}).state("app.races",{url:"options/races",views:{"content@":{templateUrl:"/html/content/options/races.html",controller:"RaceController"},"head@":{templateUrl:"/html/head/options/races.html"},"sidebar@":{templateUrl:"/html/sidebar/options.html"}},data:{title:"Races"},resolve:{race:function(){return!1}}}).state("app.race",{url:"options/races/:race",views:{"content@":{templateUrl:"/html/content/options/races.html",controller:"RaceController"},"head@":{templateUrl:"/html/head/options/races.html"},"sidebar@":{templateUrl:"/html/sidebar/options.html"}},data:{title:"Races"},resolve:{race:["$stateParams",function(e){return e.race}]}}).state("app.languages",{url:"options/languages",views:{"content@":{templateUrl:"/html/content/options/languages.html",controller:"LanguagesController"},"head@":{templateUrl:"/html/head/options/languages.html"},"sidebar@":{templateUrl:"/html/sidebar/options.html"}},data:{title:"Languages"}}).state("app.gods",{url:"ref/gods",views:{"content@":{templateUrl:"/html/content/ref/gods.html",controller:"GodsController"},"head@":{templateUrl:"/html/head/ref/gods.html"},"sidebar@":{templateUrl:"/html/sidebar/ref.html"}},data:{title:"Gods"},resolve:{god:function(){return!1}}}).state("app.god",{url:"ref/gods/:god",views:{"content@":{templateUrl:"/html/content/ref/gods.html",controller:"GodsController"},"head@":{templateUrl:"/html/head/ref/gods.html"},"sidebar@":{templateUrl:"/html/sidebar/ref.html"}},data:{title:"Gods"},resolve:{god:["$stateParams",function(e){return e.god}]}}).state("app.organizations",{url:"ref/orgs",views:{"content@":{templateUrl:"/html/content/ref/organizations.html",controller:"OrganizationController"},"head@":{templateUrl:"/html/head/ref/organizations.html"},"sidebar@":{templateUrl:"/html/sidebar/ref.html"}},data:{title:"Organizations"},resolve:{org:function(){return!1}}}).state("app.organization",{url:"ref/orgs/:org",views:{"content@":{templateUrl:"/html/content/ref/organizations.html",controller:"OrganizationController"},"head@":{templateUrl:"/html/head/ref/organizations.html"},"sidebar@":{templateUrl:"/html/sidebar/ref.html"}},data:{title:"Organizations"},resolve:{org:["$stateParams",function(e){return e.org}]}}).state("app.calendar",{url:"ref/calendar",views:{"content@":{templateUrl:"/html/content/ref/calendar.html"},"head@":{templateUrl:"/html/head/ref/calendar.html"},"sidebar@":{templateUrl:"/html/sidebar/ref.html"}},data:{title:"Calendar"}}).state("app.cosmology",{url:"ref/cosmology",views:{"content@":{templateUrl:"/html/content/ref/cosmology.html"},"head@":{templateUrl:"/html/head/ref/cosmology.html"},"sidebar@":{templateUrl:"/html/sidebar/ref.html"}},data:{title:"Cosmology"}}).state("app.astronomy",{url:"ref/astronomy",views:{"content@":{templateUrl:"/html/content/ref/astronomy.html"},"head@":{templateUrl:"/html/head/ref/astronomy.html"},"sidebar@":{templateUrl:"/html/sidebar/ref.html"}},data:{title:"Astronomy"}}).state("app.magic",{url:"ref/magic",views:{"content@":{templateUrl:"/html/content/ref/magic.html"},"head@":{templateUrl:"/html/head/ref/magic.html"},"sidebar@":{templateUrl:"/html/sidebar/ref.html"}},data:{title:"Magic"}}).state("app.divines",{url:"ref/divines",views:{"content@":{templateUrl:"/html/content/ref/divines.html",controller:"DivineController"},"head@":{templateUrl:"/html/head/ref/divines.html"},"sidebar@":{templateUrl:"/html/sidebar/ref.html"}},data:{title:"Divines"}}).state("app.quickref",{url:"ref/quick",views:{"content@":{templateUrl:"/html/content/ref/quick.html",controller:"QuickController"},"head@":{templateUrl:"/html/head/ref/quick.html"},"sidebar@":{templateUrl:"/html/sidebar/ref.html"}},data:{title:"Quick Reference Manual"}}).state("app.history",{url:"history",views:{"content@":{templateUrl:"/html/content/history.html",controller:"HistoryController"},"head@":{templateUrl:"/html/head/history.html"},"sidebar@":{templateUrl:"/html/empty.html"}},data:{title:"History"},resolve:{event:function(){return!1}}}).state("app.historyevent",{url:"history/:eventname",views:{"content@":{templateUrl:"/html/content/history.html",controller:"HistoryController"},"head@":{templateUrl:"/html/head/history.html"},"sidebar@":{templateUrl:"/html/empty.html"}},data:{title:"History"},resolve:{event:["$stateParams",function(e){return e.eventname}]}}).state("app.classes",{url:"ref/class",views:{"content@":{templateUrl:"/html/content/options/classes.html",controller:"ClassController"},"head@":{templateUrl:"/html/head/options/races.html"},"sidebar@":{templateUrl:"/html/sidebar/options.html"}}}).state("app.geo",{url:"geo",views:{"content@":{templateUrl:"/html/content/geo.html",controller:"GeographyController"},"head@":{templateUrl:"/html/head/geo.html"},"sidebar@":{templateUrl:"/html/empty.html"}},data:{title:"Geography"},resolve:{location:function(){return!1},type:function(){return!1}}}).state("app.geoitem",{url:"geo/:type/:location",views:{"content@":{templateUrl:"/html/content/geo.html",controller:"GeographyController"},"head@":{templateUrl:"/html/head/geo.html"},"sidebar@":{templateUrl:"/html/empty.html"}},data:{title:"Geography"},resolve:{type:["$stateParams",function(e){return e.type}],location:["$stateParams",function(e){return e.location}]}}),n.html5Mode(!0)}])}(jQuery,angular),function(e,t){t.module("elthelas").controller("DivineController",["$scope","divineProvider",function(e,t){e.Divine="",e.divines=[],e.types=[],e.divineFilter=null,e.filterDivines=function(t){return null===e.divineFilter||t.type===e.divineFilter},e.loadDivine=function(t){e.Divine=e.divines.filter(function(e){return e.id===t})[0]},t.getDivines().then(function(t){e.divines=t.data.documents;for(var n=0;n<e.divines.length;n++)-1===e.types.indexOf(e.divines[n].type)&&e.types.push(e.divines[n].type)})}])}(jQuery,angular),function(e,t){t.module("elthelas").controller("GodsController",["$scope","godProvider","god",function(e,t,n){e.gods=!1,e.GodByName="",e.alignment="",e.loadGod=function(t){e.GodByName=e.gods.filter(function(e){return e.id===t})[0]},t.getGods().then(function(t){e.gods=t.data.documents,e.loadGod(e.gods.filter(function(e){return e.id===n||e.name===n})[0].id)})}])}(jQuery,angular),function(e,t,n){e.module("elthelas").controller("HeaderController",["$scope","$state","$rootScope","$uibModal","$document","AuthenticationProvider",function(e,o,r,a,l,i){var s=n.createElement("script");s.type="text/javascript",s.async=!0,s.src=(n.location.protocol,"https://www.google.com/cse/cse.js?cx=002019895859863268942:tbtmwpd5jy8");var c=n.getElementsByTagName("script")[0];c.parentNode.insertBefore(s,c),e.title=o.current.data.title,r.$on("$stateChangeSuccess",function(t,n,r,a,l,i){e.title=o.current.data.title}),i.LoadFromCookies(),e.globals=r.globals,e.message=!1,e.login=function(n){var o=t("body");a.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"/app_dev.php/login",controller:"LoginController",size:n,appendTo:o}).result.then(function(t){e.globals=r.globals},function(){console.log("Modal dismissed at: "+new Date),e.globals=r.globals})},e.logout=function(){e.globals=void 0,i.ClearCredentials()},e.register=function(n){var o=t("body");a.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"/app_dev.php/register/",controller:"RegisterController",size:n,appendTo:o}).result.then(function(t){t(),e.message=r.message,setTimeout(function(){e.message=!1,e.$apply()},5e3)},function(){console.log("Modal dismissed at: "+new Date),e.globals=r.globals})}}])}(angular,jQuery,document),function(e,t){t.module("elthelas").controller("LanguagesController",["$scope",function(t){t.init=function(){e(".datatable").dataTable()}}])}(jQuery,angular),function(e,t){t.module("elthelas").controller("OrganizationController",["$scope","$location","organizationProvider","org",function(e,t,n,o){e.currentOrg=!1,e.loadOrg=function(t){var n=e.organizations.filter(function(e){return e.id===t});n.length>0?e.currentOrg=n[0]:e.currentOrg={id:"error",name:""}},n.getOrganizations().then(function(t){e.organizations=t.data.documents,o&&e.loadOrg(e.organizations.filter(function(e){return e.id===o||e.title===o})[0].id)})}])}(jQuery,angular),function(e,t){t.module("elthelas").controller("QuickController",["$scope","SpellProvider","$uibModal",function(t,n,o){t.loadSpell=function(n){t.currentSpell=t.spells[n],t.$apply();var r=e("body");o.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"/html/modals/spell.html",controller:"SpellController",size:"lg",appendTo:r,resolve:{spell:function(){return t.currentSpell}}}).result.then(function(e){},function(){console.log("Modal dismissed at: "+new Date)})},t.currentSpell=!1,t.spells,this.init=function(){n.getSpells().then(function(n){t.spells=n.data.documents;for(var o=[],r=0;r<t.spells.length;r++){void 0!==t.spells[r].level?t.spells[r].level=t.spells[r].level.replace("level",""):t.spells[r].level=" ";var a="spell"+r,l=['<a href="#" data-spellid="'+r+'" class="'+a+'">'+t.spells[r].title+"</a>",t.spells[r].level,t.spells[r].school,t.spells[r].castingTime,t.spells[r].duration,t.spells[r].tags.join(", "),"<input type='button' value='View' class='btn btn-sm btn-primary "+a+"' data-spellid='"+r+"' />"];o.push(l)}e("#spelltable").dataTable({data:o,responsive:!0,columns:[{title:"Title"},{title:"Level"},{title:"School"},{title:"Casting Time"},{title:"Duration"},{title:"Tags"},{title:"View"}],drawCallback:function(){for(var n=function(){t.loadSpell(Number(e(this).attr("data-spellid")))},o=0;o<t.spells.length;o++)e(".spell"+o).click(n)}})})},this.init()}])}(jQuery,angular),function(e,t){t.module("elthelas").controller("RaceController",["$scope","raceProvider","race",function(t,n,o){t.currentRace=!1,t.loadRace=function(e){var n=t.races.filter(function(t){return t.id===e});n.length>0?t.currentRace=n[0]:t.currentRace={id:"error",name:""}},t.formatAgeDataRow=function(e){var t=[];try{t.push(e.name),t.push(e.agepoints.puberty),t.push(e.agepoints.sexualmaturity),t.push(e.agepoints.mentalmaturity),t.push(e.agepoints.middleage),t.push(e.agepoints.oldage),t.push(e.agepoints.averagelifespan),t.push(e.agepoints.maxage)}catch(n){t=[],void 0===e.name||null===e.name?t.push("Error"):t.push(e.name),t.push(1),t.push(2),t.push(3),t.push(4),t.push(5),t.push(6),t.push(7)}return t},t.getAllAgeData=function(){for(var e=[],n=0;n<t.races.length;n++)e.push(this.formatAgeDataRow(t.races[n]));return e},t.formatSizeDataRow=function(e,t){var n=[];null!==t&&void 0!==t||(t="default");try{var o=e.subraces.filter(function(e){return e.id===t})[0];"default"===t?n.push(e.name):n.push(o.name),n.push(Math.floor(o.averageheight/12)+"'"+o.averageheight%12+'"'),n.push(Math.floor(o.baseheight/12)+"'"+o.baseheight%12+'"'),n.push(o.heightroll),n.push(o.averageweight+" lbs"),n.push(o.baseweight+" lbs"),n.push("Height Roll * "+o.weightroll)}catch(e){n=["Error",1,1,1,1,1,1]}return n},t.getAllSizeData=function(){for(var e=[],n=0;n<t.races.length;n++){var o=t.races[n];if(null===o.subraces||void 0===o.subraces)e.push(t.formatSizeDataRow(o));else for(var r=0;r<o.subraces.length;r++)e.push(t.formatSizeDataRow(o,o.subraces[r].id))}return e},n.getRaces().then(function(n){t.races=n.data.documents,o&&t.loadRace(t.races.filter(function(e){if(e.id===o||e.name===o)return!0;for(var t=0;t<e.subraces.length;t++)if(e.subraces[t].id===o||e.subraces[t].name===o)return!0})[0].id),e("#ageTable").dataTable({data:t.getAllAgeData(),columns:[{title:"Race"},{title:"Start of Puberty"},{title:"Sexual Maturity"},{title:"Mental Maturity"},{title:"Middle Age"},{title:"Old Age"},{title:"Average Lifespan"},{title:"Maximum Age"}]}),e("#sizeTable").dataTable({data:t.getAllSizeData(),columns:[{title:"Race/Subrace"},{title:"Average Height"},{title:"Base Height"},{title:"Height Roll"},{title:"Average Weight"},{title:"Base Weight"},{title:"Weight Roll"}]})})}])}(jQuery,angular),function(e,t){angular.module("elthelas").controller("LoginController",["$scope","$location","AuthenticationProvider","$uibModalInstance",function(e,n,o,r){function a(){return l.dataLoading=!0,o.Login(e.username,e.password,l.postLogin)}var l=this;e.username,e.password,e.rememberMe,e.login=a,l.postLogin=function(n){200===n.status?n.data.success?(o.SetCredentials(e.username,e.password,e.rememberMe),r.close("login success")):(t(".modal-body .alert").remove(),t(".modal-body").prepend("<div class='alert alert-danger'>"+n.data.message+"</div>")):l.dataLoading=!1},e.cancel=function(){r.dismiss("cancel")}}])}(angular,jQuery),function(e,t){e.module("elthelas").controller("RegisterController",["$location","$http","$rootScope","$uibModalInstance","$scope","AuthenticationProvider",function(e,n,o,r,a,l){function i(){s.dataLoading=!0,l.Register(t("#fos_user_registration_form_username").val(),t("#fos_user_registration_form_plainPassword_first").val(),t("#fos_user_registration_form_plainPassword_second").val(),t("#fos_user_registration_form_email").val(),t("#fos_user_registration_form__token").val(),function(e){r.close(function(){o.message=e.data})})}var s=this;a.register=i,a.cancel=function(){r.dismiss("cancel")}}])}(angular,jQuery),function(e){e.module("elthelas").controller("SpellController",["$scope","$uibModalInstance","spell",function(e,t,n){e.spell=n,e.cancel=function(){t.close("cancel")}}])}(angular),function(e,t){e.module("elthelas").controller("HistoryController",["marked","$scope","HistoryProvider","$uibModal","event",function(e,n,o,r,a){n.options={language:"el",layout:"portrait",timenav_position:"top",scale_factor:20},n.history=[],o.getHistory().then(function(o){n.history=o.data.documents;var l={title:{text:{headline:"Known History of Elthelas",text:""}},events:n.history};for(var i in l.events)l.events[i].text.text=e(l.events[i].text.text);if(n.timeline.setData(l),n.timeline.goTo(l.events.length),a){var s=n.history.filter(function(e){return e.text.headline.toLowerCase().replace(/ /g,"")===a.toLowerCase().replace(/ /g,"")})[0];r.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"/html/modals/event.html",controller:"HistoryEventController",size:"lg",appendTo:t("body"),resolve:{event:function(){return s}}}).result.then(function(e){},function(){console.log("Modal dismissed at: "+new Date)})}},function(){})}]).controller("HistoryEventController",["$scope","$uibModalInstance","event",function(e,t,n){function o(e){switch(Number(e.data.month)){case 1:e.month="Neradan";break;case 2:e.month="Dorunor";break;case 3:e.month="Trimalan";break;case 4:e.month="Sylvanus";break;case 5:e.month="Gaiana";break;case 6:e.month="Alohiman";break;case 7:e.month="Coranus";break;case 8:e.month="Moltyr";break;case 9:e.month="Saris";break;case 10:e.month="Maridia";break;case 11:e.month="Tockra";break;case 12:e.month="Amatherin"}return e.day=e.data.day,e.year=e.data.year,e}e.event=n,e.event.start_date=o(e.event.start_date),e.event.end_date&&(e.event.end_date=o(e.event.end_date)),e.cancel=function(){t.close("cancel")}}])}(angular,jQuery),function(e,t){e.module("elthelas").controller("ClassController",["$scope",function(e){t(".racediv").hide(),t(".racebutton").click(function(){var e=t(this).attr("data-race");t(".racediv").hide(),t("#"+e).show()})}])}(angular,jQuery),function(e,t){t.module("elthelas").controller("GeographyController",["$scope","geoProvider","$uibModal","$q","type","location",function(t,n,o,r,a,l){function i(t,n){var r=e("body");o.open({animation:!0,ariaLabelledBy:"modal-title",ariaDescribedBy:"modal-body",templateUrl:"/html/modals/"+n+".html",controller:"GeoDetailsController",size:"lg",appendTo:r,resolve:{geoitem:function(){return t}}}).result.then(function(e){},function(){console.log("Modal dismissed at: "+new Date)})}function s(t,n){var o=L.marker(t.coords,{alt:t.name,city:t}).bindTooltip(t.name,{permanent:!0,interactive:!0,direction:"auto",opacity:.75});e(o).click(function(){c.flyTo(t.coords,4),i(t,n)}),o.addTo(c),u.push(o)}t.cities,t.continents,t.nations,t.features,t.landmarks;var c=L.map("map").setView([0,0],2);c.on("click",function(e){alert("Lat, Lon : "+e.latlng.lat+", "+e.latlng.lng)});var u=[];L.tileLayer("/images/maps/tiles/{z}/{y}/{x}.png",{attribution:"|--------| = 320/160/80/40 miles by zoom | map image created by Heather Domaszek",minZoom:0,maxZoom:4,tms:!0,noWrap:!0}).addTo(c),t.showAll=function(){for(var e=0;e<u.length;e++)c.removeLayer(u[e]);for(var n=0;n<t.cities.length;n++)s(t.cities[n],"city");for(var o=0;o<t.nations.length;o++)s(t.nations[o],"nation");for(var r=0;r<t.landmarks.length;r++)s(t.landmarks[r],"landmark");for(var a=0;a<t.features.length;a++)s(t.features[a],"feature");for(var l=0;l<t.continents.length;l++)s(t.continents[l],"continent")},t.showCities=function(){for(var e=0;e<u.length;e++)c.removeLayer(u[e]);for(var n=0;n<t.cities.length;n++)s(t.cities[n],"city")},t.showNations=function(){for(var e=0;e<u.length;e++)c.removeLayer(u[e]);for(var n=0;n<t.nations.length;n++)s(t.nations[n],"nation")},t.showFeatures=function(){for(var e=0;e<u.length;e++)c.removeLayer(u[e]);for(var n=0;n<t.features.length;n++)s(t.features[n],"feature")},t.showLandmarks=function(){for(var e=0;e<u.length;e++)c.removeLayer(u[e]);for(var n=0;n<t.landmarks.length;n++)s(t.landmarks[n],"landmark")},t.showContinents=function(){for(var e=0;e<u.length;e++)c.removeLayer(u[e]);for(var n=0;n<t.continents.length;n++)s(t.continents[n],"continent")},r.all([n.getCities().then(function(e){t.cities=e.data.documents},function(e){console.log(e)}),n.getNations().then(function(e){t.nations=e.data.documents},function(e){console.log(e)}),n.getFeatures().then(function(e){t.features=e.data.documents},function(e){console.log(e)}),n.getLandmarks().then(function(e){t.landmarks=e.data.documents},function(e){console.log(e)}),n.getContinents().then(function(e){t.continents=e.data.documents},function(e){console.log(e)})]).then(function(){var e;l&&a&&("continent"===a&&(e=t.continents.filter(function(e){return e.name===l})[0]),"city"===a&&(e=t.cities.filter(function(e){return e.name===l})[0]),"nation"===a&&(e=t.nations.filter(function(e){return e.name===l})[0]),"landmark"===a&&(e=t.landmarks.filter(function(e){return e.name===l})[0]),"feature"===a&&(e=t.features.filter(function(e){return e.name===l})[0]),i(e,a))})}]).controller("GeoDetailsController",["$scope","$uibModalInstance","geoitem",function(e,t,n){if(e.geoitem=n,e.otherSize=1,e.init=function(){var e=L.map("smallmap").setView(n.coords,4);L.tileLayer("/images/maps/tiles/{z}/{y}/{x}.png",{attribution:"|--------| = 320/160/80/40 miles by zoom | map image created by Heather Domaszek",minZoom:0,maxZoom:4,tms:!0,noWrap:!0}).addTo(e)},n.populationDistribution)for(var o=0;o<n.populationDistribution.length;o++)e.otherSize-=n.populationDistribution[o].proportion;e.cancel=function(){t.close("cancel")}}])}(jQuery,angular),function(e,t){t.module("elthelas").factory("divineProvider",["$q","$http",function(e,t){var n={};return n.getDivines=function(){var n=e.defer();return t.get("/json/divines.json").then(function(e){n.resolve(e)},function(e){n.reject()}),n.promise},n}])}(jQuery,angular),function(e,t){t.module("elthelas").factory("godProvider",["$q","$http",function(e,t){var n={};return n.getGods=function(){var n=e.defer();return t.get("/json/gods.json").then(function(e){n.resolve(e)},function(e){n.reject()}),n.promise},n}])}(jQuery,angular),function(e,t){t.module("elthelas").factory("organizationProvider",["$q","$http",function(e,t){var n={};return n.getOrganizations=function(){var n=e.defer();return t.get("/json/organizations.json").then(function(e){n.resolve(e)},function(e){n.reject()}),n.promise},n}])}(jQuery,angular),function(e,t){t.module("elthelas").factory("raceProvider",["$q","$http",function(e,t){var n={};return n.getRaces=function(){var n=e.defer();return t.get("/json/races.json").then(function(e){n.resolve(e)},function(e){n.reject()}),n.promise},n}])}(jQuery,angular),function(e){var t={keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t,n,o,r,a,l="",i="",s="",c=0;do{t=e.charCodeAt(c++),n=e.charCodeAt(c++),i=e.charCodeAt(c++),o=t>>2,r=(3&t)<<4|n>>4,a=(15&n)<<2|i>>6,s=63&i,isNaN(n)?a=s=64:isNaN(i)&&(s=64),l=l+this.keyStr.charAt(o)+this.keyStr.charAt(r)+this.keyStr.charAt(a)+this.keyStr.charAt(s),t=n=i="",o=r=a=s=""}while(c<e.length);return l},decode:function(e){var t,n,o,r,a,l="",i="",s="",c=0;/[^A-Za-z0-9\+\/\=]/g.exec(e)&&window.alert("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."),e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{o=this.keyStr.indexOf(e.charAt(c++)),r=this.keyStr.indexOf(e.charAt(c++)),a=this.keyStr.indexOf(e.charAt(c++)),s=this.keyStr.indexOf(e.charAt(c++)),t=o<<2|r>>4,n=(15&r)<<4|a>>2,i=(3&a)<<6|s,l+=String.fromCharCode(t),64!==a&&(l+=String.fromCharCode(n)),64!==s&&(l+=String.fromCharCode(i)),t=n=i="",o=r=a=s=""}while(c<e.length);return l}};angular.module("elthelas").factory("AuthenticationProvider",["$http","$cookies","$rootScope","$timeout",function(e,n,o,r){function a(t,n,o){return e({method:"POST",url:"app_dev.php/login_check",headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:function(e){var t=[];for(var n in e)t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.join("&")},data:{_username:t,_password:n}}).then(function(e){o(e)})}function l(t,n,o,r,a,l){if(n!==o)return!1;e({method:"POST",url:"app_dev.php/register/",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:"fos_user_registration_form[email]="+encodeURIComponent(r)+"&fos_user_registration_form[username]="+encodeURIComponent(t)+"&fos_user_registration_form[plainPassword][first]="+encodeURIComponent(n)+"&fos_user_registration_form[plainPassword][second]="+encodeURIComponent(o)+"&fos_user_registration_form[_token]="+encodeURIComponent(a)}).then(function(e){l(e)})}function i(r,a,l){var i=t.encode(r+":"+a);o.globals={currentUser:{username:r,password:a}},e.defaults.headers.common.Authorization="Basic "+i;var s=new Date;s.setDate(s.getDate()+7),l&&n.putObject("globals",o.globals,{expires:s})}function s(){o.globals={},n.remove("globals"),e.defaults.headers.common.Authorization="Basic"}var c={};return c.Login=a,c.SetCredentials=i,c.ClearCredentials=s,c.Register=l,c.LoadFromCookies=function(){o.globals=n.get("globals")},c}])}(angular),function(e,t){t.module("elthelas").factory("SpellProvider",["$q","$http",function(e,t){var n={};return n.getSpells=function(){var n=e.defer();return t.get("/json/spells.json").then(function(e){n.resolve(e)},function(e){n.reject()}),n.promise},n}])}(jQuery,angular),function(e,t){t.module("elthelas").factory("HistoryProvider",["$q","$http",function(e,t){var n={};return n.getHistory=function(){var n=e.defer();return t.get("/json/history.json").then(function(e){n.resolve(e)},function(e){n.reject()}),n.promise},n}])}(jQuery,angular),function(e,t){t.module("elthelas").factory("geoProvider",["$q","$http",function(e,t){var n={};return n.getCities=function(){var n=e.defer();return t.get("/json/cities.json").then(function(e){n.resolve(e)},function(e){n.reject()}),n.promise},n.getContinents=function(){var n=e.defer();return t.get("/json/continents.json").then(function(e){n.resolve(e)},function(e){n.reject()}),n.promise},n.getFeatures=function(){var n=e.defer();return t.get("/json/features.json").then(function(e){n.resolve(e)},function(e){n.reject()}),n.promise},n.getLandmarks=function(){var n=e.defer();return t.get("/json/landmarks.json").then(function(e){n.resolve(e)},function(e){n.reject()}),n.promise},n.getNations=function(){var n=e.defer();return t.get("/json/nations.json").then(function(e){n.resolve(e)},function(e){n.reject()}),n.promise},n}])}(jQuery,angular);