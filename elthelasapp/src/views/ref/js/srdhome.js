import { useMeta } from "vue-meta";
import { useStaticsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import { reactive } from 'vue';
import invocations from '@/components/characterbuilderv2/js/selectable/warlockinvocations.js';
import infusions from '@/components/characterbuilderv2/js/selectable/artificerinfusions.js';

export default {
  setup () {
    useMeta({ title: "System Reference Search" });
    const statics = useStaticsStore();
    const {
      ancestries,
      armorv2: armor,
      backgroundsv2: backgrounds,
      classesv2: classes,
      divines,
      equipmentv2: equipment,
      featsv2: feats,
      magicitemvsv2: magicitems,
      rules,
      rulesByCategory,
      spellsv2: spells,
      weaponsv2: weapons,
    } = storeToRefs(statics);

    return { ancestries, armor, backgrounds, classes, divines, equipment, feats, magicitems, statics, rules, rulesByCategory, spells, weapons, marked };
  },
  computed: {
    rulesresults () {
      let ruleresults = [];
      if (this.searchtext !== '') {
        ruleresults = this.rules.filter((rule) => {
          if (rule.title.toLowerCase().includes(this.searchtext.toLowerCase())) {
            rule.weight = 1;
            return true;
          } else if (rule.description.toLowerCase().includes(this.searchtext.toLowerCase())) {
            rule.weight = 2;
            return true;
          } else if (rule.subcategory.toLowerCase().includes(this.searchtext.toLowerCase())) {
            rule.weight = 3;
            return true;
          }
        });
        //classes and class features
        ruleresults.push(...this.extrarules.filter((rule) => {
          if (rule.title.toLowerCase().includes(this.searchtext.toLowerCase())) {
            rule.weight = 1;
            return true;
          } else if (rule.description.toLowerCase().includes(this.searchtext.toLowerCase())) {
            rule.weight = 2;
            return true;
          } else if (rule.subcategory.toLowerCase().includes(this.searchtext.toLowerCase())) {
            rule.weight = 3;
            return true;
          }
        }));
      }
      return ruleresults.sort((a, b) => {
        if (a.weight > b.weight) {
          return 1;
        } else {
          return -1;
        }
      });
    }
  },
  data () {
    return {
      searchtext: "",
      showresults: false
    };
  },
  created () {
    this.statics.getAllNew().then(() => {
      const classrules = [];
      this.classes.forEach((cl) => {
        classrules.push({
          title: cl.name,
          category: "Character Classes",
          subcategory: cl.name,
          description: "For more information about the " + cl.name + " Class, see the <a href='/options/class/" + cl.name + "'>Classes Page</a>",
          isCollapsed: false
        });
        cl.features.forEach((ft) => {
          classrules.push({
            title: ft.name,
            category: "Character Classes",
            subcategory: cl.name,
            description: ft.description,
            isCollapsed: false
          });
        });
        cl.subclass.forEach((sb) => {
          classrules.push({
            title: sb.name,
            category: "Character Classes",
            subcategory: cl.name,
            description: "For more information about the " + sb.name + " Sub Class, see the <a href='/options/class/" + cl.name + "'>" + cl.name + " Classes Page</a>",
            isCollapsed: false
          });
          sb.features.forEach((ft) => {
            classrules.push({
              title: ft.name,
              category: "Character Classes",
              subcategory: cl.name + " - " + sb.name,
              description: ft.description,
              isCollapsed: false
            });
          });
        });
      });
      let spellrules = [];
      this.spells.forEach((spell) => {
        spellrules.push({
          title: spell.title,
          category: "Spells",
          subcategory: spell.school + " " + spell.level.replace('level', 'level '),
          description: `<h4>
              <strong>${spell.school} ${spell.level.replace('level', 'level ')} ${spell.ritual ? " Ritual" : ""} </strong> (${spell.source})
            </h4>
            <p><strong>Casting Time: </strong> ${spell.castingTime}</p>
            <p><strong>Range: </strong> ${spell.range}</p>
            <p><strong>Components: </strong> ${spell.components}</p>
            <p><strong>Duration: </strong> ${spell.duration}</p>
            <div>${spell.description}</div>`,
          isCollapsed: false
        });
      });
      let featrules = [];
      this.feats.forEach((feat) => {
        featrules.push({
          title: feat.name,
          category: "Feats",
          subcategory: "Feat Descriptions",
          description: `<h5>Prerequisites: ${feat.prereq}</h5><div>${feat.description}</div>`,
          isCollapsed: false
        });
      });
      let ancestryrules = [];
      this.ancestries.forEach((an) => {
        ancestryrules.push({
          title: an.name,
          category: "Ancestries",
          subcategory: "Ancestry Options",
          description: `<p>For the full description of the ${an.name} ancestry visit the <a href="/options/ancestry">Ancestry page</a></p>
          <div>${an.description}</div>`,
          isCollapsed: false
        });
        an.subraces.forEach((sb) => {
          let thisrule = {
            title: sb.name,
            category: "Ancestries",
            subcategory: "Ancestry Options - " + an.name,
            description: `<p>For the full description of the ${sb.name} ancestry visit the <a href="/options/ancestry">Ancestry page</a></p><div>${sb.description}</div><ul>`,
            isCollapsed: false
          };
          an.traits.forEach((tr) => {
            thisrule.description += `<li><strong>${tr.name}.</strong> ${tr.description}</li>`;
          });
          sb.traits.forEach((tr) => {
            thisrule.description += `<li><strong>${tr.name}.</strong> ${tr.description}</li>`;
          });
          thisrule.description += '</ul>';
          ancestryrules.push(thisrule);
        });
      });
      let backgroundrules = [];
      this.backgrounds.forEach((bkg) => {
        backgroundrules.push({
          title: bkg.name,
          category: "Backgrounds",
          subcategory: "Example Backgrounds",
          description: `<p>
            <strong>Skills: </strong>${bkg.skills.join(', ')}<br />
            <strong>Tools: </strong>${bkg.tools.join(', ')}<br />
            <strong>Languages: </strong>${bkg.languages} of your choice<br />
            <strong>Feat: </strong>${bkg.feature}
          </p>
          <p>
            ${bkg.description}
          </p>
          <p>
            <strong>Equipment: </strong> ${bkg.equipment}
          </p>`
        });
      });
      let invocationrules = [];
      invocations.forEach((inv) => {
        invocationrules.push({
          title: inv.name,
          category: "Character Classes",
          subcategory: "Warlock - Warlock Invocations",
          description: `Prerequisite: ${inv.prereq}\n\n${inv.description}`,
        });
      });
      let infusionrules = [];
      infusions.forEach((inf) => {
        infusionrules.push({
          title: inf.name,
          category: "Character Classes",
          subcategory: "Artificer - Artificer Infusions",
          description: `Prerequisite: ${inf.level}\n\nItem: ${inf.item}\n\n${inf.description}`
        });
      });
      this.extrarules = reactive([...spellrules, ...classrules, ...featrules, ...ancestryrules, ...backgroundrules, ...invocationrules, ...infusionrules]);
    });
  }
};
