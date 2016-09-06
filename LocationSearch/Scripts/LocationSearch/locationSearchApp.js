var LocationSearchApp = angular.module("LocationSearchApp", []);

LocationSearchApp.controller("LocationSearchController", function ($scope, LocationSearchDataService) {
    $scope.allLocations = [];
    $scope.children = [];
    $scope.hideEmptyResult = true;

    $scope.getData = function () {
        var data = LocationSearchModel.readStorage();
        if (data.length == 0) {
            LocationSearchDataService.getData()
                .success(function (data) {
                    console.log(data);
                    createLocations(data);                    
                })
                .error(function (error) {
                    $scope.status = "Unable to load data: " + error.message;
                    console.log($scope.status);
                });
        }
        $scope.allLocations = LocationSearchModel.readStorage();
    };

    $scope.searchChidren = function () {
        $scope.children = [];
        $scope.children = LocationSearchModel.searchLocation($scope.locationForSearch);
        $scope.hideEmptyResult = ($scope.children).length == 0 ? false : true;
    };

    var createLocations = function (data) {
        for (var i = 0; i < data.length; i++) {
            LocationSearchModel.locations.push(new Location(data[i].LocationId, data[i].LocationName, data[i].ParentLocationId)); 
        }
    };
});

//service for getting new game data
LocationSearchApp.factory("LocationSearchDataService", ['$http', function ($http) {
    var LocationSearchDataService = {};
    LocationSearchDataService.getData = function () {
        return $http.get('/Home/Get');
    };
    return LocationSearchDataService;
}]);