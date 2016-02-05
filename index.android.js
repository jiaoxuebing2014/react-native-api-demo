
'use strict';

var React = require('react-native');

/*DEMO*/
var TabBarView = require('./Application/View/TabBar');

/*布局 Test*/
var LayoutView = require('./Application/Test/Layout');

/*API Test*/
var Alert = require('./Application/Test/Alert');
var Animated = require('./Application/Test/Animated');
var AsyncStorage = require('./Application/Test/AsyncStorage');
var CameraRoll = require('./Application/Test/CameraRoll');
var NativeMethodsMixin = require('./Application/Test/NativeMethodsMixin');
var NetInfo = require('./Application/Test/NetInfo');
var PanResponder = require('./Application/Test/PanResponder');
var Geolocation = require('./Application/Test/Geolocation');

var {
    AppRegistry,
} = React;

var NV = React.createClass({

    render : function() {
        return (
            <LayoutView />
        );
    }

});

AppRegistry.registerComponent('test', () => NV);
