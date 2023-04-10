<template>
  <div>
    <h2>Languages Known by Country of Origin</h2>
    <p>
      All PCs should select a country of origin for their character, their languages known are based on this per the table below.  Adventurers with an
      intelligence score and charisma score that are both 11 or more may select 1 additional language of their choice except for Sorceron or Druidic.  Characters
      with an intelligence or charisma score of 7 or less know one fewer language from the 'Other Languages' column.  Characters with an intelligence or
      charisma score of 5 or less know only their first language.  Characters with an intelligence or charisma score of 3 or less do not speak any language
      and can only communicate via sub-lingual structures such as grunts, growls, etc.
    </p>
    <table class='table'>
      <thead>
        <tr><th>Country</th><th>First Language</th><th>Other Languages</th></tr>
      </thead>
      <tbody>
        <tr><td>Alfadir</td><td>Staelic</td><td>Hisru, Morrind</td></tr>
        <tr><td>Arad</td><td>Neran</td><td>Orc, Celestial</td></tr>
        <tr><td>Asuran Confederacy</td><td>Asuran</td><td>Yuan-ti</td></tr>
        <tr><td>Consolidated Territories of Parakas</td><td>Orc</td><td>Goblin, Imperial</td></tr>
        <tr><td>Curinor</td><td>Dwarf</td><td>Imperial, Morrind</td></tr>
        <tr><td>Degak'Ta</td><td>Trollkin</td><td>Orc, Morrind</td></tr>
        <tr><td>Demal Thor</td><td>Elf</td><td>Imperial, Dwarf</td></tr>
        <tr><td>Dera</td><td>Deran</td><td>Abyssal, Infernal</td></tr>
        <tr><td>Dera'Dragorim</td><td>Deran</td><td>Draconic, Hisru</td></tr>
        <tr><td>Dormania</td><td>Imperial</td><td>Morrind</td></tr>
        <tr><td>Eldoran</td><td>Elf</td><td>Deran, Sylvan</td></tr>
        <tr><td>Federated Alliance Territories</td><td>One of Orc, Goblin, Imperial, Elf, Dwarf</td><td>Two of Orc, Goblin, Imperial, Elf, or Dwarf</td></tr>
        <tr><td>Gerasalim</td><td>Imperial</td><td>Elf, Orc</td></tr>
        <tr><td>Gnarra</td><td>Sylvan</td><td>Elf</td></tr>
        <tr><td>Gorgro</td><td>Giant or Troll</td><td>Giant or Troll, Staelic</td></tr>
        <tr><td>Hisru'de'tan</td><td>Hisru</td><td>Staelic, Stagen</td></tr>
        <tr><td>Kandor</td><td>Imperial</td><td>Dwarf, Morrind</td></tr>
        <tr><td>Malinval</td><td>Orc</td><td>Goblin, Morrind</td></tr>
        <tr><td>Morrindim</td><td>Morrind</td><td>Neran, Orc</td></tr>
        <tr><td>Nerim</td><td>Neran</td><td>Orc, Morrind</td></tr>
        <tr><td>Olda</td><td>Goblin</td><td>Orc, Elf</td></tr>
        <tr><td>Riftlan Wilds</td><td>Hisru</td><td>Deran, one of Abyssal, Aquan, Auran, Celestial, Draconic, Ignan, Infernal, Sylvan, or Terran</td></tr>
        <tr><td>Sage</td><td>Orc</td><td>Goblin, Stagen</td></tr>
        <tr><td>Seran</td><td>Neran</td><td>Morrind</td></tr>
        <tr><td>Shendarel</td><td>Elf or Neran</td><td>Elf or Neran, Goblin</td></tr>
        <tr><td>Ssitsu</td><td>Yuan-ti</td><td>Asuran</td></tr>
        <tr><td>Staelia</td><td>Staelic</td><td>Stagen</td></tr>
        <tr><td>Stagenheim</td><td>Stagen</td><td>Staelic, Hisru</td></tr>
        <tr><td>Terron</td><td>Neran</td><td>Imperial, Orc</td></tr>
        <tr><td>Waelin</td><td>Elf</td><td>Imperial, Sylvan</td></tr>
        <tr><td>Zelfir</td><td>Hisru</td><td>Staelic, Morrind</td></tr>
      </tbody>
    </table>
    <h2>Language Descriptions</h2>
    <ul>
      <li>Abyssal: The language of Demons</li>
      <li>Aquan: The language of the plane of water and water elementals</li>
      <li>Asuran: The language of the Asuran Confederacy</li>
      <li>Auran: The language of the plane of air and air elementals</li>
      <li>Celestial: The language of the Gods and their immediate servants</li>
      <li>Deran: The language of the peoples of Dera, now in Dera'Dragorim</li>
      <li>Draconic: The language of dragons</li>
      <li>Druidic: The language of druids (cannot be a bonus language, only obtained through taking levels in druid)</li>
      <li>Dwarf: The language of the dwarves of Curinor</li>
      <li>Elf: The language of the elves, who live in Eldoran and Demal Thor</li>
      <li>Giant: The language of giants and their kin</li>
      <li>Gnoll: The language of reclusive tribes of gnolls</li>
      <li>Gnome: The ancient language of the imperial gnomes, now a mostly dead language</li>
      <li>Goblin: The language of goblin slaves</li>
      <li>Hisru: The language of the Hisru people of Zelfir and Hisru'de'tan</li>
      <li>Ignan: The language of the plane of fire and fire elementals</li>
      <li>Imperial: The language of the peoples once of the Dormanian Empire, primarily in Kandor, Gerasalim, and Dormania</li>
      <li>Infernal: Language of the Devils of the 9 Hells</li>
      <li>Morrind: Language of the Morrind Dwarves who travel the seas and a popular language of commerce</li>
      <li>Neran: The language of the Neran peoples once of Nerim, now dispersed among Arad, Seran, Shendarel, and Terron</li>
      <li>Orc: The language of orcs and free goblins, spoken in Sage, Olda, and Malinval</li>
      <li>Sorceron: Language of the now extinct Sorceron, exact pronunciation is unknown (cannot be bonus language, can only obtain through ranks in speak language)</li>
      <li>Staelic: The language of the Staelic peoples of Staelia and Alfadir</li>
      <li>Stagen: The language of the gnomes of Stagenheim</li>
      <li>Sylvan: The language of fey creatures</li>
      <li>Terran: The language of the plane of earth and earth elementals</li>
      <li>Troll: The language of trolls</li>
      <li>Trollkin: The language of the trollkin of Degak'Ta</li>
      <li>Yuan-ti: The language of the Yuan-ti of Ssitsu</li>
    </ul>
    <h2>Language Statistics</h2>
    <table class='table'>
      <thead>
        <tr><th>Language</th><th>Countries Spoken</th><th>First Language Countries</th></tr>
      </thead>
      <tbody>
        <tr><td>Abyssal</td><td>1 1/9</td><td>0</td></tr>
        <tr><td>Aquan</td><td>1/9</td><td>0</td></tr>
        <tr><td>Auran</td><td>1/9</td><td>0</td></tr>
        <tr><td>Celestial</td><td>1 1/9</td><td>0</td></tr>
        <tr><td>Deran</td><td>4</td><td>2</td></tr>
        <tr><td>Draconic</td><td>1 1/9</td><td>0</td></tr>
        <tr><td>Druidic</td><td>0</td><td>0</td></tr>
        <tr><td>Dwarf</td><td>3</td><td>1</td></tr>
        <tr><td>Elf</td><td>6</td><td>2.5</td></tr>
        <tr><td>Giant</td><td>1</td><td>0.5</td></tr>
        <tr><td>Gnoll</td><td>0</td><td>0</td></tr>
        <tr><td>Gnome</td><td>0</td><td>0</td></tr>
        <tr><td>Goblin</td><td>4</td><td>1</td></tr>
        <tr><td>Hisru</td><td>6</td><td>3</td></tr>
        <tr><td>Ignan</td><td>1/9</td><td>0</td></tr>
        <tr><td>Imperial</td><td>6</td><td>3</td></tr>
        <tr><td>Infernal</td><td>1 1/9</td><td>0</td></tr>
        <tr><td>Morrind</td><td>10</td><td>1</td></tr>
        <tr><td>Neran</td><td>6</td><td>4.5</td></tr>
        <tr><td>Orc</td><td>9</td><td>2</td></tr>
        <tr><td>Sorceron</td><td>0</td><td>0</td></tr>
        <tr><td>Staelic</td><td>6</td><td>2</td></tr>
        <tr><td>Stagen</td><td>4</td><td>1</td></tr>
        <tr><td>Sylvan</td><td>2 1/9</td><td>1</td></tr>
        <tr><td>Terran</td><td>1/9</td><td>0</td></tr>
        <tr><td>Troll</td><td>1</td><td>0.5</td></tr>
        <tr><td>Trollkin</td><td>1</td><td>1</td></tr>
        <tr><td>Yuan-ti</td><td>1</td><td>1</td></tr>
      </tbody>
    </table>
  </div>
</template>
<script src="./js/languages.js"></script>
