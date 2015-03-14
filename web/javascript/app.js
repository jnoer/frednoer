var appModule = angular.module('frednoer', ['ngRoute']);

appModule.constant('INFO', {
    phone: '262-661-4538',
    email: 'fred@frednoer.com',
    date: new Date(),
    address: 'Box 334, Burlington, WI 53105-0334'
});

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
            controller : 'contactCtrl'
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
        .when('/gallery/:gallery/photo/:filename', {
            templateUrl: 'photo.html',
            controller: 'photoCtrl'
        })
        .otherwise({
            templateUrl: 'writing-editing.html',
            controller : 'genericCtrl'
        });
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
    var photos = [];
    var photosSize = 0;
    var currentIndex;

    $scope.gallery = $routeParams.gallery;

    photosService.getPhotos().then(function(data) {
        photos = getPhotosForGallery(data);
        photosSize = photos.length;
        $scope.photo = photos[getPhotoForFilename($routeParams.filename)];
    });

    $scope.nextPhoto = function() {
        if(currentIndex < photosSize - 1) {
            return photos[currentIndex + 1].filename;
        }

        return'';
    };

    $scope.previousPhoto = function() {
        if(currentIndex > 0) {
            return photos[currentIndex - 1].filename;
        }

        return'';
    };

    $scope.getDate = function(photo) {
        if(photo.dateTaken) {
            return new Date(photo.dateTaken);
        }

        return '';
    };

    getPhotoForFilename = function(filename) {
        for(var i = 0; i < photosSize; i++) {
            if(photos[i].filename === filename) {
                currentIndex = i;
                return currentIndex;
            }
        }
    };

    getPhotosForGallery = function(data) {
        var photos = [];

        for(var i = 0; i < data.length; i++) {
            if(data[i].gallery === $routeParams.gallery) {
                photos.push(data[i]);
            }
        }

        return photos;
    };
}]);

appModule.controller('genericCtrl', ['$scope', 'INFO', function ($scope, INFO) {
    $scope.info = INFO;
}]);

appModule.controller('contactCtrl', ['$scope', 'INFO', function ($scope, INFO) {
    $scope.info = INFO;

    $scope.sendEmail = function(email) {

    };
}]);

appModule.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.showMission = function() {
        return $location.path().endsWith('writing-editing') ||
            $location.path().endsWith('photography') ||
            $location.path().endsWith('about')
    };

    $scope.isCurrentPath = function(path) {
        return $location.path().endsWith(path);
    };

    $scope.isWritingEditingPath = function() {
        return $location.path().endsWith('/writing-editing') ||
            $location.path().endsWith('/writing') ||
            $location.path().endsWith('/editing') ||
            $location.path().endsWith('/copyediting') ||
            $location.path().endsWith('/proofreading') ||
            $location.path().endsWith('/drag-racing')
    };

    $scope.isPhotographyPath = function() {
        return $location.path().endsWith('/photography') ||
            $location.path().endsWith('/galleries') ||
            $location.path().endsWith('/ordering') ||
            $location.path().endsWith('/commissions') ||
            $location.path().endsWith('/licensing') ||
            $location.path().indexOf('/gallery/') > -1 ||
            $location.path().indexOf('/photo/') > -1
    };

    $scope.isGalleryPath = function() {
        return $location.path().endsWith('/galleries') ||
            $location.path().indexOf('/gallery/') > -1 ||
            $location.path().indexOf('/photo/') > -1
    };
}]);



