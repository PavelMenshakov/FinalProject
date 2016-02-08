"use strict";

describe('revers check:', function() {

    it('open chart', function (done) {
        browser.get('http://localhost:3000/#/login');
        expect(element(by.css('.container')).isDisplayed()).toBe(true);
        done();
    });
});