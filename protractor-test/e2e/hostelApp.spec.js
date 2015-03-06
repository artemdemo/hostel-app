/*global describe, it, element, by, expect*/

describe('Home Page', function(){

    
    it('should have title - ionicCity Hostel', function(){
        var mainTitle = element(by.tagName('h1'));
        expect(mainTitle.getText()).toContain('City Hostel');
    });
    
    it('should navigate to the /service page when clicking', function() {
        element(by.css('.home-menu li:nth-child(1) a')).click();
        expect(browser.getCurrentUrl()).toMatch(/\/service/);
        browser.setLocation('/');
    });
    
    it('should navigate to the /rooms page when clicking', function() {
        element(by.css('.home-menu li:nth-child(2) a')).click();
        expect(browser.getCurrentUrl()).toMatch(/\/rooms/);
        browser.setLocation('/');
    });
    
    it('should navigate to the /contact page when clicking', function() {
        element(by.css('.home-menu li:nth-child(3) a')).click();
        expect(browser.getCurrentUrl()).toMatch(/\/contact/);
        browser.setLocation('/');
    });
});