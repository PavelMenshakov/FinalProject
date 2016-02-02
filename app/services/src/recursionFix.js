var rn = namespace('ajsApp.services.recursion');
rn.$module = angular.module('ajsApp.services.recursion',[
]).service('TreeRecursionFix', [
    '$compile',
    function($compile) {
    return {
        compile: function (element, link) {

            link = {post: link};

            var childDirectives = element.contents().remove();

            var compiledDirectives;

            return {

                post: function (scope, element) {
                    var childRecovery = function (child) {
                        element.append(child);
                    };

                    if (!compiledDirectives) {
                        compiledDirectives = $compile(childDirectives);
                    }

                    compiledDirectives(scope, childRecovery);

                    if (link && link.post) {
                        link.post.apply(null, arguments);
                    }
                }
            };
        }
    };
}]);