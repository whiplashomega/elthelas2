/* global describe */
/* global it */
/* global inject */
/* global expect */
/* global spyOn*/


describe('Race Controller Tests', function() {
  var service, $q, deferred, $scope, controller;
  var resolveObject = { data: { documents: [
    {
    id: "tieflings",
    name: "Tieflings",
    description: "\n\nTieflings are the descendents of humans that have mated with demons or devils, they bear the mark of this touch in their appearance and nature. They often bear demonic traits, such as horns, forked tails or tongue, or reddish skin or eyes. They also tend towards evil more than the average person, and although this is far from a given, it is common enough that the distrust that follows them everywhere is justified.\n\nTieflings are not quite as rare as Aasimar (given demons' proclivity for lust), although they are still rare enough to cause a stir in any town they show up in, especially given their heritage. Tieflings are more common in the west, where demons, and demon attacks, are also more common. Tieflings of a good or neutral persuasion can usually find shelter in Dera'Dragorim or Zelfir, the second as a service to Amathera as a pity of their natural plight, and the first in recognition of a shared victimization at the hands of aggressive demon invaders.\n\n",
    traits: [
      "Ability Score Increase: Your intelligence score increases by 1 and your charisma score increases by 2.",
      "Size: Tieflings have about the same size and build as humans. Your size is medium.",
      "Speed: Your base walking speed is 30 feet.",
      "Darkvision: 60 ft.",
      "Hellish Resistance: You have resistance to fire damage.",
      "Infernal Legacy: You know the thaumatergy cantrip. Once you reach 3rd level, you can cast the hellish rebuke spell once per day as a 2nd-level spell. Once you reach 5th level you can cast the darkness spell once per day. Charisma is your spellcasting ability for these spells."
    ],
    agepoints: {
      "puberty": 8,
      "sexualmaturity": 10,
      "mentalmaturity": 15,
      "middleage": 25,
      "oldage": 35,
      "averagelifespan": 50,
      "maxage": 65
    },
    subraces: [
      {
        "id": "default",
        "name": "",
        "image": "/images/races/tiefling.jpg",
        "description": "",
        "traits": [
        
        ],
        "averageheight": 66,
        "baseheight": 57,
        "heightroll": "2d8",
        "averageweight": 155,
        "baseweight": 110,
        "weightroll": "2d4"
      }  
    ]
  }, { id: "humans"},
  {
  id: "gnomes",
  name: "Gnomes",
  description: "The gnomes are a small, hardy folk, usually around 3 feet tall, but broad of shoulder with large featured faces (particularly their noses). Unlike halflings, who look like miniature humans with hairy feet, gnomes bodies are thicker and more dominated by the torso (although not to the extent of dwarves). The gnomes of Elthelas are split people. The eastern, Elathian Gnomes live in small reclusive communes within the cities of others, primarily the humans of Dormania, Kandor, and Gerasalim. Once they had a nation of their own, but it was destroyed and burned to the ground by the Emperor Dorman I, all record of it purged from history in the following years. Meanwhile in the west the gnomes of Stagenheim have become masters of technology.",
  traits: [
    "Size: Gnomes range between 3 and 4 feet tall, and weight between 60 and 80 lbs. Your size is Small.",
    "Speed: Your base walking speed is 25 ft.",
    "Darkvision: 60 feet.",
    "Gnome Cunning: You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic."
  ],
  agepoints: {
    "puberty": 10,
    "sexualmaturity": 13,
    "mentalmaturity": 20,
    "middleage": 35,
    "oldage": 50,
    "averagelifespan": 65,
    "maxage": 80
  },
  subraces: [
    {
      "id": "elathiangnomes",
      "name": "Elathian Gnomes",
      "image": "/images/races/elathiangnome.jpg",
      "description": "The imperial gnomes are natural tricksters and illusionists, adept at surviving as the bottom rung of society. They tend to prefer city life and the excitement it brings over the quiet countryside. Adventuring is a common way that they find excitement, especially when they are relatively young. Once they do settle down they tend to have large families and live in communal groups of several large extended families.",
      "traits": [
        "Ability Score Increase: Your intelligence score increases by 2 and your dexterity score increases by 1.",
        "Natural Illusionist: You know the minor illusion cantrip. Intelligence is your magic ability for it.",
        "Speak with Small Beasts: Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts."
      ],
      "averageheight": 40,
      "baseheight": 35,
      "heightroll": "2d4",
      "averageweight": 55,
      "baseweight": 40,
      "weightroll": "1d6"
    },
    {
      "id": "stagengnomes",
      "name": "Stagen Gnomes",
      "image": "/images/races/stagengnome.jpg",
      "description": "The Gnomes of Stagenheim have a long recorded history, but most of it is esoteric to outsiders, and they have few interactions the other nations beyond the defense of their borders. Not that others are typically interested in their mountain home. The Stagen people are lovers of technology above all else, and more-so, they are creators of technology and magical items without peer. The designs for their fabled airships are jealously guarded, as is the design and construction of their magical crystals, immune to anti-magic effects, and with limitless charges. Those outsiders who know of them often claim that the crystals are the result of the gnomes directly tapping the power of Gods, but such rumors are probably unfounded.",
      "traits": [
        "Artificer's Lore: You have advantage on Intelligence checks related to alchemy, magic items, and technological devices.",
        "Tinker: You have artisan's tools. Using those tools, you can spend 10 minutes to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours. You can have up to three such devices active at a time. When you create a device, choose one of the following options:\n*   Clockwork Toy: This toy is a clockwork animal or person, such as a frog, mouse, bird, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noise as appropriate to the creature it represents.\n*   Fire Starter: The device produces a miniature flame, which you can use to light something like a candle, torch, or campfire. Using the device requires your action.\n*   Music Box: When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song's end or when it is closed.",
        "Artificer's proficiency: You are proficient with one type of tools of your choice."
      ],
      "averageheight": 36,
      "baseheight": 31,
      "heightroll": "2d4",
      "averageweight": 60,
      "baseweight": 45,
      "weightroll": "1d6"
    }
  ]
}]}};
  beforeEach(module('elthelas'));
  
  beforeEach(inject(function($controller, _$q_, _$rootScope_, raceProvider) {
    $q = _$q_;
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();
    service = raceProvider;
    
    spyOn(raceProvider, 'getRaces').and.returnValue(deferred.promise);
    
    controller = $controller('RaceController', {
      $scope: $scope,
      raceProvider: raceProvider
    });
  }));
  
  it('factory function should be defined', function() {
    expect(service.getRaces()).toBeDefined();
  });
  
  it('factory function should resolve a promise', function() {
    
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    expect($scope.races).toBeDefined();
    
  });
  
  it('factory function should give us a race array in $scope.races', function() {
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    expect($scope.races.filter).toBeDefined();    
  });
  
  it('factory function should give us a race object with the correct id after calling loadRace', function() {
    
    expect($scope.currentRace).toBe(false);
    
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    $scope.loadRace('tieflings');
    
    expect($scope.currentRace.id).toBe('tieflings');
    
  });
  
  it('should give an error message when we try to load a race that does not exist', function() {
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    $scope.loadRace('fakeRace');
    
    expect($scope.currentRace.id).toBe('error');
  });
  
  it('should be able to create an age array', function() {
    
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    $scope.loadRace('tieflings');
    var row = $scope.formatAgeDataRow($scope.currentRace);
    //it should be an array
    expect(row.filter).toBeDefined();
    //it should have 8 elements
    expect(row.length).toEqual(8);
    expect(row[0]).toEqual('Tieflings');
  });
  
  it('should give us a default age array if we send it a badly formatted race', function() {
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    $scope.loadRace('humans');
    var row = $scope.formatAgeDataRow($scope.currentRace);
    
    //make sure we are getting back an array by looking for an array method
    expect(row.filter).toBeDefined();
    expect(row.length).toEqual(8);
    //since no name is defined we should get Error in column 0
    expect(row[0]).toEqual("Error");
    
    $scope.loadRace('fakeRace');
    row = $scope.formatAgeDataRow($scope.currentRace);
    expect(row.filter).toBeDefined();
    expect(row.length).toEqual(8);
    expect(row[0]).toEqual("");
  });
  
  it('should give us an array of age arrays', function() {
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    var ageData = $scope.getAllAgeData();
    
    //we should have 1 item for every race we have
    expect(ageData.length).toEqual(3);
    
    expect(ageData.filter).toBeDefined();
    expect(ageData[0].length).toEqual(8);
    expect(ageData[0].filter).toBeDefined();
    
    expect(ageData[1].length).toEqual(8);
    expect(ageData[1].filter).toBeDefined();
  });
  
  it('should give us a height/weight array', function() {
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    $scope.loadRace('tieflings');
    var sizeData = $scope.formatSizeDataRow($scope.currentRace);
    
    //it should give us an array
    expect(sizeData.filter).toBeDefined();
    //that array should have 7 entries
    expect(sizeData.length).toEqual(7);
    //first column should be the common name of the race
  });
  
  it('should give us height in feet and inches and weight in lbs', function() {
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    $scope.loadRace('tieflings');
    var sizeData = $scope.formatSizeDataRow($scope.currentRace);
    
    expect(sizeData[1]).toBe("5\'6\"");
    expect(sizeData[2]).toBe("4\'9\"");
    expect(sizeData[4]).toBe("155 lbs");
    expect(sizeData[5]).toBe("110 lbs");
  });
  
  it('should give us the name of the race when there is no subrace or only subrace is default', function() {
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    $scope.loadRace('tieflings');
    
    var sizeData = $scope.formatSizeDataRow($scope.currentRace);
    
    expect(sizeData[0]).toBe("Tieflings");
  });
  
  it('should give us a default array when passed a badly formatted race', function() {
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    $scope.loadRace('humans');
    
    var sizeData = $scope.formatSizeDataRow($scope.currentRace);
    //it should give us an array
    expect(sizeData.filter).toBeDefined();
    //that array should have 7 entries
    expect(sizeData.length).toEqual(7);    
    expect(sizeData[0]).toBe("Error");
  });
  
  it('should give us the subrace name when there is a subrace to pass', function() {
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    $scope.loadRace('gnomes');
    
    var sizeData = $scope.formatSizeDataRow($scope.currentRace, 'elathiangnomes');
    
    //it should give us an array
    expect(sizeData.filter).toBeDefined();
    //that array should have 7 entries
    expect(sizeData.length).toEqual(7);    
    expect(sizeData[0]).toBe("Elathian Gnomes");    
  });
  
  it('should give us an array of size arrays', function() {
    deferred.resolve(resolveObject);
    
    $scope.$apply();
    
    var sizeData = $scope.getAllSizeData();
    expect(sizeData.filter).toBeDefined();
    expect(sizeData.length).toEqual(4);
    expect(sizeData[0].filter).toBeDefined();
    expect(sizeData[0].length).toEqual(7);
  });
});