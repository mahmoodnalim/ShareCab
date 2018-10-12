# Angular Google Map
> An angular directive to display a custom google map

## Installation

Via NPM

```
$ npm install --save angular-google-map
```

or the simple way, by including ``/dist/angular-google-map.min.js`` into the head of your HTML.


## Usage
Follow these steps to get it working in your project. In ```src``` you can see a working example of the module and play around with it. Alternatively, just follow these steps.


### Adding to your Angular project
You can add the module as a dependency after declaring your own module, like so:
```
angular
    .module('myApp', ['angular-google-map'])
    .config(config)
    .run(run);
```
The directive is now available to your app and can be used in your HTML.

### HTML
To include the directive, use the following markup:
```
<google-maps
    lat="51.507351"
    lng="-0.127758"
    apikey="YOUR-API-KEY-HERE"
</google-maps>
```

### Options
The Angular Google Maps directive works supports the majority of the style attributes that the native API supports. The only required properties are ```lat```, ```long``` and ```zoom``` the others are optional. The following is a list of the supported attributes, which can all be added as attributes to the ```<google-maps></google-maps>```

Attribute | Type | Required | Default | Description
--- | --- | --- | --- | ---
apikey | String | True| NONE| Your Google maps API Key. [You can obtain one easily from the website](https://developers.google.com/maps/documentation/javascript/get-api-key)
lat| Float | True | NONE | Latitude position for map
long| Float | True | NONE | Longitude position for map
clickable-icons| Boolean | Optional | True | Locations with more information are clickable
custom-css| String | Optional | "height:400px;" | Pass a CSS class to control the height, width and position of the map. Not setting a class will default the map to 400px high and 100% wide.
custom-map-name| String | Optional | N/A | If you pass in a custom map styling array, you can name it and make it selectable from from map styles control
custom-map-styles| Array | Optional | Default | A custom map skin, see [http://www.snazzymaps.com](http://www.snazzymaps.com) for examples
disable-default-ui| Boolean | Optional | False  |  Hide all controllable UI elements
disable-double-click-zoom| Boolean | Optional | True | Double clicking zooms in closer
draggable| Boolean | Optional | True | Sets wether the map can be moved by user dragging action
fullscreen-control| Boolean | Optional | False | Display a control to fullscreen the map
fullscreen-control-options| Boolean | Optional | 'TOP_LEFT' | Position controls for the fullscreen map
map-type| String | Optional | 'ROADMAP' | Choices are: 'ROADMAP','SATELLITE','HYBRID'
map-type-control| Boolean | Optional | True | Display the Map Type options buttons
map-type-control-options-style| String | Optional | 'HORIZONTAL_BAR' | Style for the buttons. Choices are: 'HORIZONTAL_BAR' or 'DROPDOWN_MENU'
map-type-control-options-position| String | Optional | 'TOP_LEFT' | Position of the buttons. Choices. See [Full API for details](https://developers.google.com/maps/documentation/javascript/controls#ControlPositioning)
scrollwheel| Boolean | Optional | True | If False, use scrolling within the map will not effect zoom level.
street-view-control| Boolean | Optional | True |  Display the Street View option
street-view-control-options| Boolean | Optional | 'RIGHT_BOTTOM' | See [Full API for details](https://developers.google.com/maps/documentation/javascript/controls#ControlPositioning)
zoom| Int | Optional | 8 | Default zoom level for map, the higher the number the closer the zoom
zoom-control| Boolean | Optional | True | Display the zoom control
zoom-control-options| Boolean | Optional | 'BOTTOM_RIGHT' | See [Full API for details](https://developers.google.com/maps/documentation/javascript/controls#ControlPositioning)

## Support

This module has been developed to support versions of Angular from ``1.2.2`` up to ``1.4.5`` - If IE8 support is required please make sure to use Angular 1.2.

## Browser Support
This module has been developed to support all modern browsers will providing legacy support for IE8 and up.

## Development
If you wish to contribute or amend the source files and recompile you can do so by running the local development tasks.

You will need to install the dependencies by running ``npm install`` then run the default gulp task by running ``gulp``. This will create a local server and run the uncompiled version of the assets. The files are then visible at: ``http://localhost:8001``

Unit tests are still to be added.

## Roadmap

* Unit tests
