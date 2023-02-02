import creaturecalc from '@/helpers/creaturecalc';

export default {
    setup () {
        return { creaturecalc }
    },
    methods: {
    },
    computed: {
        attMod: (comp) => (attack) => {
            return creaturecalc.attMod(comp.creature, attack);
        },
        dmgBonus: (comp) => (attack, dmg) => {
            return creaturecalc.dmgBonus(comp.creature, attack, dmg);
        },
        saveDC: (comp) => (attack) => {
            return creaturecalc.saveDC(comp.creature, attack);
        },
        skillMod: (comp) => (skill) => {
            return creaturecalc.skillMod(comp.creature, skill);
        },
        saveMod: (comp) => (num) => {
            return creaturecalc.saveMod(comp.creature, num);
        },
        statMod: (comp) => (num) => {
            return creaturecalc.statMod(comp.creature, num);
        },
        hp () {
            return creaturecalc.hp(this.creature);
        },
        ac () {
            return creaturecalc.ac(this.creature);
        },
        hitDieSize () {
            return creaturecalc.hitDieSize(this.creature);
        },
        prof () {
            return creaturecalc.prof(this.creature);
        },
        init () {
            return creaturecalc.init(this.creature);
        },
        passivePerception () {
            return creaturecalc.passivePerception(this.creature);
        },
        cr () {
            return creaturecalc.cr(this.creature);
        }
    },
    props: ["creature"]
};
