exports.config = {
    framework: "jasmine2",
    allScriptsTimeout: 30000,
    includeStackTrace: true,
    getPageTimeout: 30000,
    //seleniumServerJar: 'D:/Projects/FinalProject/node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 120000
    },
  //  specs: ['d:/Projects/FinalProject/e2e/tests/*.spec.js'],
    onPrepare: function () {
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            filePrefix: 'xmloutput',
            savePath: 'dist/e2e'
        }));
    }
};
