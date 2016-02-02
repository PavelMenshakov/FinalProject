"use strict";

ajsApp.$module.config([ "$provide", function( $provide )
{
    $provide.decorator( '$log', [ "$delegate", function( $delegate ) {
        var logFn = $delegate.log;

        $delegate.log = function (str, requestTime) {
            var message = Date() + ' : ' + str + ' - ' + requestTime + ' ms';
            logFn.apply(null, [message]);
        };

        return $delegate;
    }]);
}]).factory('requestLogger',['$q','$log', function($q, $log) {
    return {
        'request': function(config) {
            config.requestDate = Date.now();
            return config;
        },


        // optional method
        'response': function(response) {
            $log.log("time for request", Date.now() - response.config.requestDate);
            return response;
        }
    };
}]).config(['$translateProvider','$httpProvider', function ($translateProvider,$httpProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'lang/lang_',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitize');

    $httpProvider.interceptors.push('requestLogger');
}]);