import{u as m,_ as g}from"./index.js";import{h as f,u as _,m as v,o as i,c as s,f as t,F as a,l,t as o,g as h,J as y,K as k,k as p}from"./vendor.js";var M={setup(){const e=m(),{organizationsv2:r}=f(e);return _({title:"Multinational Organizations"}),{organizations:r,marked:v,statics:e}},data(){return{currentOrg:{level1:"",level10:"",tenets:[""],description:""}}},methods:{loadOrg:function(e){this.currentOrg=this.organizations.filter(r=>r.id===e)[0]}},mounted(){this.statics.getAllOrganizationsv2().then(()=>{if(this.$route.params.org){var e=this.$route.params.org,r=this.organizations.filter(function(d){return d.title.toLowerCase().replace(/ /g,"")===e.toLowerCase().replace(/ /g,"")});r.length>0&&(this.currentOrg=r[0])}})}};const u=e=>(y("data-v-1d0945a9"),e=e(),k(),e),w=u(()=>t("h2",null,"Factions",-1)),O=u(()=>t("p",null,[p(" Through the course of play, DMs may choose to grant players the ability to join various factions. Joining a faction comes with responsibilities, risks, and rewards, as well as the potential to gain ranks and influence. Whenever players complete work on behalf of a faction, the DM may award disposition points to the players completing the work. If you are not actually part of the faction you cannot have more than 5 disposition points with a faction. Each faction has a number of ranks (listed in the faction description). Gaining a new rank requires a certain mimimum disposition, as well as other requirements the DM might set. Once a rank is achieved, the players gain certain benefits. Players can also lose disposition points (and thus ranks) if they act against a factions interests or break the rules. The list below is an incomplete list of factions that exist in the Elthelas setting. Some factions in the list, such as the National Military Organization, or Guild factions represent a "),t("em",null,"type"),p(" of faction. Providing general guidelines for DMs to develop factions of that type. For example, your DM might allow you to join the army of Gerasalim, but modify some of the ranks or features to better suit their vision for how that organization is structured. ")],-1)),b=["onClick"],T={key:0,id:"raceDiv"},z=["innerHTML"],L=u(()=>t("h4",null,"Rules",-1)),D=["innerHTML"],H=u(()=>t("h3",null,"Ranks",-1)),S=["innerHTML"],$={key:0},C=["innerHTML"],F={class:"col-sm-6"},I=u(()=>t("h4",null,"Nations with a Major Presence",-1)),N={class:"col-sm-6"},j=u(()=>t("h4",null,"Cities with a Major Presence",-1));function P(e,r,d,B,E,G){return i(),s("div",null,[w,O,t("div",null,[(i(!0),s(a,null,l(e.organizations,n=>(i(),s("div",{class:"racebuttondiv",key:n.id},[t("button",{class:"racebutton btn btn-primary",onClick:c=>e.loadOrg(n.id)},o(n.title),9,b)]))),128))]),e.currentOrg.id!=="error"?(i(),s("div",T,[t("h2",null,o(e.currentOrg.title),1),t("div",{innerHTML:e.marked.parse(e.currentOrg.description)},null,8,z),t("div",null,[L,t("ul",null,[(i(!0),s(a,null,l(e.currentOrg.rules,n=>(i(),s("li",{key:n,innerHTML:e.marked.parse(n)},null,8,D))),128))])]),t("div",null,[H,(i(!0),s(a,null,l(e.currentOrg.ranks,n=>(i(),s("div",{key:n.name},[t("h4",null,o(n.name),1),t("h6",null,"Minimum Disposition: "+o(n.minDisposition),1),t("div",{innerHTML:e.marked.parse(n.description)},null,8,S),(i(!0),s(a,null,l(e.currentOrg.features,c=>(i(),s("div",{key:c.name},[c.minrank===n.index?(i(),s("div",$,[t("h5",null,"Feature: "+o(c.name),1),t("div",{innerHTML:e.marked.parse(c.description)},null,8,C)])):h("",!0)]))),128))]))),128))]),t("div",F,[I,t("ul",null,[(i(!0),s(a,null,l(e.currentOrg.nations,n=>(i(),s("li",{key:n},o(n),1))),128))])]),t("div",N,[j,t("ul",null,[(i(!0),s(a,null,l(e.currentOrg.cities,n=>(i(),s("li",{key:n},o(n),1))),128))])])])):h("",!0)])}var q=g(M,[["render",P],["__scopeId","data-v-1d0945a9"]]);export{q as default};
