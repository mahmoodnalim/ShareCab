(function() {
	'use strict';

	angular
		.module('angular-google-map', [])
        .factory('loadGoogleMapAPI', loadGoogleMapAPI)
		.directive('googleMap', googleMap);

    /** @ngInject */
    function loadGoogleMapAPI($window, $rootScope, $document){

        var loadGoogleMapAPIService = {
            APIKEY: null,
            init: function(APIKEY){
                loadGoogleMapAPIService.APIKEY = APIKEY;
                loadMapAPI();
            },
            ready: false,
            scriptTagAdded: false
        };

        function loadMapAPI(){
            if(loadGoogleMapAPIService.APIKEY !== null && loadGoogleMapAPIService.scriptTagAdded === false && loadGoogleMapAPIService.ready === false){
                var script = $document[0].createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + loadGoogleMapAPIService.APIKEY + '&callback=mapready';
                $document[0].getElementsByTagName('head')[0].appendChild(script);
                loadGoogleMapAPIService.scriptTagAdded = true;
            } else if(loadGoogleMapAPIService.APIKEY === null){
                console.log('Cannot load maps due to no API KEY being provided');
            }
        }

        $window.mapready = function(){
            $rootScope.$apply(function () {
                loadGoogleMapAPIService.ready = true;
            });
        };

        return loadGoogleMapAPIService;
    }

	/** @ngInject */
	function googleMap(loadGoogleMapAPI) {

        var generateMapID = function (number) {
            return 'map_' + (number*Math.random()).toString(36).substr(2, 9);
        };

        function createMap($scope){
            var lat = parseFloat($scope.lat) || 0;
            var long = parseFloat($scope.long) || 0;
            var zoom = parseInt($scope.zoom) || 8;
            var mapType = ($scope.mapType !== undefined ? ($scope.mapType).toUpperCase() : "ROADMAP");
            var customMapName = ($scope.customMapName === undefined ? "Custom Map" : $scope.customMapName);
            var mapTypeControlOptionsStyle = ($scope.mapTypeControlOptionsStyle !== undefined ? ($scope.mapTypeControlOptionsStyle).toUpperCase() : "DEFAULT");
            var mapTypeControlOptionsPosition = ($scope.mapTypeControlOptionsPosition !== undefined ? ($scope.mapTypeControlOptionsPosition).toUpperCase() : "TOP_LEFT");
            var zoomControlOptions = ($scope.zoomControlOptions !== undefined ? ($scope.mapTypeControlOptionsStyle).toUpperCase() : "BOTTOM_RIGHT");
            var streetViewControlOptions = ($scope.streetViewControlOptions !== undefined ? ($scope.streetViewControlOptions).toUpperCase() : "RIGHT_BOTTOM");
            var fullscreenControlOptions = ($scope.fullscreenControlOptions !== undefined ? ($scope.fullscreenControlOptions).toUpperCase() : "TOP_RIGHT");

            var disableDoubleClickZoom = Boolean($scope.disableDoubleClickZoom);
            var disableDefaultUI = Boolean($scope.disableDefaultUi);
            var fullscreenControl = Boolean($scope.fullscreenControl);

            var clickableIcons = ($scope.clickableIcons !== undefined ? $scope.clickableIcons: true);

            var draggable = ($scope.draggable === false ? false: true);
            var mapTypeControl = ($scope.mapTypeControl === false ? false: true);
            var streetViewControl = ($scope.streetViewControl === false ? false: true);
            var scrollwheel = ($scope.scrollwheel === false ? false: true);
            var zoomControl = ($scope.zoomControl === false ? false: true);

            var mapArrays = ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'];
            var map;

            map = new google.maps.Map(document.getElementById($scope.templateId), {
                center: {
                    lat: lat,
                    lng: long
                },
                clickableIcons: clickableIcons,
                disableDoubleClickZoom: disableDoubleClickZoom,
                disableDefaultUI: disableDefaultUI,
                draggable: draggable,
                fullscreenControl: fullscreenControl,
                mapTypeControl: mapTypeControl,
                scrollwheel: scrollwheel,
                streetViewControl: streetViewControl,
                zoom: zoom,
                zoomControl: zoomControl,
                mapTypeId: google.maps.MapTypeId[mapType],
                zoomControlOptions: {
                    position: google.maps.ControlPosition[zoomControlOptions]
                },
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle[mapTypeControlOptionsStyle],
                    position: google.maps.ControlPosition[mapTypeControlOptionsPosition],
                    mapTypeIds: mapArrays
                },
                streetViewControlOptions: {
                    position: google.maps.ControlPosition[streetViewControlOptions]
                },
                fullscreenControlOptions: {
                    position: google.maps.ControlPosition[fullscreenControlOptions]
                }
            });

            if($scope.customMapStyles && Array.isArray($scope.customMapStyles)){
                var styledMapType = new google.maps.StyledMapType($scope.customMapStyles, {name: customMapName});
                map.mapTypes.set('styled_map', styledMapType);
                map.setMapTypeId('styled_map');
            }
        }

        return {
            restrict: 'E',
            scope: {
                apikey: '@',
                clickableIcons: '=',
                customCss: '@',
                customMapName: '=',
                disableDoubleClickZoom: '=',
                disableDefaultUi: '=',
                draggable: '=',
                fullscreenControl: '=',
                fullscreenControlOptions: '=',
                mapType: '=',
                mapTypeControl: '=',
                mapTypeControlOptionsPosition: '=',
                mapTypeControlOptionsStyle: '=',
                lat: '=',
                long: '=',
                scrollwheel: '=',
                streetViewControl: '=',
                streetViewControlOptions: '=',
                zoom: '=',
                zoomControl: '=',
                zoomControlOptions: '='
            },
            template: '<div id="{{ templateId }}" class="{{ customCss }}" style="{{ height }}"></div>',
            link: function($scope, element, attributes){
                if($scope.customCss === undefined){
                    $scope.height = "height: 400px;";
                }

                if($scope.apikey !== undefined){

                    loadGoogleMapAPI.init($scope.apikey);
                    $scope.googlemap = loadGoogleMapAPI;
                    $scope.templateId = generateMapID($scope.$id);

                    $scope.$watch(
                        function() {
                            return $scope.googlemap.ready;
                        },
                        function(newValue, oldValue) {
                            if ( newValue !== oldValue ) {
                                createMap($scope);
                            }
                        }
                    );
                } else {
                    console.log('Unable to load map. No API Key provided');
                }
            }
        };
	}



})();
