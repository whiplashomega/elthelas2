<template>
  <div>
        <p>
          Is a character muscle-bound and insightful? Brilliant and charming? Nimble and hardy? Ability scores define these qualities—a creature's assets as well as weaknesses.
        </p>
        <p>
          The three main rolls of the game—the ability check, the saving throw, and the attack roll—rely on the six ability scores. The basic rule behind these rolls is to roll a d20, add an ability modifier derived from one of the six ability scores, and compare the total to a target number.
        </p>
        <p>
          Each of a creature’s abilities has a score, a number that defines the magnitude of that ability. An ability score is not just a measure of innate capabilities, but also encompasses a creature’s training and competence in activities related to that ability.
        </p>
        <p>
          A score of 10 or 11 is the normal human average, but adventurers and many monsters are a cut above average in most abilities. A score of 18 is the highest that a person usually reaches. Adventurers can have scores as high as 20, and monsters and divine beings can have scores as high as 30.
        </p>
        <p>
          Each ability also has a modifier, derived from the score and ranging from 5 (for an ability score of 1) to +10 (for a score of 30). The Ability Scores and Modifiers table notes the ability modifiers for the range of possible ability scores, from 1 to 30.
        </p>
    <b-tabs>
      <b-tab index="0" title="Modifiers">
         <table class="table table-sm">
          <thead><tr><th>Score</th><th>Modifier</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>-5</td></tr>
            <tr><td>2-3</td><td>-4</td></tr>
            <tr><td>4-5</td><td>-3</td></tr>
            <tr><td>6-7</td><td>-2</td></tr>
            <tr><td>8-9</td><td>-1</td></tr>
            <tr><td>10-11</td><td>+0</td></tr>
            <tr><td>12-13</td><td>+1</td></tr>
            <tr><td>14-15</td><td>+2</td></tr>
            <tr><td>16-17</td><td>+3</td></tr>
            <tr><td>18-19</td><td>+4</td></tr>
            <tr><td>20-21</td><td>+5</td></tr>
            <tr><td>22-23</td><td>+6</td></tr>
            <tr><td>24-25</td><td>+7</td></tr>
            <tr><td>26-27</td><td>+8</td></tr>
            <tr><td>28-29</td><td>+9</td></tr>
            <tr><td>30</td><td>+10</td></tr>
          </tbody>
        </table>       
      </b-tab>
      <b-tab index="1" title="Ability Checks">
        <h2>Ability Checks</h2>
        <p>
          An ability check tests a character’s or monster’s innate talent and training in an effort to overcome a challenge. The DM calls for an ability check when a character or monster attempts an action (other than an attack) that has a chance of failure. When the outcome is uncertain, the dice determine the results.
        </p>
        <p>
          For every ability check, the DM decides which of the six abilities is relevant to the task at hand and the difficulty of the task, represented by a Difficulty Class. The more difficult a task, the higher its DC. The Typical Difficulty Classes table shows the most common DCs.
        </p>
        <h5>Typical Difficulty Classes</h5>
        <table class="table table-sm">
          <thead><tr><th>Task Difficulty</th><th>DC</th></tr></thead>
          <tbody>
            <tr><td>Very easy</td><td>5</td></tr>
            <tr><td>Easy</td><td>10</td></tr>
            <tr><td>Medium</td><td>15</td></tr>
            <tr><td>Hard</td><td>20</td></tr>
            <tr><td>Very Hard</td><td>25</td></tr>
            <tr><td>Nearly Impossible</td><td>30</td></tr>
          </tbody>
        </table>
        <p>
          To make an ability check, roll a d20 and add the relevant ability modifier. As with other d20 rolls, apply bonuses and penalties, and compare the total to the DC. If the total equals or exceeds the DC, the ability check is a success—the creature overcomes the challenge at hand. Otherwise, it’s a failure, which means the character or monster makes no progress toward the objective or makes progress combined with a setback determined by the DM.
        </p>
        <h4>Contests</h4>
        <p>
          Sometimes one character’s or monster’s efforts are directly opposed to another’s. This can occur when both of them are trying to do the same thing and only one can succeed, such as attempting to snatch up a magic ring that has fallen on the floor. This situation also applies when one of them is trying to prevent the other one from accomplishing a goal—for example, when a monster tries to force open a door that an adventurer is holding closed. In situations like these, the outcome is determined by a special form of ability check, called a contest.
        </p>
        <p>
          Both participants in a contest make ability checks appropriate to their efforts. They apply all appropriate bonuses and penalties, but instead of comparing the total to a DC, they compare the totals of their two checks. The participant with the higher check total wins the contest. That character or monster either succeeds at the action or prevents the other one from succeeding.
        </p>
        <p>
          If the contest results in a tie, the situation remains the same as it was before the contest. Thus, one contestant might win the contest by default. If two characters tie in a contest to snatch a ring off the floor, neither character grabs it. In a contest between a monster trying to open a door and an adventurer trying to keep the door closed, a tie means that the door remains shut.
        </p>
        <h4>Skills</h4>
        <p>
          Each ability covers a broad range of capabilities, including skills that a character or a monster can be proficient in. A skill represents a specific aspect of an ability score, and an individual’s proficiency in a skill demonstrates a focus on that aspect. (A character’s starting skill proficiencies are determined at character creation, and a monster’s skill proficiencies appear in the monster’s stat block.)
        </p>
        <p>
          For example, a Dexterity check might reflect a character’s attempt to pull off an acrobatic stunt, to palm an object, or to stay hidden. Each of these aspects of Dexterity has an associated skill: Acrobatics, Sleight of Hand, and Stealth, respectively. So a character who has proficiency in the Stealth skill is particularly good at Dexterity checks related to sneaking and hiding.
        </p>
        <p>
          Sometimes, the DM might ask for an ability check using a specific skill—for example, “Make a Wisdom (Perception) check.” At other times, a player might ask the DM if proficiency in a particular skill applies to a check. In either case, proficiency in a skill means an individual can add his or her proficiency bonus to ability checks that involve that skill. Without proficiency in the skill, the individual makes a normal ability check.
        </p>
        <p>
          For example, if a character attempts to climb up a dangerous cliff, the Dungeon Master might ask for a Strength (Athletics) check. If the character is proficient in Athletics, the character’s proficiency bonus is added to the Strength check. If the character lacks that proficiency, he or she just makes a Strength check.
        </p>
        <h4>Skills with Different Abilities</h4>
        <p>
          Normally, your proficiency in a skill applies only to a specific kind of ability check. Proficiency in Athletics, for example, usually applies to Strength checks. In some situations, though, your proficiency might reasonably apply to a different kind of check. In such cases, the DM might ask for a check using an unusual combination of ability and skill, or you might ask your DM if you can apply a proficiency to a different check. For example, if you have to swim from an offshore island to the mainland, your DM might call for a Constitution check to see if you have the stamina to make it that far. In this case, your DM might allow you to apply your proficiency in Athletics and ask for a Constitution (Athletics) check. So if you’re proficient in Athletics, you apply your proficiency bonus to the Constitution check just as you would normally do for a Strength (Athletics) check. Similarly, when your half-orc barbarian uses a display of raw strength to intimidate an enemy, your DM might ask for a Strength (Intimidation) check, even though Intimidation is normally associated with Charisma.
        </p>
        <h4>Passive Checks</h4>
        <p>
          A passive check is a special kind of ability check that doesn’t involve any die rolls. Such a check can represent the average result for a task done repeatedly, such as searching for secret doors over and over again, or can be used when the DM wants to secretly determine whether the characters succeed at something without rolling dice, such as noticing a hidden monster.
        </p>
        <p>
          Here’s how to determine a character’s total for a passive check: 10 + all modifiers that normally apply to the check. If the character has advantage on the check, add 5. For disadvantage, subtract 5. The game refers to a passive check total as a score.
        </p>
        <p>
          For example, if a 1st-level character has a Wisdom of 15 and proficiency in Perception, he or she has a passive Wisdom (Perception) score of 14.
        </p>
        <p>
          The rules on hiding in the “Dexterity” section below rely on passive checks, as do the exploration rules in chapter 8.
        </p>
        <h4>Working Together</h4>
        <p>
          Sometimes two or more characters team up to attempt a task. The character who’s leading the effort—or the one with the highest ability modifier—can make an ability check with advantage, reflecting the help provided by the other characters. In combat, this requires the Help action.
        </p>
        <p>
          A character can only provide help if the task is one that he or she could attempt alone. For example, trying to open a lock requires proficiency with thieves’ tools, so a character who lacks that proficiency can’t help another character in that task. Moreover, a character can help only when two or m ore individuals working together would actually be productive. Some tasks, such as threading a needle, are no easier with help.
        </p>
        <h5>Group Checks</h5>
        <p>
          When a number of individuals are trying to accomplish something as a group, the DM might ask for a group ability check. In such a situation, the characters who are skilled at a particular task help cover those who aren't.
        </p>
        <p>
          To make a group ability check, everyone in the group makes the ability check. If at least half the group succeeds, the whole group succeeds. Otherwise, the group fails.
        </p>
        <p>
          Group checks don’t come up very often, and they’re most useful when all the characters succeed or fail as a group. For example, when adventurers are navigating a swamp, the DM might call for a group Wisdom (Survival) check to see if the characters can avoid the quicksand, sinkholes, and other natural hazards of the environment. If at least half the group succeeds, the successful characters are able to guide their companions out of danger. Otherwise, the group stumbles into one of these hazards.
        </p>
      </b-tab>
      <b-tab index="2" title="Strength">
        <h2>Strength</h2>
        <p>
          Strength measures bodily power, athletic training, and the extent to which you can exert raw physical force.
        </p>
        <h4>Strength Checks</h4>
        <p>
          A Strength check can model any attempt to lift, push, pull, or break something, to force your body through a space, or to otherwise apply brute force to a situation. The Athletics skill reflects aptitude in certain kinds of Strength checks.
        </p>
        <p>
          <strong>Athletics.</strong> Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming. Examples include the following activities:
        </p>
        <ul>
          <li>You attempt to climb a sheer or slippery cliff, avoid hazards while scaling a wall, or cling to a surface while something is trying to knock you off.</li>
          <li>You try to jump an unusually long distance or pull off a stunt midjump.</li>
          <li>You struggle to swim or stay afloat in treacherous currents, storm-tossed waves, or areas of thick seaweed. Or another creature tries to push or pull you underwater or otherwise interfere with your swimming.</li>
        </ul>
        <p>
          <strong>Other Strength Checks.</strong> The DM might also call for a Strength check when you try to accomplish tasks like the following:
        </p>
        <ul>
          <li>Force open a stuck, locked, or barred door</li>
          <li>Break free of bonds</li>
          <li>Push through a tunnel that is too small</li>
          <li>Hang on to a wagon while being dragged behind it</li>
          <li>Tip over a statue</li>
          <li>Keep a boulder from rolling</li>
        </ul>
        <h4>Attack Rolls and Damage</h4>
        <p>
          You add your Strength modifier to your attack roll and your damage roll when attacking with a melee weapon such as a mace, a battleaxe, or a javelin. You use melee weapons to make melee attacks in hand-to-hand combat, and some of them can be thrown to make a ranged attack.
        </p>
        <h4>Lifting and Carrying</h4>
        <p>
          Your Strength score determines the amount of weight you can bear. The following terms define what you can lift or carry.
        </p>
        <p>
          <strong>Carrying Capacity.</strong> Your carrying capacity is your Strength score multiplied by 15. This is the weight (in pounds) that you can carry, which is high enough that most characters don’t usually have to worry about it.
        </p>
        <p>
          <strong>Push, Drag, or Lift.</strong> You can push, drag, or lift a weight in pounds up to twice your carrying capacity (or 30 times your Strength score). While pushing or dragging weight in excess of your carrying capacity, your speed drops to 5 feet.
        </p>
        <p>
          <strong>Size and Strength.</strong> Larger creatures can bear more weight, whereas Tiny creatures can carry less. For each size category above Medium, double the creature’s carrying capacity and the amount it can push, drag, or lift. For a Tiny creature, halve these weights.
        </p>
        <h5>Variant: Encumbrance</h5>
        <p>
          The rules for lifting and carrying are intentionally simple. Here is a variant if you are looking for more detailed rules for determining how a character is hindered by the weight of equipment. When you use this variant, ignore the Strength column of the Armor table in chapter 5.
        </p>
        <p>
          If you carry weight in excess of 5 times your Strength score, you are encumbered, which means your speed drops by 10 feet.
        </p>
        <p>
          If you carry weight in excess of 10 times your Strength score, up to your maximum carrying capacity, you are instead heavily encumbered, which means your speed drops by 20 feet and you have disadvantage on ability checks, attack rolls, and saving throws that use Strength, Dexterity, or Constitution.
        </p>
      </b-tab>
      <b-tab index="3" title="Dexterity">
        <h2>Dexterity</h2>
        <p>
          Dexterity measures agility, reflexes, and balance.
        </p>
        <h4>Dexterity Checks</h4>
        <p>
          A Dexterity check can model any attempt to move nimbly, quickly, or quietly, or to keep from falling on tricky footing. The Acrobatics, Sleight of Hand, and Stealth skills reflect aptitude in certain kinds of Dexterity checks.
        </p>
        <p>
          <strong>Acrobatics.</strong> Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. The DM might also call for a Dexterity (Acrobatics) check to see if you can perform acrobatic stunts, including dives, rolls, somersaults, and flips.
        </p>
        <p>
          <strong>Sleight of Hand.</strong> Whenever you attempt an act of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person, make a Dexterity (Sleight of Hand) check. The DM might also call for a Dexterity (Sleight of Hand) check to determine whether you can lift a coin purse off another person or slip something out of another person’s pocket.
        </p>
        <p>
          <strong>Stealth.</strong> Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard.
        </p>
        <p>
          <strong>Other Dexterity Checks.</strong> The DM might call for a Dexterity check when you try to accomplish tasks like the following:
        </p>
        <ul>
          <li>Control a heavily laden cart on a steep descent</li>
          <li>Steer a chariot around a tight turn</li>
          <li>Pick a lock</li>
          <li>Disable a trap</li>
          <li>Securely tie up a prisoner</li>
          <li>Wriggle free of bonds</li>
          <li>Play a stringed instrument</li>
          <li>Craft a small or detailed object</li>
        </ul>
        <h4>Attack Rolls and  Damage</h4>
        <p>
          You add your Dexterity modifier to your attack roll and your damage roll when attacking with a ranged weapon, such as a sling or a longbow. You can also add your Dexterity modifier to your attack roll and your damage roll when attacking with a melee weapon that has the finesse property, such as a dagger or a rapier.
        </p>
        <h4>Hiding</h4>
        <p>
          When you try to hide, make a Dexterity (Stealth) check. Until you are discovered or you stop hiding, that check’s total is contested by the Wisdom (Perception) check of any creature that actively searches for signs of your presence.
        </p>
        <p>
          You can’t hide from a creature that can see you, and if you make noise (such as shouting a warning or knocking over a vase), you give away your position. An invisible creature can’t be seen, so it can always try to hide. Signs of its passage might still be noticed, however, and it still has to stay quiet.
        </p>
        <p>
          In combat, most creatures stay alert for signs of danger all around, so if you come out of hiding and approach a creature, it usually sees you. However, under certain circumstances, the Dungeon Master might allow you to stay hidden as you approach a creature that is distracted, allowing you to gain advantage on an attack before you are seen.
        </p>
        <p>
          <strong>Passive Perception.</strong> When you hide, there’s a chance someone will notice you even if they aren't searching. To determine whether such a creature notices you, the DM compares your Dexterity (Stealth) check with that creature’s passive Wisdom (Perception) score, which equals 10 + the creature’s Wisdom modifier, as well as any other bonuses or penalties. If the creature has advantage, add 5. For disadvantage, subtract 5.
        </p>
        <p>
          For example, if a 1st-level character (with a proficiency bonus of +2) has a Wisdom of 15 (a +2 modifier) and proficiency in Perception, he or she has a passive Wisdom (Perception) of 14.
        </p>
        <p>
          <strong>What Can You See?</strong> One of the main factors in determining whether you can find a hidden creature or object is how well you can see in an area, which might be lightly or heavily obscured.
        </p>
        <h4>Armor Class</h4>
        <p>
          Depending on the armor you wear, you might add some or all of your Dexterity modifier to your Armor Class.
        </p>
        <h4>Initiative</h4>
        <p>
          At the beginning of every combat, you roll initiative by making a Dexterity check. Initiative determines the order of creatures’ turns in combat.
        </p>
      </b-tab>
      <b-tab index="4" title="Constitution">
        <h2>Constitution</h2>
        <p>
          Constitution measures health, stamina, and vital force.
        </p>
        <h4>Constitution Checks</h4>
        <p>
          Constitution checks are uncommon, and no skills apply to Constitution checks, because the endurance this ability represents is largely passive rather than involving a specific effort on the part of a character or monster. A Constitution check can model your attempt to push beyond normal limits, however.
        </p>
        <p>
          The DM might call for a Constitution check when you try to accomplish tasks like the following:
        </p>
        <ul>
          <li>Hold your breath</li>
          <li>March or labor for hours without rest</li>
          <li>Go without sleep</li>
          <li>Survive without food or water</li>
          <li>Quaff an entire stein of ale in one go</li>
        </ul>
        <h4>Hit Points</h4>
        <p>
          Your Constitution modifier contributes to your hit points. Typically, you add your Constitution modifier to each Hit Die you roll for your hit points.
        </p>
        <p>
          If your Constitution modifier changes, your hit point maximum changes as well, as though you had the new modifier from 1st level. For example, if you raise your Constitution score when you reach 4th level and your Constitution modifier increases from +1 to +2, you adjust your hit point maximum as though the modifier had always been +2. So you add 3 hit points for your first three levels, and then roll your hit points for 4th level using your new modifier. Or if you’re 7th level and some effect lowers your Constitution score so as to reduce your Constitution modifier by 1, your hit point maximum is reduced by 7.
        </p>
      </b-tab>
      <b-tab index="5" title="Intelligence">
        <h2>Intelligence</h2>
        <p>
          Intelligence measures mental acuity, accuracy of recall, and the ability to reason.
        </p>
        <h4>Intelligence Checks</h4>
        <p>
          An Intelligence check comes into play when you need to draw on logic, education, memory, or deductive reasoning. The Arcana, History, Investigation, Nature, and Religion skills reflect aptitude in certain kinds of Intelligence checks.
        </p>
        <p>
          <strong>Arcana.</strong> Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.
        </p>
        <p>
          <strong>History.</strong> Your Intelligence (History) check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.
        </p>
        <p>
          <strong>Investigation.</strong> When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through ancient scrolls in search of a hidden fragment of knowledge might also call for an Intelligence (Investigation) check.
        </p>
        <p>
          <strong>Nature.</strong> Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles.
        </p>
        <p>
          <strong>Religion.</strong> Your Intelligence (Religion) check measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults.
        </p>
        <p>
          <strong>Other Intelligence Checks.</strong> The DM might call for an Intelligence check when you try to accomplish tasks like the following:
        </p>
        <ul>
          <li>Communicate with a creature without using words</li>
          <li>Estimate the value of a precious item</li>
          <li>Pull together a disguise to pass as a city guard</li>
          <li>Forge a document</li>
          <li>Recall lore about a craft or trade</li>
          <li>Win a game of skill</li>
        </ul>
        <h4>Spellcasting Ability</h4>
        <p>
          Wizards use Intelligence as their spellcasting ability, which helps determine the saving throw DCs of spells they cast.
        </p>
      </b-tab>
      <b-tab index="6" title="Wisdom">
        <h2>Wisdom</h2>
        <p>
          Wisdom reflects how attuned you are to the world around you and represents perceptiveness and intuition.
        </p>
        <h4>Wisdom Checks</h4>
        <p>
          A Wisdom check might reflect an effort to read body language, understand someone’s feelings, notice things about the environment, or care for an injured person. The Animal Handling, Insight, Medicine, Perception, and Survival skills reflect aptitude in certain kinds of Wisdom checks.
        </p>
        <p>
          <strong>Animal Handling.</strong> When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal’s intentions, the DM might call for a Wisdom (Animal Handling) check. You also make a Wisdom (Animal Handling) check to control your mount when you attempt a risky maneuver.
        </p>
        <p>
          <strong>Insight.</strong> Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as w hen searching out a lie or predicting someone’s next move. Doing so involves gleaning clues from body language, speech habits, and changes in mannerisms.
        </p>
        <p>
          <strong>Medicine.</strong> A Wisdom (Medicine) check lets you try to stabilize a dying companion or diagnose an illness.
        </p>
        <p>
          <strong>Perception.</strong> Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses.
        </p>
        <p>
          For example, you might try to hear a conversation through a closed door, eavesdrop under an open window, or hear monsters moving stealthily in the forest. Or you might try to spot things that are obscured or easy to miss, whether they are orc s lying in ambush on a road, thugs hiding in the shadows of an alley, or candlelight under a closed secret door.
        </p>
        <h5>Finding a Hidden Object</h5>
        <p>
          When your character searches for a hidden object such as a secret door or a trap, the DM typically asks you to make a Wisdom (Perception) check. Such a check can be used to find hidden details or other information and clues that you might otherwise overlook.
        </p>
        <p>
          In most cases, you need to describe where you are looking in order for the DM to determine your chance of success. For example, a key is hidden beneath a set of folded clothes in the top drawer of a bureau. If you tell the DM that you pace around the room, looking at the walls and furniture for clues, you have no chance of finding the key, regardless of your Wisdom (Perception) check result. You would have to specify that you were opening the drawers or searching the bureau in order to have any chance of success.
        </p>
        <p>
          <strong>Survival.</strong> The DM might ask you to make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that owlbears live nearby, predict the weather, or avoid quicksand and other natural hazards.
        </p>
        <p>
          <strong>Other Wisdom Checks.</strong> The DM might call for a Wisdom check when you try to accomplish tasks like the following:
        </p>
        <ul>
          <li>Get a gut feeling about what course of action to follow</li>
          <li>Discern whether a seemingly dead or living creature is undead</li>
        </ul>
        <h4>Spellcasting Ability</h4>
        <p>
          Clerics, druids, and rangers use Wisdom as their spellcasting ability, which helps determine the saving throw DCs of spells they cast.
        </p>
      </b-tab>
      <b-tab index="7" title="Charisma">
        <h2>Charisma</h2>
        <p>
          Charisma measures your ability to interact effectively with others. It includes such factors as confidence and eloquence, and it can represent a charming or commanding personality.
        </p>
        <h4>Charisma Checks</h4>
        <p>
          A Charisma check might arise when you try to influence or entertain others, when you try to make an impression or tell a convincing lie, or when you are navigating a tricky social situation. The Deception, Intimidation, Performance, and Persuasion skills reflect aptitude in certain kinds of Charisma checks.
        </p>
        <p>
          <strong>Deception.</strong> Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies. Typical situations include trying to fast-talk a guard, con a merchant, earn money through gambling, pass yourself off in a disguise, dull someone’s suspicions with false assurances, or maintain a straight face while telling a blatant lie.
        </p>
        <p>
          <strong>Intimidation.</strong> When you attempt to influence someone through overt threats, hostile actions, and physical violence, the DM might ask you to make a Charisma (Intimidation) check. Examples include trying to pry information out o f a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision.
        </p>
        <p>
          <strong>Performance.</strong> Your Charisma (Performance) check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment.
        </p>
        <p>
          <strong>Persuasion.</strong> When you attempt to influence someone or a group of people with tact, social graces, or good nature, the DM might ask you to make a Charisma (Persuasion) check. Typically, you use persuasion when acting in good faith, to foster friendships, make cordial requests, or exhibit proper etiquette. Examples of persuading others include convincing a chamberlain to let your party see the king, negotiating peace between warring tribes, or inspiring a crowd of townsfolk.
        </p>
        <p>
          <strong>Other Charisma Checks.</strong>
        </p>
        <p>
          The DM might call for a Charisma check when you try to accomplish tasks like the following:
        </p>
        <ul>
          <li>Find the best person to talk to for news, rumors, and gossip</li>
          <li>Blend into a crowd to get the sense of key topics of conversation</li>
        </ul>
        <h4>Spellcasting Ability</h4>
        <p>
          Bards, paladins, sorcerers, and w arlocks use Charisma as their spellcasting ability, which helps determine the saving throw DCs o f spells they cast.
        </p>
      </b-tab>
      <b-tab index="8" title="Saving Throws">
        <h2>Saving Throws</h2>
        <p>
          A saving throw—also called a save—represents an attempt to resist a spell, a trap, a poison, a disease, or a similar threat. You don’t normally decide to make a saving throw; you are forced to make one because your character or monster is at risk of harm.
        </p>
        <p>
          To make a saving throw, roll a d20 and add the appropriate ability modifier. For example, you use your Dexterity modifier for a Dexterity saving throw.
        </p>
        <p>
          A saving throw can be modified by a situational bonus or penalty and can be affected by advantage and disadvantage, as determined by the DM.
        </p>
        <p>
          Each class gives proficiency in at least two saving throws. The wizard, for example, is proficient in Intelligence saves. As with skill proficiencies, proficiency in a saving throw lets a character add his or her proficiency bonus to saving throws made using a particular ability score. Some monsters have saving throw proficiencies as well.
        </p>
        <p>
          The Difficulty Class for a saving throw is determined by the effect that causes it. For example, the DC for a saving throw allowed by a spell is determined by the caster’s spellcasting ability and proficiency bonus.
        </p>
        <p>
          The result of a successful or failed saving throw is also detailed in the effect that allows the save. Usually, a successful save means that a creature suffers no harm, or reduced harm, from an effect.
        </p>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script src="./js/abilities.js"></script>
<style></style>