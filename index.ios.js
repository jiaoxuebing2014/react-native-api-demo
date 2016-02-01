
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

var {
    AppRegistry,
} = React;

var NV = React.createClass({

    render : function() {
        return (
            <Animated />
        );
    }

});

AppRegistry.registerComponent('test', () => NV);
