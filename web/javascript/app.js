String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var appModule = angular.module('frednoer', ['ngRoute', 'ngCookies']);

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
            controller : 'generalCtrl'
        })
        .when('/about', {
            templateUrl: 'about.html'
        })
        .when('/contact', {
            templateUrl: 'contact.html',
            controller : 'generalCtrl'
        })
        .when('/copyright', {
            templateUrl: 'copyright.html',
            controller : 'generalCtrl'
        })
        .when('/photography', {
            templateUrl: 'photography.html',
            controller: 'generalCtrl'
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
            controller : 'generalCtrl'
        });
}]);

appModule.service('photosService', ['$http', '$q', function($http) {
    this.getPhotos = function() {
        return $http.get('data/photos.json', {cache: true})
    };
}]);

appModule.service('galleriesService', ['$http', '$q', function($http) {
    this.getGalleries = function() {
        return $http.get('data/galleries.json', {cache: true});
    }
}]);

appModule.controller('mainController', ['$scope', '$location', '$cookies', function ($scope, $location, $cookies) {
    $scope.location = $location;
    var secret='launch';
    $scope.loggedIn = false;
    $scope.passwordFailed = false;

    checkLogin = function() {
        return !!$cookies.get('drag-racing')
    };

    $scope.submit = function() {
        if(this.password === secret) {
            $scope.loggedIn = true;
            $scope.passwordFailed = false;
            $cookies.put('drag-racing', 'ok')
        }
        else {
            $scope.passwordFailed = true;
            $scope.password='';
        }
    } ;

    $scope.loggedIn = checkLogin();

    $scope.isDragRacingPath = function() {
        return $location.path().includes('/drag-racing') || $location.path().includes('article') || $location.path().includes('super-stock');
    };
}]);

appModule.controller('galleriesCtrl', ['$scope', 'galleriesService', function ($scope, galleriesService) {
    galleriesService.getGalleries().then(function(galleries){
        $scope.galleries = galleries.data;
    });
}]);

appModule.controller('galleryCtrl', ['$scope', '$routeParams', 'photosService', function ($scope, $routeParams, photosService) {
    $scope.galleryName = $routeParams.galleryName;
    $scope.photoMap = [];

    $scope.getThumb = function(photo) {
        return photo ? photo.filename.replace('.JPG', '_thumb.JPG') : undefined;
    };

    photosService.getPhotos().then(function(photos) {
        $scope.photos = photos.data.filter(function(item){
            return item.gallery === $routeParams.galleryName;
        });
    });
}]);

appModule.controller('photoCtrl', ['$scope', '$routeParams', 'photosService', function ($scope, $routeParams, photosService) {
    var photos = [];
    var photosSize = 0;
    var currentIndex;

    $scope.gallery = $routeParams.gallery;

    photosService.getPhotos().then(function(photos) {
        photos = getPhotosForGallery(photos.data);
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

appModule.controller('generalCtrl', ['$scope', 'INFO', function ($scope, INFO) {
    $scope.info = INFO;
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
        return $location.path().endsWith('/writing-editing')
    };

    $scope.isPhotographyPath = function() {
        return $location.path().endsWith('/photography') ||
            $location.path().endsWith('/galleries') ||
            $location.path().indexOf('/gallery/') > -1 ||
            $location.path().indexOf('/photo/') > -1;
    };

    $scope.isGalleryPath = function() {
        return $location.path().endsWith('/galleries') ||
            $location.path().indexOf('/gallery/') > -1 ||
            $location.path().indexOf('/photo/') > -1;
    };
}]);

appModule.directive('email', [function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<a href="mailto:{{info.email}}?Subject=Frednoer.com%20inquiry" target="_top" class="email">{{info.email}}</a>',
        controller: 'generalCtrl'
    };
}]);


