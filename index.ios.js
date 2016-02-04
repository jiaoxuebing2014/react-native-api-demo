
'use strict';

var React = require('react-native');

/*DEMO*/
var TabBarView = require('./Application/View/TabBar');

/*布局 Test*/
var LayoutView = require('./Application/Test/Layout');

/*API Test*/
var ActionSheelIOS = require('./Application/Test/ActionSheelIOS');
var Alert = require('./Application/Test/Alert');
var AlertIOS = require('./Application/Test/AlertIOS');
var Animated = require('./Application/Test/Animated');
var AppStateIOS = require('./Application/Test/AppStateIOS');
var AsyncStorage = require('./Application/Test/AsyncStorage');
var CameraRoll = require('./Application/Test/CameraRoll');
var NativeMethodsMixin = require('./Application/Test/NativeMethodsMixin');
var NetInfo = require('./Application/Test/NetInfo');
var PanResponder = require('./Application/Test/PanResponder');
var VibrationIOS = require('./Application/Test/VibrationIOS');

var {
    AppRegistry,
} = React;

var NV = React.createClass({

    render : function() {
        return (
            <PanResponder />
        );
    }

});

AppRegistry.registerComponent('test', () => NV);
