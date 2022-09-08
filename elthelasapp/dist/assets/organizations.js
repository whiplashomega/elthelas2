import{u as d,_ as h}from"./index.js";import{m as g,o as r,c as i,f as t,F as a,j as l,t as u,g as p,C as _,E as f}from"./vendor.js";var v={setup(){const e=d(),{organizations:o}=e;return{organizations:o,marked:g,statics:e}},data(){return{currentOrg:{level1:"",level10:"",tenets:[""],description:""}}},methods:{loadOrg:function(e){this.currentOrg=this.organizations.filter(o=>o.id===e)[0]}},mounted(){this.statics.getAllOrganizations().then(()=>{if(this.$route.params.org){var e=this.$route.params.org,o=this.organizations.filter(function(c){return c.title.toLowerCase().replace(/ /g,"")===e.toLowerCase().replace(/ /g,"")});o.length>0&&(this.currentOrg=o[0])}})}};const s=e=>(_("data-v-cf497f0c"),e=e(),f(),e),m=s(()=>t("h2",null,"Major Organizations",-1)),O=s(()=>t("p",null," Nations, cities, governments and churches are not the only organizations that have sizable influence on the world. Occupational groups, religious subsects and other groups with particular interests abound. ",-1)),k=s(()=>t("p",null," Many of these organizations provide additional benefits to their members, particularly members of high power and standing can often get large benefits from their affiliation with the group, including additional training, or other benefits. ",-1)),b=["onClick"],L={key:0,id:"raceDiv"},M=["innerHTML"],y=s(()=>t("h4",null,"Tenets",-1)),z=["innerHTML"],w=s(()=>t("h4",null,"Level 1 Benefit",-1)),T=["innerHTML"],H=s(()=>t("h4",null,"Level 10 Benefit",-1)),C=["innerHTML"],$={class:"col-sm-6"},S=s(()=>t("h4",null,"Nations with a Major Presence",-1)),B={class:"col-sm-6"},j=s(()=>t("h4",null,"Cities with a Major Presence",-1));function I(e,o,c,N,D,E){return r(),i("div",null,[m,O,k,t("div",null,[(r(!0),i(a,null,l(e.organizations,n=>(r(),i("div",{class:"racebuttondiv",key:n.id},[t("button",{class:"racebutton btn btn-primary",onClick:F=>e.loadOrg(n.id)},u(n.title),9,b)]))),128))]),e.currentOrg.id!=="error"?(r(),i("div",L,[t("h2",null,u(e.currentOrg.title),1),t("div",{innerHTML:e.marked.parse(e.currentOrg.description)},null,8,M),t("div",null,[y,t("ul",null,[(r(!0),i(a,null,l(e.currentOrg.tenets,n=>(r(),i("li",{key:n,innerHTML:e.marked.parse(n)},null,8,z))),128))])]),w,t("div",{innerHTML:e.marked.parse(e.currentOrg.level1)},null,8,T),H,t("div",{innerHTML:e.marked.parse(e.currentOrg.level10)},null,8,C),t("div",$,[S,t("ul",null,[(r(!0),i(a,null,l(e.currentOrg.nations,n=>(r(),i("li",{key:n},u(n),1))),128))])]),t("div",B,[j,t("ul",null,[(r(!0),i(a,null,l(e.currentOrg.cities,n=>(r(),i("li",{key:n},u(n),1))),128))])])])):p("v-if",!0)])}var A=h(v,[["render",I],["__scopeId","data-v-cf497f0c"]]);export{A as default};
//# sourceMappingURL=organizations.js.map
