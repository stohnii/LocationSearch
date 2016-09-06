describe("Controller behaviour test", function () {

    //Arrange
    var mockScope = {};
    var controller;
    var backend;

    beforeEach(angular.mock.module("LocationSearchApp"));
    beforeEach(angular.mock.inject(function ($controller, $rootScope, $http) {
        mockScope = $rootScope.$new();

        controller = $controller("LocationSearchController", {
            $scope: mockScope,
            $http: $http
        }); 
    }));

    beforeEach(angular.mock.inject(function ($httpBackend) {
        backend = $httpBackend;

        backend.expect("GET", "/Home/Get").respond(
        [
            { "LocationId": 1, "LocationName": "World", "ParentLocationId": null },
            { "LocationId": 2, "LocationName": "Europe", "ParentLocationId": 1 },
            { "LocationId": 3, "LocationName": "North America", "ParentLocationId": 1 },
            { "LocationId": 4, "LocationName": "France", "ParentLocationId": 2 },
            { "LocationId": 5, "LocationName": "Germany", "ParentLocationId": 2 },
            { "LocationId": 6, "LocationName": "Paris", "ParentLocationId": 4 },
            { "LocationId": 7, "LocationName": "Berlin", "ParentLocationId": 5 },
            { "LocationId": 8, "LocationName": "United States", "ParentLocationId": 3 },
            { "LocationId": 9, "LocationName": "Canada", "ParentLocationId": 3 },
            { "LocationId": 10, "LocationName": "New York", "ParentLocationId": 8 },
            { "LocationId": 11, "LocationName": "Washington", "ParentLocationId": 8 },
            { "LocationId": 12, "LocationName": "New York City", "ParentLocationId": 10 },
            { "LocationId": 13, "LocationName": "Redmond", "ParentLocationId": 11 }
        ]);
    }));

    it("getLocationsData call", function () {
        mockScope.getData();
        backend.flush();
        backend.verifyNoOutstandingExpectation();
    });

    it("New scope properties test", function () {
        expect(mockScope.allLocations.length).toEqual(0);
        expect(mockScope.children.length).toEqual(0);
        expect(mockScope.hideEmptyResult).toBeTruthy();
    })
    
    it("searchChidren by correct name", function () {
        mockScope.getData();

        mockScope.locationForSearch = "Germany";
        mockScope.searchChidren();
        expect(mockScope.allLocations.length).toEqual(13);
        expect(mockScope.hideEmptyResult).toBeTruthy();
    });

    it("searchChidren by correct name", function () {
        mockScope.getData();
        mockScope.locationForSearch = "Germanyqq";
        mockScope.searchChidren();
        expect(mockScope.hideEmptyResult).toBeFalsy();
    });
});