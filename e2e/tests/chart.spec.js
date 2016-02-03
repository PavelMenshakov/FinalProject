describe('revers check:', function() {

    it('open chart', function (done) {
        browser.get('http://localhost:3000/#/chart');
        expect(element(by.css('.chart')).isDisplayed()).toBe(true);
        done();
    });
});