<template>
  <div class="container charbuilder">
    <div class="print-full col-12">
      <!-- Character Header -->
      <div class="row">
        <div class="col-10">
          <div class="row">
            <div class="col">
              <input type="text" class="charsheet-text">
              Character Name
            </div>
            <div class="col">
              <input type="text" class="charsheet-text">
              Player
            </div>
            <div class="col">
              <input type="text" class="charsheet-text">
              Background
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input type="text" class="charsheet-text">
              Ancestry
            </div>
            <div class="col">
              <input type="text" class="charsheet-text">
              Class(es)
            </div>
          </div>
        </div>
        <div class="col-2">
          <img src="https://elthelas-images.herokuapp.com/swordshieldlogo.png" class="ddlogo desktop" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
      <!--Ability Score-->
      <!--Skills-->
      <div class="statzone">
        <div class="col-5">
          <div class="statbox">
            <br />
            <hr />
            STR
          </div>
        </div>
        <div class="skillbox col-7">
          <input type="text" class="charsheet-num" /> Mod<br />
          <input type="text" class="charsheet-num" /> Save<br />
          <input type="text" class="charsheet-num" /> Athletics<br />
        </div>
      </div>
      <hr />
      <div class="statzone">
        <div class="col-5">
          <div class="statbox">
            <br />
            <hr />
            DEX
          </div>
        </div>
        <div class="skillbox col-7">
          <input type="text" class="charsheet-num" /> Mod<br />
          <input type="text" class="charsheet-num" /> Save<br />
          <input type="text" class="charsheet-num" /> Acrobatics<br />
          <input type="text" class="charsheet-num" /> Slight of Hand<br />
          <input type="text" class="charsheet-num" /> Stealth
        </div>
      </div>
      <hr />
      <div class="statzone">
        <div class="col-5">
          <div class="statbox">
            <br />
            <hr />
            CON
          </div>
        </div>
        <div class="skillbox col-7">
          <input type="text" class="charsheet-num" /> Mod<br />
          <input type="text" class="charsheet-num" /> Save<br />
          <input type="text" class="charsheet-num" /> Max Exhaustion<br />
        </div>
      </div>
      <hr />
      <div class="statzone">
        <div class="col-5">
          <div class="statbox">
            <br />
            <hr />
            INT
          </div>
        </div>
        <div class="skillbox col-7">
          <input type="text" class="charsheet-num" /> Mod<br />
          <input type="text" class="charsheet-num" /> Save<br />
          <input type="text" class="charsheet-num" /> Arcana<br />
          <input type="text" class="charsheet-num" /> History<br />
          <input type="text" class="charsheet-num" /> Investigation<br />
          <input type="text" class="charsheet-num" /> Nature<br />
          <input type="text" class="charsheet-num" /> Religion<br />
        </div>
      </div>
      <hr />
      <div class="statzone">
        <div class="col-5">
          <div class="statbox">
            <br />
            <hr />
            WIS
          </div>
        </div>
        <div class="skillbox col-7">
          <input type="text" class="charsheet-num" /> Mod<br />
          <input type="text" class="charsheet-num" /> Save<br />
          <input type="text" class="charsheet-num" /> Animal Handling<br />
          <input type="text" class="charsheet-num" /> Insight<br />
          <input type="text" class="charsheet-num" /> Medicine<br />
          <input type="text" class="charsheet-num" /> Perception<br />
          <input type="text" class="charsheet-num" /> Survival<br />
        </div>
      </div>
      <hr />
      <div class="statzone">
        <div class="col-5">
          <div class="statbox">
            <br />
            <hr />
            CHA
          </div>
        </div>
        <div class="skillbox col-7">
          <input type="text" class="charsheet-num" /> Mod<br />
          <input type="text" class="charsheet-num" /> Save<br />
          <input type="text" class="charsheet-num" /> Deception<br />
          <input type="text" class="charsheet-num" /> Intimidation<br />
          <input type="text" class="charsheet-num" /> Performance<br />
          <input type="text" class="charsheet-num" /> Persuasion<br />
        </div>
      </div>
      <div class="charsheet-static" id="profbox">
        Proficiencies and Languages
      </div>
      </div>
      <div class="col-4">
        <!--Initiative-->
        <div class="row">
          <div class="col-3">
            <div class="charsheet-static">
              <br />
              <hr />
              AC
            </div>
          </div>
          <div class="col-3">
            <div class="charsheet-static">
              <br />
              <hr />
              Init
            </div>
          </div>
          <div class="col-3">
            <div class="charsheet-static">
              <br />
              <hr />
              Prof
            </div>
          </div>
          <div class="col-3">
            <div class="charsheet-static">
              <br />
              <hr />
              Exh
            </div>
          </div>
        </div>
        <!--HP-->
        <div class="charsheet-static">
          <div class="row">
            <div class="col-4">
              <br />
              <hr />
              HP
            </div>
            <div class="col-4">
              <br />
              <hr />
              PP
            </div>
            <div class="col-4">
              <br />
              <hr />
              Temp HP
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <br />
              <hr />
              HP Max
            </div>
            <div class="col-4">
              <br />
              <hr />
              PP Max
            </div>
            <div class="col-4">
              <br />
              <hr />
              Hit Dice
            </div>
          </div>
        </div>
        <!--Speed-->
        <div class="charsheet-static">
          <div class="row">
            <div class="col-4">
              <br />
              <hr />
              Speed
            </div>
            <div class="col-4">
              <br />
              <hr />
              Swim
            </div>
            <div class="col-4">
              <br />
              <hr />
              Climb
            </div>
          </div>
          <div class="row">
            <div class="col-2">
              &nbsp;
            </div>
            <div class="col-4">
              <br />
              <hr />
              Fly
            </div>
            <div class="col-4">
              <br />
              <hr />
              Burrow
            </div>
            <div class="col-2">
              &nbsp;
            </div>
          </div>
        </div>
        <!--Combat-->
        <div class="charsheet-static">
          Actions
          <div class="row smalltext">
            <div class="col-6">
              Attack<br />
              Cast a Spell<br />
              Dash<br />
              Delay<br />
              Disengage<br />
              Dodge<br />
              First Aid<br />
            </div>
            <div class="col-6">
              Help<br />
              Hide<br />
              Ready<br />
              Repair Armor<br />
              Run<br />
              Search<br />
              Use an Object
            </div>
          </div>
          <div class="bigspace">&nbsp;</div>
        </div>
        <div class="charsheet-static">
          Bonus Actions
          <div class="bigspace">&nbsp;</div>
        </div>
        <div class="charsheet-static">
          Reactions
          <div class="bigspace">&nbsp;</div>
        </div>
        <!--Equipment-->
      </div>
      <div class="col-5">
        <!--Attacks-->
        <div class="charsheet-static">
          Injuries/Madnesses
          <div class="bigspace"></div>
        </div>
        <div class="charsheet-static">
          Feats
          <div class="bigspace"></div>
        </div>
        <div class="charsheet-static">
          Ancestry Features
          <div class="bigspace"></div>
        </div>
        <div class="charsheet-static">
          Class Features
          <br /><br />
          <div class="bigspace"></div>
          <div class="bigspace"></div>
          <div class="bigspace"></div>
        </div>
        <!--Features-->
      </div>
    </div>
    <div style="page-break-after: always">&nbsp;</div>
    <h2>Spellcasting</h2>
    <div class="row">
      <div class="col-3">
        <input type="text" class="charsheet-text">
        Character Name
      </div>
      <div class="col-3">
        <input type="text" class="charsheet-text">
        Casting Class
      </div>
      <div class="col-2">
        <input type="text" class="charsheet-text">
        Casting Stat
      </div>
      <div class="col-2">
        <input type="text" class="charsheet-text">
        Attack Bonus
      </div>
      <div class="col-2">
        <input type="text" class="charsheet-text">
        Save DC
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-4">
        <h5>Cantrips</h5>
        <div class="row spelllist">
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
        </div>
        <hr />
        <h5>1st <input type="text" class="charsheet-num" /> Slots <input type="text" class="charsheet-num" /> Used</h5>
        <div class="row spelllist">
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
        </div>
      </div>
      <div class="col-4">
        <h5>2nd <input type="text" class="charsheet-num" /> Slots <input type="text" class="charsheet-num" /> Used</h5>
        <div class="row spelllist">
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
        </div>
        <hr />
        <h5>3rd <input type="text" class="charsheet-num" /> Slots <input type="text" class="charsheet-num" /> Used</h5>
        <div class="row spelllist">
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
        </div>
        <hr />
        <h5>4th <input type="text" class="charsheet-num" /> Slots <input type="text" class="charsheet-num" /> Used</h5>
        <div class="row spelllist">
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
        </div>
      </div>
      <div class="col-4">
        <h5>5th <input type="text" class="charsheet-num" /> Slots <input type="text" class="charsheet-num" /> Used</h5>
        <div class="row spelllist">
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
        </div>
        <hr />
        <h5>6th <input type="text" class="charsheet-num" /> Slots <input type="text" class="charsheet-num" /> Used</h5>
        <div class="row spelllist">
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
        </div>
        <hr />
        <h5>7th <input type="text" class="charsheet-num" /> Slots <input type="text" class="charsheet-num" /> Used</h5>
        <div class="row spelllist">
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
        </div>
        <hr />
        <h5>8th <input type="text" class="charsheet-num" /> Slots <input type="text" class="charsheet-num" /> Used</h5>
        <div class="row spelllist">
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
        </div>
        <hr />
        <h5>9th <input type="text" class="charsheet-num" /> Slots <input type="text" class="charsheet-num" /> Used</h5>
        <div class="row spelllist">
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
          <div class="col-1"><input type="checkbox"></div><div class="col-11"><input type="text" class="charsheet-text smalltext"></div>
        </div>
      </div>
    </div>
    <div style="page-break-after: always">&nbsp;</div>
        <div class="row">
      <div class="col-6">
        <input type="text" class="charsheet-text">
        Character Name
      </div>
      <div class="col-6">
        <input type="text" class="charsheet-text">
        Player Name
      </div>
    </div>
    <hr />
    <div class="charsheet-static spelllist">
        <div class="row">
          <div class="col-6">Resource</div><div class="col">Current</div><div class="col">Max</div><div class="col">Recovery</div>
        </div>
        <div class="row">
          <div class="col-6"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
        </div>
        <div class="row">
          <div class="col-6"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
        </div>
        <div class="row">
          <div class="col-6"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
        </div>
        <div class="row">
          <div class="col-6"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
        </div>
        <div class="row">
          <div class="col-6"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
        </div>
        <div class="row">
          <div class="col-6"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
        </div>
        <div class="row">
          <div class="col-6"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
          <div class="col"><input class="charsheet-text"></div>
        </div>
    </div>
    <div class="row spelllist">
      <div class="col-6">
        <div class="charsheet-static">
          Weapons
          <div class="row">
            <div class="col-5">Weapon</div><div class="col">Attack</div><div class="col">Damage</div><div class="col">Mastery</div>
          </div>          
          <div class="row">
            <div class="col-5"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
          </div>          
          <div class="row">
            <div class="col-5"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
          </div>          
          <div class="row">
            <div class="col-5"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
          </div>          
          <div class="row">
            <div class="col-5"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
          </div>          
          <div class="row">
            <div class="col-5"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
          </div>          
          <div class="row">
            <div class="col-5"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
            <div class="col"><input class="charsheet-text"></div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="charsheet-static">
          Pets
          <input class="charsheet-text">
          <input class="charsheet-text">
          <input class="charsheet-text">
          <input class="charsheet-text">
          <input class="charsheet-text">
          <input class="charsheet-text">
          <input class="charsheet-text">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="charsheet-static spelllist">
          Equipment
          <div class="row">
            <div class="col-2">
              <div class="charsheet-static">
                <br />
                <hr />
                PP
              </div>
            </div>
            <div class="col-2">
              <div class="charsheet-static">
                <br />
                <hr />
                GP
              </div>
            </div>
            <div class="col-2">
              <div class="charsheet-static">
                <br />
                <hr />
                SP
              </div>
            </div>
            <div class="col-2">
              <div class="charsheet-static">
                <br />
                <hr />
                CP
              </div>
            </div>
            <div class="col-2">
              <div class="charsheet-static">
                <br />
                <hr />
                Carried
              </div>
            </div>
            <div class="col-2">
              <div class="charsheet-static">
                <br />
                <hr />
                Carry Cap
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="row">
                <div class="col-7">Item</div><div class="col">Weight</div><div class="col">Count</div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
            </div>
                        <div class="col-6">
              <div class="row">
                <div class="col-7">Item</div><div class="col">Weight</div><div class="col">Count</div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
              <div class="row">
                <div class="col-7"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
                <div class="col"><input class="charsheet-text"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="page-break-after: always">&nbsp;</div>
    <div class="row">
      <div class="col-3">
        <input type="text" class="charsheet-text">
        Character Name
      </div>
      <div class="col-3">
        <input type="text" class="charsheet-text">
        Alignment
      </div>
      <div class="col-2">
        <input type="text" class="charsheet-text">
        God Worshipped
      </div>
      <div class="col-2">
        <input type="text" class="charsheet-text">
        Height
      </div>
      <div class="col-2">
        <input type="text" class="charsheet-text">
        Weight
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <input type="text" class="charsheet-text">
        Age
      </div>
      <div class="col-2">
        <input type="text" class="charsheet-text">
        Hair
      </div>
      <div class="col-2">
        <input type="text" class="charsheet-text">
        Eyes
      </div>
      <div class="col-2">
        <input type="text" class="charsheet-text">
        Skin
      </div>
      <div class="col-4">
        <input type="text" class="charsheet-text">
        Distinguishing Features
      </div>
    </div>
    <div class="charsheet-static">
      Allies, Friends, and Family
      <input type="text" class="charsheet-text">
      <input type="text" class="charsheet-text">
      <input type="text" class="charsheet-text">
      <input type="text" class="charsheet-text">
      <input type="text" class="charsheet-text">
    </div>
    <div class="row">
      <div class="col-6">
        <div class="charsheet-static">
          Bond
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
        </div>
      </div>
      <div class="col-6">
        <div class="charsheet-static">
          Personality
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
        </div>
      </div>
    </div>
    <div class="charsheet-static">
      Backstory
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
    </div>
    <div style="page-break-after: always">&nbsp;</div>
    <div class="row">
      <div class="col-4">
        <label>Today's Date</label>
        <input class="charsheet-text">
      </div>
      <div class="col-4">
        <label>Starting In-Game Date</label>
        <input class="charsheet-text">
      </div>
      <div class="col-4">
        <label>Ending In-Game Date</label>
        <input class="charsheet-text">
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="charsheet-static">
          <h4>Where Are We?</h4>
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="charsheet-static">
            <h4>Who Did We Meet?</h4>
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="charsheet-static">
            <h4>What are we doing?</h4>
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="charsheet-static">
            <h4>Encounters</h4>
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          </div>
        </div>
        <div class="col-6">
          <div class="charsheet-static">
            <h4>Loot</h4>
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          <input type="text" class="charsheet-text">
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  
</script>
<style scoped>
  .spelllist input[type=checkbox] {
    margin-top: 5px;
  }
  .spelllist .charsheet-text {
    line-height: 1;
    height: 18px !important;
  }
  #profbox {
    display: block;
    height: 300px !important;
    margin-top: 20px !important;
  }
  .bigspace {
    height: 111px !important; 
  }
  .charsheet-static {
    border-radius: 20px;
    padding: 10px 5px 10px 5px;
    text-align: center;
    line-height: 2;
  }
  .charsheet-static hr {
    margin-top: 0;
    margin-bottom: 0;
  }
  .container {
    max-width: 1000px;
  }
  .charsheet-text {
    line-height: 2;
    height: 32px !important;
  }
  .charsheet-num {
    border-bottom: 1px solid black;
    margin-left: 10px;
  }
  .statzone {
    display:flex;
    flex-direction: row;
  }
  .skillbox {
    font-weight:bold;
    line-height: 1.5;
    font-size: 0.75em;
  }
  hr {
    clear: left;
  }
  .statbox {
    border: 1px solid black;
    text-align: center;
    font-size: 1.6em;
    line-height: 2;
    border-radius: 20px;
    height: auto;
  }
  .statbox hr {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>