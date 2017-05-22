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
      $templateCache.put('/html/empty.html', '');
    });
  });

  it('root state url check', function() {
    state = 'app';
    expect($state.href(state, { id: 1 })).toEqual('/');
  });

  it('races state url check', function() {
    state = 'app.races';
    expect($state.href(state, { id: 1 })).toEqual('/options/races');
  });  
  
  it('divines state data check', function(done) {
    state = 'app.races';
    $templateCache.put('/html/content/options/races.html', '');
    $templateCache.put('/html/head/options/races.html', '');
    $templateCache.put('/html/sidebar/options.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Races");
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
    $templateCache.put('/html/head/options/domains.html', '');
    $templateCache.put('/html/sidebar/options.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Domains");
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
    $templateCache.put('/html/head/options/languages.html', '');
    $templateCache.put('/html/sidebar/options.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Languages");
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
    $templateCache.put('/html/head/ref/gods.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Gods");
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
    $templateCache.put('/html/head/ref/organizations.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Organizations");
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
    $templateCache.put('/html/head/ref/calendar.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Calendar");
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
    $templateCache.put('/html/head/ref/cosmology.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Cosmology");
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
    $templateCache.put('/html/head/ref/astronomy.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Astronomy");
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
    $templateCache.put('/html/head/ref/magic.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Magic");
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
    $templateCache.put('/html/head/ref/divines.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Divines");
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
    $templateCache.put('/html/head/ref/quick.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Quick Reference Manual");
      done();
    });
    $rootScope.$digest();
  });
  
  it('organizations state data check', function(done) {
    state = 'app.organizations';
    $templateCache.put('/html/content/ref/organizations.html', '');
    $templateCache.put('/html/head/ref/organizations.html', '');
    $templateCache.put('/html/sidebar/ref.html', '');
    $state.go(state).then(function(current) {
      expect(current.name).toBe(state);
      expect(current.data.title).toBe("Organizations");
      done();
    });
    $rootScope.$digest();
  });
});