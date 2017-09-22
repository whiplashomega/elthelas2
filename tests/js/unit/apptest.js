/* globals describe, module, inject, expect*/

describe('stateProvider configuration testing', function() {

  var $state, state, $rootScope, $injector, $templateCache;

  beforeEach(function() {    
    
    module('elthelas', function() {
      
    });

    inject(function(_$rootScope_, _$state_, _$injector_, _$templateCache_) {
      $state = _$state_;
      $rootScope = _$rootScope_;
      $injector = _$injector_;
      $templateCache = _$templateCache_;
      $templateCache.put('/html/header/header.html', '');
      $templateCache.put('/html/footer/footer.html', '');
      $templateCache.put('/html/content/home.html', '');
      $templateCache.put('/html/head/home.html', '');
      $templateCache.put('/html/head/head.html', '');
      $templateCache.put('/html/empty.html', '');
    });
  });

  it('root state url check', function() {
    state = 'app';
    expect($state.href(state, { id: 1 })).toEqual('/');
  });

  it('root state data check', function(done) {
    state = 'app';
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Home");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();    
  });

  it('races state url check', function() {
    state = 'app.races';
    expect($state.href(state, { id: 1 })).toEqual('/options/races');
  });  

  it('races state data check', function(done) {
    state = 'app.races';
    $templateCache.put('/html/content/options/races.html', '');
    $templateCache.put('/html/sidebar/options.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Races");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('race state url check', function() {
    state = 'app.race';
    expect($state.href(state, { id: 1, race: 'humans' })).toEqual('/options/races/humans');
  });  

  it('race state data check', function(done) {
    state = 'app.race';
    $templateCache.put('/html/content/options/races.html', '');
    $templateCache.put('/html/sidebar/options.html', '');
    $state.go(state, {race: 'humans'}).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Races");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });
  
  it('domains state url check', function() {
    state = 'app.domains';
    expect($state.href(state, { id: 1 })).toEqual('/options/domains');
  });  
  
  it('domains state data check', function(done) {
    state = 'app.domains';
    $templateCache.put('/html/content/options/domains.html', '');
    $templateCache.put('/html/sidebar/options.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Domains");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('languages state url check', function() {
    state = 'app.languages';
    expect($state.href(state, { id: 1 })).toEqual('/options/languages');
  });  
  
  it('languages state data check', function(done) {
    state = 'app.languages';
    $templateCache.put('/html/content/options/languages.html', '');
    $templateCache.put('/html/sidebar/options.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Languages");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('gods state url check', function() {
    state = 'app.gods';
    expect($state.href(state, { id: 1 })).toEqual('/ref/gods');
  });  
  
  it('gods state data check', function(done) {
    state = 'app.gods';
    $templateCache.put('/html/content/ref/gods.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Gods");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('god state url check', function() {
    state = 'app.god';
    expect($state.href(state, { id: 1, god: 'alohim' })).toEqual('/ref/gods/alohim');
  });  
  
  it('god state data check', function(done) {
    state = 'app.god';
    $templateCache.put('/html/content/ref/gods.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state, { god: 'alohim' }).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Gods");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('organizations state url check', function() {
    state = 'app.organizations';
    expect($state.href(state, { id: 1 })).toEqual('/ref/orgs');
  });  
  
  it('organizations state data check', function(done) {
    state = 'app.organizations';
    $templateCache.put('/html/content/ref/organizations.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Organizations");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('organization state url check', function() {
    state = 'app.organization';
    expect($state.href(state, { id: 1, org: "blackwolfirregulars" })).toEqual('/ref/orgs/blackwolfirregulars');
  });  
  
  it('organization state data check', function(done) {
    state = 'app.organization';
    $templateCache.put('/html/content/ref/organizations.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state, { org: 'blackwolfirregulars' }).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Organizations");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('calendar state url check', function() {
    state = 'app.calendar';
    expect($state.href(state, { id: 1 })).toEqual('/ref/calendar');
  });  
  
  it('calendar state data check', function(done) {
    state = 'app.calendar';
    $templateCache.put('/html/content/ref/calendar.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Calendar");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('cosmology state url check', function() {
    state = 'app.cosmology';
    expect($state.href(state, { id: 1 })).toEqual('/ref/cosmology');
  });  
  
  it('cosmology state data check', function(done) {
    state = 'app.cosmology';
    $templateCache.put('/html/content/ref/cosmology.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Cosmology");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('astronomy state url check', function() {
    state = 'app.astronomy';
    expect($state.href(state, { id: 1 })).toEqual('/ref/astronomy');
  });  
  
  it('astronomy state data check', function(done) {
    state = 'app.astronomy';
    $templateCache.put('/html/content/ref/astronomy.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Astronomy");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('magic state url check', function() {
    state = 'app.magic';
    expect($state.href(state, { id: 1 })).toEqual('/ref/magic');
  });  
  
  it('magic state data check', function(done) {
    state = 'app.magic';
    $templateCache.put('/html/content/ref/magic.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Magic");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('divines state url check', function() {
    state = 'app.divines';
    expect($state.href(state, { id: 1 })).toEqual('/ref/divines');
  });  
  
  it('divines state data check', function(done) {
    state = 'app.divines';
    $templateCache.put('/html/content/ref/divines.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Divines");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('quick reference state url check', function() {
    state = 'app.quickref';
    expect($state.href(state, { id: 1 })).toEqual('/ref/quick');
  });
  
  it('quick reference state data check', function(done) {
    state = 'app.quickref';
    $templateCache.put('/html/content/ref/quick.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Quick Reference Manual");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('history state url check', function() {
    state = 'app.history';
    expect($state.href(state, { id: 1 })).toEqual('/history');
  });
  
  it('history state data check', function(done) {
    state = 'app.history';
    $templateCache.put('/html/content/history.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("History");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('history event state url check', function() {
    state = 'app.historyevent';
    expect($state.href(state, { id: 1, eventname: 'aridhemfallstoorcishassault' })).toEqual('/history/aridhemfallstoorcishassault');
  });
  
  it('history event state data check', function(done) {
    state = 'app.historyevent';
    $templateCache.put('/html/content/history.html', '');
    $state.go(state, {eventname: 'aridhemfallstoorcishassault'}).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("History");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });  

  it('classes state url check', function() {
    state = 'app.classes';
    expect($state.href(state, { id: 1 })).toEqual('/options/class');
  });
  
  it('classes state data check', function(done) {
    state = 'app.classes';
    $templateCache.put('/html/content/options/classes.html', '');
    $templateCache.put('/html/sidebar/options.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Classes");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('geo state url check', function() {
    state = 'app.geo';
    expect($state.href(state, { id: 1 })).toEqual('/geo');
  });
  
  it('geo state data check', function(done) {
    state = 'app.geo';
    $templateCache.put('/html/content/geo.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Geography");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });
  
  it('geoitem state url check', function() {
    state = 'app.geoitem';
    expect($state.href(state, { id: 1, type: 'landmark', location: 'curestan' })).toEqual('/geo/landmark/curestan');
  });
  
  it('geoitem state data check', function(done) {
    state = 'app.geoitem';
    $templateCache.put('/html/content/geo.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Geography");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('about state url check', function() {
    state = 'app.about';
    expect($state.href(state, { id: 1 })).toEqual('/about');
  });
  
  it('about state data check', function(done) {
    state = 'app.about';
    $templateCache.put('/html/content/about.html', '');
    $templateCache.put('/html/sidebar/about.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("About the Author");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('book1 state url check', function() {
    state = 'app.book1';
    expect($state.href(state, { id: 1 })).toEqual('/campaigns/book1');
  });
  
  it('book1 state data check', function(done) {
    state = 'app.book1';
    $templateCache.put('/html/content/campaigns/book1.html', '');
    $templateCache.put('/html/sidebar/campaign.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe('Epic of Elthelas Book 1: The Crystal of Light');
      expect(current.data.auth).toBe(true);
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('book4 state url check', function() {
    state = 'app.book4';
    expect($state.href(state, { id: 1 })).toEqual('/campaigns/book4');
  });
  
  it('book4 state data check', function(done) {
    state = 'app.book4';
    $templateCache.put('/html/content/campaigns/book4.html', '');
    $templateCache.put('/html/sidebar/campaign.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe('Epic of Elthelas Book 4: Desperate Measures');
      expect(current.data.auth).toBe(true);
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('book 4 players guide state url check', function() {
    state = 'app.book4playersguide';
    expect($state.href(state, { id: 1 })).toEqual('/campaigns/book4/playersguide');
  });
  
  it('book 4 players guide state data check', function(done) {
    state = 'app.book4playersguide';
    $templateCache.put('/html/content/campaigns/book4playersguide.html', '');
    $templateCache.put('/html/sidebar/options.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Epic of Elthelas Book 4: Desparate Measures - Players Guide");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('backgrounds state url check', function() {
    state = 'app.backgrounds';
    expect($state.href(state, { id: 1 })).toEqual('/options/backgrounds');
  });
  
  it('backgrounds state data check', function(done) {
    state = 'app.backgrounds';
    $templateCache.put('/html/content/options/backgrounds.html', '');
    $templateCache.put('/html/sidebar/options.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Backgrounds");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('bestiary state url check', function() {
    state = 'app.bestiary';
    expect($state.href(state, { id: 1 })).toEqual('/ref/beasts');
  });
  
  it('bestiary state data check', function(done) {
    state = 'app.bestiary';
    $templateCache.put('/html/content/ref/bestiary.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Bestiary");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });

  it('character builder state url check', function() {
    state = 'app.charbuilder';
    expect($state.href(state, { id: 1 })).toEqual('/campaign/charbuilder');
  });
  
  it('character builder state data check', function(done) {
    state = 'app.charbuilder';
    $templateCache.put('/html/content/tools/characterbuilder.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Character Builder");
      expect(current.data.metadescription).toBeDefined();
      expect(current.data.metakeywords).toBeDefined();
      expect(current.data.metadescription.length > 0).toBe(true);
      expect(current.data.metakeywords.length > 0).toBe(true);
      done();
    });
    $rootScope.$digest();
  });
  
  it('has unique metadata for every state', function() {
    var states = $state.get();
    //console.log(states);
    var descriptions = [];
    var keywords = [];
    for(var x = 0; x < states.length; x++) {
      if(states[x].name !== '') {
        for(var y = 0; y < descriptions.length; y++) {
          expect(states[x].data.metadescription).not.toBe(descriptions[y]);
        }
        descriptions.push(states[x].data.metadescription);
        for(var z = 0; z < keywords.length; z++) {
          expect(states[x].data.metakeywords).not.toBe(keywords[z]);
        }
        keywords.push(states[x].data.metakeywords)
      }
    }
  });
  
});