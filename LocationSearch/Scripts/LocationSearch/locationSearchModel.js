var LocationSearchModel = (function () {

    var _locations = [];

    function _searchLocation(name) {
        var result = [];
        var parent = _searchLocationByName(name);
        if (parent) {
            result = _searchLocationsByParentId(parent.locationId, result);
        }
        return result;
    }

    function _readStorage() {
        var temp = window.localStorage["locations"]

        if (!temp) {
            _locations = [];
        }
        else {
            _locations = (JSON.parse(temp)).slice();
        }
        return _locations;
    }

    function _searchLocationByName(name) {
        var result = null;

        for (var i = 0; i < _locations.length; i++) {
            if (_locations[i].locationName === name) {
                result = _locations[i];
                break;
            }
        }

        return result;
    }

    function _searchLocationsByParentId(id, result) {
        for (var i = 0; i < _locations.length; i++) {
            if (_locations[i].parentLocationId == id) {
                if (_getChildrenCount(_locations[i].locationId) == 0) {
                    result.push(_locations[i]);
                }
                else {
                    _searchLocationsByParentId(_locations[i].locationId, result);
                }
            }
            else if (_locations[i].locationId == id && _getChildrenCount(_locations[i].locationId) == 0) {
                result.push(_locations[i]);
            }
        }
        return result;
    }

    function _getChildrenCount(id) {
        var result = 0;
        for (var i = 0; i < _locations.length; i++) {
            if (_locations[i].parentLocationId == id) {
                result++;
            }
        }
        return result;
    }

    return {
        locations: _locations,
        searchLocation: _searchLocation,
        readStorage: _readStorage
    };
})();