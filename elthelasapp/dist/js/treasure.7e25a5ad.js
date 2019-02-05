(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["treasure"],{e1f4:function(m,a,g){"use strict";g.r(a);var e=function(){var m=this,a=m.$createElement,g=m._self._c||a;return g("div",[g("select",{directives:[{name:"model",rawName:"v-model",value:m.challenge,expression:"challenge"}],on:{change:function(a){var g=Array.prototype.filter.call(a.target.options,function(m){return m.selected}).map(function(m){var a="_value"in m?m._value:m.value;return a});m.challenge=a.target.multiple?g:g[0]}}},[g("option",{domProps:{value:1}},[m._v("CR 0-4")]),g("option",{domProps:{value:2}},[m._v("CR 5-10")]),g("option",{domProps:{value:3}},[m._v("CR 11-14")]),g("option",{domProps:{value:4}},[m._v("CR 15+")])]),g("select",{directives:[{name:"model",rawName:"v-model",value:m.horde,expression:"horde"}],on:{change:function(a){var g=Array.prototype.filter.call(a.target.options,function(m){return m.selected}).map(function(m){var a="_value"in m?m._value:m.value;return a});m.horde=a.target.multiple?g:g[0]}}},[g("option",{domProps:{value:!0}},[m._v("Horde")]),g("option",{domProps:{value:!1}},[m._v("Individual")])]),g("input",{directives:[{name:"model",rawName:"v-model",value:m.d100,expression:"d100"}],attrs:{type:"number",min:"1",max:"100"},domProps:{value:m.d100},on:{input:function(a){a.target.composing||(m.d100=a.target.value)}}}),m._v(" Roll Value\n  "),g("button",{on:{click:function(a){m.generateTreasure()}}},[m._v("Generate!")]),g("button",{on:{click:function(a){m.generateTreasureSetRoll()}}},[m._v("Generate with Set Roll")]),g("div",[m._v(m._s(m.treasure))])])},n=[],i=(g("c5f6"),g("ac6a"),g("cebc")),c=g("2f62"),x=g("e9d8"),u=g.n(x),d={computed:Object(i["a"])({},Object(c["c"])({commons:"allCommons",uncommons:"allUncommons",rares:"allRares",veryrares:"allVeryRares",legendaries:"allLegendaries",weapons:"allWeapons",armor:"allArmor",equipment:"allEquipment",allValuables:"allValuables",randomValuable:"randomValuable",randomMagicItem:"randomMagicItem"})),data:function(){return{challenge:1,horde:!1,treasure:"",canv:"",d100:1}},methods:Object(i["a"])({},Object(c["b"])({getAllValuables:"getAllValuables"}),{generateTreasure:function(){this.horde?this.treasure=this.generateHorde():this.treasure=this.generateIndividual()},generateTreasureSetRoll:function(){this.horde?this.treasure=this.generateHorde(this.d100):this.treasure=this.generateIndividual(this.d100)},generateIndividual:function(){var m=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u.a.roll("1d100").total,a=0,g=0,e=0,n=0,i="";console.log(m),1===this.challenge?m<31?a=u.a.roll("5d6").total:m<61?g=u.a.roll("4d6").total:m<96?e=u.a.roll("3d6").total:n=u.a.roll("1d6").total:2===this.challenge?m<31?(a=100*u.a.roll("4d6").total,e=10*u.a.roll("1d6").total):m<61?(g=10*u.a.roll("6d6").total,e=10*u.a.roll("2d6").total):m<96?e=10*u.a.roll("4d6").total:(e=10*u.a.roll("2d6").total,n=u.a.roll("3d6").total):3===this.challenge?m<21?(g=100*u.a.roll("4d6").total,e=100*u.a.roll("1d6").total):m<76?(e=100*u.a.roll("2d6").total,n=10*u.a.roll("1d6").total):(e=100*u.a.roll("2d6").total,n=10*u.a.roll("2d6").total):4===this.challenge&&(m<56?(e=1e3*u.a.roll("1d6").total,n=100*u.a.roll("1d6").total):(e=1e3*u.a.roll("1d6").total,n=100*u.a.roll("2d6").total));var c=a/100+g/10+e+10*n;return i+=a+" cp, "+g+" sp, "+e+" gp, "+n+" pp. Total value "+c+" gp.",console.log(i),i},generateHorde:function(){var m=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u.a.roll("1d100").total,a=0,g=0,e=0,n=0,i="",c="",x="",d=0,l=[],t={};console.log(m),1===this.challenge?(a=100*u.a.roll("6d6").total,g=100*u.a.roll("3d6").total,e=10*u.a.roll("2d6").total,l=[{min:1,max:6,numgems:"0",gemmax:10,nummagic:"0",magicmax:0},{min:7,max:16,numgems:"2d6",gemmax:10,nummagic:"0",magicmax:0},{min:17,max:26,numgems:"2d4",gemmax:25,nummagic:"0",magicmax:0},{min:27,max:36,numgems:"2d6",gemmax:50,nummagic:"0",magicmax:0},{min:37,max:44,numgems:"2d6",gemmax:10,nummagic:"1d6",magicmax:100},{min:45,max:52,numgems:"2d4",gemmax:25,nummagic:"1d6",magicmax:100},{min:53,max:60,numgems:"2d6",gemmax:50,nummagic:"1d6",magicmax:100},{min:61,max:65,numgems:"2d6",gemmax:10,nummagic:"1d4",magicmax:200},{min:66,max:70,numgems:"2d4",gemmax:25,nummagic:"1d4",magicmax:200},{min:71,max:75,numgems:"2d6",gemmax:50,nummagic:"1d4",magicmax:200},{min:76,max:78,numgems:"2d6",gemmax:10,nummagic:"1d4",magicmax:400},{min:79,max:80,numgems:"2d4",gemmax:25,nummagic:"1d4",magicmax:400},{min:81,max:85,numgems:"2d6",gemmax:50,nummagic:"1d4",magicmax:400},{min:86,max:92,numgems:"2d4",gemmax:25,nummagic:"1d4",magicmax:2500},{min:93,max:97,numgems:"2d6",gemmax:50,nummagic:"1d4",magicmax:2500},{min:98,max:99,numgems:"2d4",gemmax:25,nummagic:"1d1",magicmax:5e3},{min:100,max:100,numgems:"2d6",gemmax:50,nummagic:"1d1",magicmax:5e3}]):2===this.challenge?(a=100*u.a.roll("2d6").total,g=1e3*u.a.roll("2d6").total,e=100*u.a.roll("6d6").total,n=10*u.a.roll("3d6").total,l=[{min:1,max:4,numgems:"0",gemmax:10,nummagic:"0",magicmax:0},{min:5,max:10,numgems:"2d4",gemmax:25,nummagic:"0",magicmax:0},{min:11,max:16,numgems:"3d6",gemmax:50,nummagic:"0",magicmax:0},{min:17,max:22,numgems:"3d6",gemmax:100,nummagic:"0",magicmax:0},{min:23,max:28,numgems:"2d4",gemmax:250,nummagic:"0",magicmax:0},{min:29,max:32,numgems:"2d4",gemmax:25,nummagic:"1d6",magicmax:100},{min:33,max:36,numgems:"3d6",gemmax:50,nummagic:"1d6",magicmax:100},{min:37,max:40,numgems:"3d6",gemmax:100,nummagic:"1d6",magicmax:100},{min:41,max:44,numgems:"2d4",gemmax:250,nummagic:"1d6",magicmax:100},{min:45,max:49,numgems:"2d4",gemmax:25,nummagic:"1d4",magicmax:200},{min:50,max:54,numgems:"3d6",gemmax:50,nummagic:"1d4",magicmax:200},{min:55,max:59,numgems:"3d6",gemmax:100,nummagic:"1d4",magicmax:200},{min:60,max:63,numgems:"2d4",gemmax:250,nummagic:"1d4",magicmax:200},{min:64,max:66,numgems:"2d4",gemmax:25,nummagic:"1d4",magicmax:400},{min:67,max:69,numgems:"3d6",gemmax:50,nummagic:"1d4",magicmax:400},{min:70,max:72,numgems:"3d6",gemmax:100,nummagic:"1d4",magicmax:400},{min:73,max:74,numgems:"2d4",gemmax:250,nummagic:"1d4",magicmax:400},{min:75,max:76,numgems:"2d4",gemmax:25,nummagic:"1d1",magicmax:800},{min:77,max:78,numgems:"3d6",gemmax:50,nummagic:"1d1",magicmax:800},{min:79,max:79,numgems:"3d6",gemmax:100,nummagic:"1d1",magicmax:800},{min:80,max:80,numgems:"2d4",gemmax:250,nummagic:"1d1",magicmax:800},{min:81,max:84,numgems:"2d4",gemmax:25,nummagic:"1d4",magicmin:800,magicmax:2500},{min:85,max:88,numgems:"3d6",gemmax:50,nummagic:"1d4",magicmin:800,magicmax:2500},{min:89,max:91,numgems:"3d6",gemmax:100,nummagic:"1d4",magicmin:800,magicmax:2500},{min:92,max:94,numgems:"2d4",gemmax:250,nummagic:"1d4",magicmin:800,magicmax:2500},{min:95,max:96,numgems:"3d6",gemmax:100,nummagic:"1d4",magicmin:1600,magicmax:5e3},{min:97,max:98,numgems:"2d4",gemmax:250,nummagic:"1d4",magicmin:1600,magicmax:5e3},{min:99,max:99,numgems:"3d6",gemmax:100,nummagic:"1d1",magicmin:2500,magicmax:1e4},{min:100,max:100,numgems:"2d4",gemmax:250,nummagic:"1d1",magicmin:2500,magicmax:1e4}]):3===this.challenge?(e=1e3*u.a.roll("4d6").total,n=100*u.a.roll("5d6").total,l=[{min:1,max:3,numgems:"0",gemmax:10,nummagic:"0",magicmax:0},{min:4,max:6,numgems:"2d4",gemmax:250,nummagic:"0",magicmax:0},{min:7,max:9,numgems:"2d4",gemmax:750,nummagic:"0",magicmax:0},{min:10,max:12,numgems:"3d6",gemmax:500,nummagic:"0",magicmax:0},{min:13,max:15,numgems:"3d6",gemmax:1e3,nummagic:"0",magicmax:0},{min:16,max:19,numgems:"2d4",gemmax:250,nummagic:"2d4",magicmax:200},{min:20,max:23,numgems:"2d4",gemmax:750,nummagic:"2d4",magicmax:200},{min:24,max:26,numgems:"3d6",gemmax:500,nummagic:"2d4",magicmax:200},{min:27,max:29,numgems:"3d6",gemmax:1e3,nummagic:"2d4",magicmax:200},{min:30,max:35,numgems:"2d4",gemmax:250,nummagic:"1d6",magicmax:400},{min:36,max:40,numgems:"2d4",gemmax:750,nummagic:"1d6",magicmax:400},{min:41,max:45,numgems:"3d6",gemmax:500,nummagic:"1d6",magicmax:400},{min:46,max:50,numgems:"3d6",gemmax:1e3,nummagic:"1d6",magicmax:400},{min:51,max:54,numgems:"2d4",gemmax:250,nummagic:"1d4",magicmax:800},{min:55,max:58,numgems:"2d4",gemmax:750,nummagic:"1d4",magicmax:800},{min:59,max:62,numgems:"3d6",gemmax:500,nummagic:"1d4",magicmax:800},{min:63,max:66,numgems:"3d6",gemmax:1e3,nummagic:"1d4",magicmax:800},{min:67,max:68,numgems:"2d4",gemmax:250,nummagic:"1d1",magicmin:400,magicmax:1600},{min:69,max:70,numgems:"2d4",gemmax:750,nummagic:"1d1",magicmin:400,magicmax:1600},{min:71,max:72,numgems:"3d6",gemmax:500,nummagic:"1d1",magicmin:400,magicmax:1600},{min:73,max:74,numgems:"3d6",gemmax:1e3,nummagic:"1d1",magicmin:400,magicmax:1600},{min:75,max:76,numgems:"2d4",gemmax:250,nummagic:"1d6",magicmin:1600,magicmax:5e3},{min:77,max:78,numgems:"2d4",gemmax:750,nummagic:"1d6",magicmin:1600,magicmax:5e3},{min:79,max:80,numgems:"3d6",gemmax:500,nummagic:"1d6",magicmin:1600,magicmax:5e3},{min:81,max:82,numgems:"3d6",gemmax:1e3,nummagic:"1d6",magicmin:1600,magicmax:5e3},{min:83,max:85,numgems:"2d4",gemmax:250,nummagic:"1d4",magicmin:2500,magicmax:1e4},{min:86,max:88,numgems:"2d4",gemmax:750,nummagic:"1d4",magicmin:2500,magicmax:1e4},{min:89,max:90,numgems:"3d6",gemmax:500,nummagic:"1d4",magicmin:2500,magicmax:1e4},{min:91,max:92,numgems:"3d6",gemmax:1e3,nummagic:"1d4",magicmin:2500,magicmax:1e4},{min:93,max:94,numgems:"2d4",gemmax:250,nummagic:"1d1",magicmin:5e3,magicmax:2e5},{min:95,max:96,numgems:"2d4",gemmax:750,nummagic:"1d1",magicmin:5e3,magicmax:2e5},{min:97,max:98,numgems:"3d6",gemmax:500,nummagic:"1d1",magicmin:5e3,magicmax:2e5},{min:99,max:100,numgems:"3d6",gemmax:1e3,nummagic:"1d1",magicmin:5e3,magicmax:2e5}]):4===this.challenge&&(e=1e3*u.a.roll("12d6").total,n=1e3*u.a.roll("8d6").total,l=[{min:1,max:2,numgems:"0",gemmax:10,nummagic:"0",magicmax:0},{min:3,max:5,numgems:"3d6",gemmax:1e3,nummagic:"1d8",magicmax:400},{min:6,max:8,numgems:"1d10",gemmax:2500,nummagic:"1d8",magicmax:400},{min:9,max:11,numgems:"1d4",gemmax:7500,nummagic:"1d8",magicmax:400},{min:12,max:14,numgems:"1d8",gemmax:5e3,nummagic:"1d8",magicmax:400},{min:15,max:22,numgems:"3d6",gemmax:1e3,nummagic:"1d6",magicmax:800},{min:23,max:30,numgems:"1d10",gemmax:2500,nummagic:"1d6",magicmax:800},{min:31,max:38,numgems:"1d4",gemmax:7500,nummagic:"1d6",magicmax:800},{min:39,max:46,numgems:"1d8",gemmax:5e3,nummagic:"1d6",magicmax:800},{min:47,max:52,numgems:"3d6",gemmax:1e3,nummagic:"1d6",magicmin:400,magicmax:1600},{min:53,max:58,numgems:"1d10",gemmax:2500,nummagic:"1d6",magicmin:400,magicmax:1600},{min:59,max:63,numgems:"1d4",gemmax:7500,nummagic:"1d6",magicmin:400,magicmax:1600},{min:64,max:68,numgems:"1d8",gemmax:5e3,nummagic:"1d6",magicmin:400,magicmax:1600},{min:69,max:69,numgems:"3d6",gemmax:1e3,nummagic:"1d4",magicmin:1600,magicmax:5e3},{min:70,max:70,numgems:"1d10",gemmax:2500,nummagic:"1d4",magicmin:1600,magicmax:5e3},{min:71,max:71,numgems:"1d4",gemmax:7500,nummagic:"1d4",magicmin:1600,magicmax:5e3},{min:72,max:72,numgems:"1d8",gemmax:5e3,nummagic:"1d4",magicmin:1600,magicmax:5e3},{min:73,max:74,numgems:"3d6",gemmax:1e3,nummagic:"1d4",magicmin:2500,magicmax:1e4},{min:75,max:76,numgems:"1d10",gemmax:2500,nummagic:"1d4",magicmin:2500,magicmax:1e4},{min:77,max:78,numgems:"1d4",gemmax:7500,nummagic:"1d4",magicmin:2500,magicmax:1e4},{min:79,max:80,numgems:"1d8",gemmax:5e3,nummagic:"1d4",magicmin:2500,magicmax:1e4},{min:81,max:85,numgems:"3d6",gemmax:1e3,nummagic:"1d4",magicmin:5e3,magicmax:2e5},{min:86,max:90,numgems:"1d10",gemmax:2500,nummagic:"1d4",magicmin:5e3,magicmax:2e5},{min:91,max:95,numgems:"1d4",gemmax:7500,nummagic:"1d4",magicmin:5e3,magicmax:2e5},{min:96,max:100,numgems:"1d8",gemmax:5e3,nummagic:"1d4",magicmin:5e3,magicmax:2e5}]),l.forEach(function(a){m>=a.min&&m<=a.max&&(t=a)}),d+=a/100,d+=g/10,d+=e,d+=10*n;for(var o=0,s=t.gemmax,r=u.a.roll(t.numgems).total;r>0;r--){var v=this.randomValuable(o,s);c+=" "+v.Name+" ("+v.Value+" gp value)",d+=Number(v.Value)}var p=t.magicmax,h=t.magicmin?t.magicmin:0;console.log(u.a.roll(t.nummagic).total);for(var f=u.a.roll(t.nummagic).total;f>0;f--){var b=this.randomMagicItem(h,p);x+=" "+b.Item+" ("+b["Cost (gp)"]+" gp value)",d+=Number(b["Cost (gp)"])}return i+=a+" cp, "+g+" sp, "+e+" gp, "+n+" pp."+c+x+". Total value "+d+" gp.",i}}),created:function(){this.getAllValuables()}},l=d,t=g("2877"),o=Object(t["a"])(l,e,n,!1,null,null,null);a["default"]=o.exports}}]);
//# sourceMappingURL=treasure.7e25a5ad.js.map