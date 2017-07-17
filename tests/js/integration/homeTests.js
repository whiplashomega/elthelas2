/* globals require, describe, it, expect */

const Browser = require('zombie');
Browser.localhost("elthelas.com", 8080);

describe("home page tests", function() {
    const browser = new Browser();
    
    it("should have defined headless browser", function(next){
        expect(typeof browser !== "undefined").toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("should visit the site and see the login form", function(next) {
        browser.visit("/", function() {
            expect(browser.success).toBe(true);
            expect(browser.query("title")).toBeDefined();
            next();
        });
    });
    
    it("should be on the home page", function(next) {
        expect(browser.text("title")).toBe("Elthelas Campaign Setting");
        expect(browser.query(".sidenav")).toBe(null);
        expect(browser.query(".header")).toBeDefined();
        next();
    });
    
    it("should follow a route", function(next) {
        browser.clickLink("Calendar", function(){
           expect(browser.text("title")).toBe("Elthelas Campaign Setting - Calendar");
           expect(browser.query(".sidenav")).toBeDefined();
           next();
        });
    });
    
    it('should be able to see the search bar', function(next) {
       expect(browser.query('#gsc-i-id1')).toBeDefined();
       next();
    });
    
    it('DataTables should be working', function(next) {
      browser.clickLink("Languages", function() {
        expect(browser.query("#DataTables_Table_0")).toBeDefined();
        //console.log(browser.query("#DataTables_Table_0"));
        next();
      });
    });
});