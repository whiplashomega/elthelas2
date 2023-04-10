import{u as d,B as c,m as h,_ as g,o as r,c as i,a as t,F as o,r as a,t as l,d as p}from"./index.js";const _={setup(){const e=d(),{organizations:s}=e;return c({title:"Multinational Organizations"}),{organizations:s,marked:h,statics:e}},data(){return{currentOrg:{level1:"",level10:"",tenets:[""],description:""}}},methods:{loadOrg:function(e){this.currentOrg=this.organizations.filter(s=>s.id===e)[0]}},mounted(){this.statics.getAllOrganizations().then(()=>{if(this.$route.params.org){var e=this.$route.params.org,s=this.organizations.filter(function(u){return u.title.toLowerCase().replace(/ /g,"")===e.toLowerCase().replace(/ /g,"")});s.length>0&&(this.currentOrg=s[0])}})}},m=t("h2",null,"Major Organizations",-1),f=t("p",null," Nations, cities, governments and churches are not the only organizations that have sizable influence on the world. Occupational groups, religious subsects and other groups with particular interests abound. ",-1),v=t("p",null," Many of these organizations provide additional benefits to their members, particularly members of high power and standing can often get large benefits from their affiliation with the group, including additional training, or other benefits. ",-1),O=["onClick"],k={key:0,id:"raceDiv"},b=["innerHTML"],L=t("h4",null,"Tenets",-1),M=["innerHTML"],z=t("h4",null,"Level 1 Benefit",-1),y=["innerHTML"],T=t("h4",null,"Level 10 Benefit",-1),w=["innerHTML"],H={class:"col-sm-6"},$=t("h4",null,"Nations with a Major Presence",-1),B={class:"col-sm-6"},C=t("h4",null,"Cities with a Major Presence",-1);function N(e,s,u,j,S,D){return r(),i("div",null,[m,f,v,t("div",null,[(r(!0),i(o,null,a(e.organizations,n=>(r(),i("div",{class:"racebuttondiv",key:n.id},[t("button",{class:"racebutton btn btn-primary",onClick:F=>e.loadOrg(n.id)},l(n.title),9,O)]))),128))]),e.currentOrg.id!=="error"?(r(),i("div",k,[t("h2",null,l(e.currentOrg.title),1),t("div",{innerHTML:e.marked.parse(e.currentOrg.description)},null,8,b),t("div",null,[L,t("ul",null,[(r(!0),i(o,null,a(e.currentOrg.tenets,n=>(r(),i("li",{key:n,innerHTML:e.marked.parse(n)},null,8,M))),128))])]),z,t("div",{innerHTML:e.marked.parse(e.currentOrg.level1)},null,8,y),T,t("div",{innerHTML:e.marked.parse(e.currentOrg.level10)},null,8,w),t("div",H,[$,t("ul",null,[(r(!0),i(o,null,a(e.currentOrg.nations,n=>(r(),i("li",{key:n},l(n),1))),128))])]),t("div",B,[C,t("ul",null,[(r(!0),i(o,null,a(e.currentOrg.cities,n=>(r(),i("li",{key:n},l(n),1))),128))])])])):p("",!0)])}const V=g(_,[["render",N]]);export{V as default};
