const o={hp(s){return this.basehp(s)+this.pp(s)},basehp(s){let t=this.statMod(s,2),i=10.5;return s.size==="tiny"?i=2.5:s.size==="small"?i=3.5:s.size==="medium"?i=4.5:s.size==="large"?i=5.5:s.size==="huge"&&(i=6.5),Math.floor((t+i)*s.hitdice)},pp(s){return s.pc*s.hitdice},statMod(s,t){return Math.floor(s.stats[t]/2)-5},prof(s){return Math.floor((s.hitdice-1)/4)+2},saveMod(s,t){return s.saves[t]?this.prof(s)+this.statMod(s,t):this.statMod(s,t)},attMod(s,t){return this.prof(s)+this.statMod(s,t)},saveDC(s,t){return 8+this.prof(s)+this.statMod(s,t)}};export{o as c};
