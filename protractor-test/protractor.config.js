/*global exports, browser*/
exports.config = {
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            // More about chrome options you can find here: 
            // https://sites.google.com/a/chromium.org/chromedriver/capabilities
            'mobileEmulation': {
                'deviceName': 'Apple iPhone 5'
            }
        }
    },
    specs: [
        'e2e/hostelApp.spec.js'
    ],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
    },
    allScriptsTimeout: 20000,
    baseUrl: 'http://localhost:8100/',
    onPrepare: function(){
        browser.driver.get('http://localhost:8100');
    }
};