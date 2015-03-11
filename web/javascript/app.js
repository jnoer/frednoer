var appModule = angular.module('frednoer', ['ngRoute']);


appModule.constant('PHONE', '262-661-4538');

appModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/writing-editing', {
            templateUrl: 'writing-editing.html'
        })
        .when('/writing', {
            templateUrl: 'writing.html' //,
            //controller: 'ListCtrl',
            //resolve: {  // Inject this dependency into the controller.
            //    items: function (itemDao) {
            //        return itemDao.getAll();
            //    }
            //}
        })
        .when('/writing/brochures', {
            templateUrl: 'brochures.html'
        })
        .when('/writing/company-profiles', {
            templateUrl: 'company-profiles.html'
        })
        .when('/writing/feature-articles', {
            templateUrl: 'feature-articles.html'
        })
        .when('/writing/news-articles', {
            templateUrl: 'news-articles.html'
        })
        .when('/writing/news-releases', {
            templateUrl: 'news-releases.html'
        })
        .when('/photography', {
            templateUrl: 'photography.html'
        })
        .when('/galleries', {
            templateUrl: 'galleries.html'
        });
    //.otherwise({
    //    redirectTo: '/'
    //});
}]);

appModule.controller('mainController', ['$scope', '$location', function ($scope, $location) {
    $scope.location = $location;
}]);
