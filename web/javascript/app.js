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
            templateUrl: 'galleries.html',
            controller: 'galleriesCtrl'
        })
        .when('/gallery/:galleryName', {
            templateUrl: 'gallery.html',
            controller: 'galleryCtrl'
        })
        .when('/photo/:filename', {
            templateUrl: 'photo.html',
            controller: 'photoCtrl'
        });
    //.otherwise({
    //    redirectTo: '/'
    //});
}]);

appModule.controller('mainController', ['$scope', '$location', function ($scope, $location) {
    $scope.location = $location;
}]);

//appModule.controller('galleriesCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {
appModule.controller('galleriesCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('galleries.json').success(function(data) {
       $scope.galleries = data;
    });
}]);

appModule.controller('galleryCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.galleryName = $routeParams.galleryName;

    $scope.getThumb = function(photo) {
        return photo.filename.replace('.JPG', '_thumb.JPG');
    };

    $http.get('photos.json').success(function(data) {
        $scope.photos = data.filter(function(item){
            return item.gallery === $routeParams.galleryName;
        });
    });
}]);

appModule.controller('photoCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    //console.log('route: ' + $routeParams.filename);

    $http.get('photos.json').success(function(data) {
        $scope.photo = data.filter(function(item) {
            //console.log(item.filename);
            return item.filename === $routeParams.filename;
        })[0];
    });

    console.log($scope.photo);

    //$scope.photo = $routeParams.fileName;
}]);


