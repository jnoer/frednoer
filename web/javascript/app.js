var appModule = angular.module('frednoer', ['ngRoute']);


appModule.constant('INFO', {phone: '262-661-4538', email: 'fred@frednoer.com'});

appModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/writing-editing', {
            templateUrl: 'writing-editing.html',
            controller : 'genericCtrl'
        })
        .when('/writing', {
            templateUrl: 'writing.html',
            controller : 'genericCtrl'
        })
        .when('/editing', {
            templateUrl: 'editing.html',
            controller : 'genericCtrl'
        })
        .when('/commissions', {
            templateUrl: 'commissions.html',
            controller : 'genericCtrl'
        })
        .when('/licensing', {
            templateUrl: 'licensing.html',
            controller : 'genericCtrl'
        })
        .when('/about', {
            templateUrl: 'about.html'
        })
        .when('/contact', {
            templateUrl: 'contact.html',
            controller : 'genericCtrl'
        })
        .when('/copyright', {
            templateUrl: 'copyright.html',
            controller : 'genericCtrl'
        })
        .when('/ordering', {
            templateUrl: 'ordering.html',
            controller : 'genericCtrl'
        })
        .when('/writing/brochures', {
            templateUrl: 'brochures.html'
        })
        .when('/writing/company-profiles', {
            templateUrl: 'company-profiles.html'
        })
        .when('/copyediting', {
            templateUrl: 'copyediting.html',
            controller : 'genericCtrl'
        })
        .when('/proofreading', {
            templateUrl: 'proofreading.html',
            controller : 'genericCtrl'
        })
        .when('/drag-racing', {
            templateUrl: 'drag-racing.html'
        })
        .when('/sample-drag-racing', {
            templateUrl: 'sample-drag-racing.html'
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
            templateUrl: 'photography.html',
            controller: 'genericCtrl'
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

appModule.service('photosService', ['$http', '$q', function($http, $q) {
    var photos = [];

    this.getPhotos = function() {
        var resultDeferred = $q.defer();
        var resultPromise = resultDeferred.promise;

        if (photos.length === 0) {
            var httpPromise = $http.get('photos.json');
            httpPromise.then(
                function gotData(data) {
                    photos = data.data;
                    resultDeferred.resolve(photos);
                });
        }
        else {
            resultDeferred.resolve(photos);
        }

        return resultPromise;
    };
}]);


appModule.controller('mainController', ['$scope', '$location', function ($scope, $location) {
    $scope.location = $location;
}]);

appModule.controller('galleriesCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('galleries.json').success(function(data) {
       $scope.galleries = data;
    });
}]);

appModule.controller('galleryCtrl', ['$scope', '$routeParams', 'photosService', function ($scope, $routeParams, photosService) {
    $scope.galleryName = $routeParams.galleryName;

    $scope.getThumb = function(photo) {
        return photo.filename.replace('.JPG', '_thumb.JPG');
    };

    photosService.getPhotos().then(function(photos) {
        $scope.photos = photos.filter(function(item){
            return item.gallery === $routeParams.galleryName;
        });
    });
}]);

appModule.controller('photoCtrl', ['$scope', '$routeParams', 'photosService', function ($scope, $routeParams, photosService) {
    photosService.getPhotos().then(function(photos) {
        $scope.photo = photos.filter(function(item) {
            return item.filename === $routeParams.filename;
        })[0];
    });
}]);

appModule.controller('genericCtrl', ['$scope', 'INFO', function ($scope, INFO) {
    $scope.info = INFO;
}]);


