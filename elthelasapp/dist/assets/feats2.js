import{O as c,B as u,m as l,_ as m,o as r,c as s,F as d,r as p,a as o,t as i,d as _}from"./index.js";const f={setup(){const e=c();return e.getAllFeats(),u({title:"Feats"}),{statics:e,marked:l}},computed:{featsort(){function e(n,a){return n.name>a.name?1:n.name<a.name?-1:0}return this.statics.feats.sort(e)}}},h={key:0},k=["innerHTML"];function B(e,n,a,F,$,g){return r(),s("div",null,[(r(!0),s(d,null,p(e.featsort,t=>(r(),s("div",{key:t.name},[o("h4",null,i(t.name),1),t.prereq!==""?(r(),s("h6",h,"Prerequisite: "+i(t.prereq),1)):_("",!0),o("p",{innerHTML:e.marked.parse(t.description)},null,8,k)]))),128))])}const y=m(f,[["render",B]]);export{y as default};
