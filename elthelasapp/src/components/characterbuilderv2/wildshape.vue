<template>
  <div v-if="druidLevel > 0">
    <h3>Wildshape Options</h3>
    Available Forms: {{ formsCount }}
    <div class="row">
      <div class="col" v-for="option in character.wildShapeOptions" :key="option.key">
        <select class="charsheet-text" v-model="option.baseshape">
          <option v-for="form in availableForms" :key="form.name" :value="form">{{form.name}}</option>
        </select>
        <button class="btn btn-success" @click="loadCreature(option)">Load</button>
        <div v-if="option.shape.name">
          <h4>{{option.shape.name}}</h4>
          <strong>CR:</strong> {{ option.shape.cr }} <br />
          <strong>HP:</strong> {{creaturecalc.hp(option.shape)}} ({{creaturecalc.basehp(option.shape)}} HP + {{creaturecalc.pp(option.shape)}} PP)<br />
          <strong>Speed:</strong> {{option.shape.speed}}<br />
          <strong>AC:</strong> {{option.shape.ac}}<br />
          <strong>Attack Bonus:</strong> +{{ (creaturecalc.statMod(option.shape, 0) + profbonus > creaturecalc.statMod(option.shape, 1) + profbonus ? creaturecalc.statMod(option.shape, 0) + profbonus : creaturecalc.statMod(option.shape, 1) + profbonus) + (moonDruid && druidLevel >= 6 ? 1 : 0) }} (Use this instead of the listed bonus)
          <table class="table">
            <tr>
              <th></th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>
            </tr>
            <tr>
              <td></td>
              <td>{{ option.shape.stats[0] }} ({{creaturecalc.statMod(option.shape, 0) >= 0 ? "+" : ""}}{{creaturecalc.statMod(option.shape, 0)}})</td>
              <td>{{ option.shape.stats[1] }} ({{creaturecalc.statMod(option.shape, 1) >= 0 ? "+" : ""}}{{creaturecalc.statMod(option.shape, 1)}})</td>
              <td>{{ option.shape.stats[2] }} ({{creaturecalc.statMod(option.shape, 2) >= 0 ? "+" : ""}}{{creaturecalc.statMod(option.shape, 2)}})</td>
              <td>{{ getStatTotal(3) }} ({{getStatMod(3) >= 0 ? "+" : ""}}{{getStatMod(3)}})</td>
              <td>{{ getStatTotal(4) }} ({{getStatMod(4) >= 0 ? "+" : ""}}{{getStatMod(4)}})</td>
              <td>{{ getStatTotal(5) }} ({{getStatMod(5) >= 0 ? "+" : ""}}{{getStatMod(5)}})</td>
            </tr>
          </table>
          <strong>Senses:</strong> {{option.shape.senses}}<br />
          <strong>Resistance:</strong> {{option.shape.damageresistances}}<br />
          <strong>Immunities:</strong> {{option.shape.damageimmunities}}<br />
          <div v-html="marked.parse(option.shape.description)"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/wildshape.js"></script>