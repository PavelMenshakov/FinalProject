var EC = protractor.ExpectedConditions;

describe('revers check:', function() {

    it('get', function(done){
        browser.get('http://localhost:3000/#/home');
        browser.wait(EC.visibilityOf(element(by.css('[go-to-login]'))), browser.allScriptsTimeout);

        done();
    });

    it('open chart', function (done) {

        expect(element(by.css('[go-to-login]')).getText()).toBe('here!');

        done();
    });
});