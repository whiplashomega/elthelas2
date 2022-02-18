<template>
  <div>
    <b-tabs>
      <b-tab title="Table">
        <h2>Gods Quick Ref Table</h2>
        <table class="table table-sm table-striped">
          <thead>
            <tr><th>Symbol</th><th>Name</th><th>Portfolio</th><th>Domains</th><th>Alignment</th></tr>
          </thead>
          <tbody>
            <tr v-for="god in gods" :key="god.id">
              <td :style="'background-image: url(' + god.symbolimage + ');max-height:30px;width:auto;background-size:contain;background-repeat: no-repeat;'" :title="GodByName.holysymbol"></td>
              <td>{{ god.name }}</td>
              <td>{{ god.domains }}</td>
              <td>{{ god.domains5 }}</td>
              <td>{{ god.alignment }}</td>
            </tr>
          </tbody>
        </table>
      </b-tab>
      <b-tab title="Details">
        <div class="row">
          <div class="col-sm-3">
            <h2>Browse Gods By...</h2>
            <h4>Name</h4>
            <p>
              <b-form-select v-model="SelectedGod" :options="gods"
                             text-field="name" value-field="id" />
            </p>
            <h4>Alignment</h4>
            <p>
              <b-form-select v-model="alignment">
                <option value="" selected="selected">Select an Alignment</option>
                <option value="Lawful Good">Lawful Good</option>
                <option value="Neutral Good">Neutral Good</option>
                <option value="Chaotic Good">Chaotic Good</option>
                <option value="Lawful Neutral">Lawful Neutral</option>
                <option value="Neutral">Neutral</option>
                <option value="Chaotic Neutral">Chaotic Neutral</option>
                <option value="Lawful Evil">Lawful Evil</option>
                <option value="Neutral Evil">Neutral Evil</option>
                <option value="Chaotic Evil">Chaotic Evil</option>
              </b-form-select>
            </p>
            <p>
              <b-form-select v-if="alignment !== ''" :options="alignmentGods"
                             v-model="SelectedGod" text-field="name"
                             value-field="id" />
            </p>
            <h4>Domain</h4>
            <p>
              <b-form-select v-model="domain">
                <option value="" selected>Select a Domain</option>
                <option v-for="dom in domains" :key="dom" :value="dom">{{ dom }}</option>
              </b-form-select>
            </p>
            <p>
              <b-form-select v-if="domain !== ''" :options="domainGods"
                             v-model="SelectedGod" text-field="name"
                             value-field="id" />
            </p>
          </div>
          <div class="col-sm-9">
            <div v-if="GodByName">
              <h2>{{ GodByName.name }}</h2>
              <div class="row">
                <table class="table table-striped table-responsive col-sm-7">
                  <tr>
                    <td>Holy Symbol</td>
                    <td>
                      <span data-ng-if="GodByName.symbolimage == undefined">{{ GodByName.holysymbol }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Alignment</td><td>{{ GodByName.alignment }}</td>
                  </tr>
                  <tr>
                    <td>Portfolio</td><td>{{ GodByName.domains }}</td>
                  </tr>
                  <tr>
                    <td>Domains 5e</td><td>{{ GodByName.domains5 }}</td>
                  </tr>
                  <tr>
                    <td>Favored Weapon</td><td>{{ GodByName.weapon }}</td>
                  </tr>
                  <tr>
                    <td>Origins</td><td>{{ GodByName.parents }}</td>
                  </tr>
                  <tr>
                    <td>Enemies</td><td>{{ GodByName.enemy }}</td>
                  </tr>
                </table>
                <div class="symbolimage col-sm-5" v-if="GodByName.symbolimage != undefined"
                     :style="'background-image: url(' + GodByName.symbolimage + ')'" :title="GodByName.holysymbol"></div>
              </div>
              <h4>Home</h4>
              <div v-html="$options.filters.marked(GodByName.home)"></div>
              <h4>Appearance</h4>
              <div v-html="$options.filters.marked(GodByName.appearance)"></div>
              <h4>Worshippers</h4>
              <div v-html="$options.filters.marked(GodByName.worshippers)"></div>
              <h4>High Tenets</h4>
              <ul>
                <li v-for="tenet in GodByName.tenets" :key="tenet">{{ tenet }}</li>
              </ul>
              <h4>Holidays</h4>
              <div v-html="$options.filters.marked(GodByName.holiday)"></div>
              <h4>Level 1 Faction Feature</h4>
              <div v-html="$options.filters.marked(GodByName.level1)"></div>
              <h4>Level 10 Faction Feature</h4>
              <div v-html="$options.filters.marked(GodByName.level10)"></div>
              <h4>Lore and History</h4>
              <div v-html="$options.filters.marked(GodByName.lore)"></div>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="History">
        <div class="row">
          <div class="col-sm-12">
            <h2>History and Relationships of the Gods</h2>
          </div>
          <div class="col-sm-12">
            <h3>The 3 Mothers</h3>
            <p>
              <strong>Nera, Gaian, and Area</strong> were the first of the Gods, inevitable from the beginning of the universe. The 3 mother goddesses represented the elemental order, the material, and the elemental chaos. As the first beings of divine spark, their form was absolute, and they could not be destroyed. Meeting together they saw that the Universe was barren, an endless and empty Astral Sea without form or time, and so they agreed to each bring forth 4 children. Nera begat Alohim, Mat'raktha, Io, and Tock, Gaian begat Molton, Trimala, Dorun, and Sylvan, and Area begat Annam, Fanome, Zhuul, and ?. With the aid of these children, they created Elthelas, and all the Planes of Existence.
            </p>
            <h3>The 3rd Generation</h3>
            <p>
              All was not well, however. The Second Generation of Gods grew jealous of their mothers dominion, and their ability to create new Gods, and so they met together, and together went before their mothers to demand that they confer upon them the ability to create Gods.
            </p>
            <p>
              Their mothers were vexed by their childrens demands, but seeing that they were all resolute, they came to an agreement. "We cannot give you this which you seek, for we have not the power to make equals unto ourselves, however, each of you may entreat each of us for one child, who will share of your essence and that of their Mother God." And so the 3rd generation of Gods was born, 3 for each of the second generation, 1 from each Mother God.
            </p>
            <p>
              Many of this generation have perished, or their influence is not known to us today, but we do know that Alohim begat Amathera via Nera, Sara via Gaian, and Cora via Area. Mat'raktha begat Asmodeus via Nera, and Malik via Area. Io begat Bahamut via Nera, Leviathan via Gaian, and Tiamat via Area. Tock begat Chronos via Gaian and Woden via Area (Woden however, perished in the Gods War, and his domain was eventually taken up by Dorman). We also know that Trimala begat Maris via Nera, and Zhuul begat Ba'al via Area.
            </p>
            <h3>The Birth of the Mortal Races</h3>
            <p>
              All was not well however, as the 3rd generation saw that their parents and their parents parents could bring forth children, but they could not, so they went to the Mother Gods and demanded that they too be allowed to bring forth children unto the world, but this 3rd generation was too far removed from the Mother Gods to bring forth new Gods, and so the Mother Gods could not meet their request as they had their parents, so instead they gave them the ability to create the lesser beings both mortal and immortal, and gave this ability to their parents as well, and so all the races were born in all their variety, such that the Gods could each have their dominion.
            </p>
            <p>
              Chief among these races were the Sorceron, created collectively by all the Gods to share in their power so much as was possible and assist in the creation of the lesser races, but so also at this time were created the Dragons, the Giants, humans, elves, orcs, and dwarves and many others.
            </p>
            <h3>The God's War</h3>
            <p>
              Yet peace was not be had among the Gods, in particular Mat'raktha coveted the dominion of his brother Alohim, for he felt that Alohim had taken more than was fair to him, claiming the dominion of Kings. And so Mat'raktha went to his brother and demanded that he give him Dominion over Kings and Nations and Humanity, but Alohim responded, "No, my brother, I cannot give this to you, for it is a part of me, and to give it up would be my end."
            </p>
            <p>
              Mat'raktha grew wroth at his brother's rejection, and struck him, but Alohim resisted, and soon Mat'raktha was forced to retreat. So Mat'raktha conferred with the other Gods, convincing many of the rightness of his claim and together they went to Alohim and demanded that he give up his Dominion over Kings and Nations and all Humanity, and again Alohim refused, and many rallied to his defense, and seeing that he could not force Alohim to give up his dominion, Mat'raktha left.
            </p>
            <p>
              In his anger, Mat'raktha commanded all in his domain and all who would aid him, "Today, and from henceforth, we make war on the children of Alohim, and all who would aid them." And they marched forth their hosts, and Alohim and the Gods of Good marched forth their hosts, and the battle lasted uncountable years upon the face of Elthelas and throughout the Planes of Existence, and many millions died on both sides.
            </p>
            <p>
              Then the Mother Gods, seeing the war among their children, met together to decide what to do. Area advocated to destroy all that they had created and start over, without their children and keeping all the powers of creation to the Mother Gods, but Gaian loved her children, and refused her, and in anger Area struck Gaian what should have been a fatal blow were she not absolute. Nevertheless, it left Gaian unconscious and unable to be revived. Seeing this, Nera summoned all her will, and created a great prison beyond the Astral Sea. Then she invited Area to join her for a great feast in this place, for it was full of verdant fields of green, saying it would be the beginning of their new creation, and once Area was within, she sealed it away, banishing Area from Elthelas and all the Planes of Existence forever.
            </p>
            <p>
              Then, Nera summoned her will again and forged it into a single blade, and she spoke to all of the Gods. "In this blade I have created for myself the ability to destroy that which my sisters and I have wrought, yea, even thee our greatest children would suffer death at the hands of this blade, for what we created I can destroy. So long as this blade exists, no God but Gaian will walk upon Elthelas, and each shall be banished to the Planes of their Dominion, and whosoever shall break this eternal truce shall be no more." And with this proclamation, the Gods fled, each to their respective Dominion. The Sorceron fled with them, all but a few, wounded and trapped upon Elthelas.
            </p>
            <p>
              The mortal races found themselves alone and scattered upon Elthelas, the gifts of their Gods gone, their homes long destroyed in war, and the long rebuilding began.
            </p>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script src="./js/gods.js"></script>
<style src="./scss/gods.scss" lang="scss" scoped></style>
