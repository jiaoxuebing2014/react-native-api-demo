
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

var {
    AppRegistry,
} = React;

var NV = React.createClass({

    render : function() {
        return (
            <AsyncStorage />
        );
    }

});

AppRegistry.registerComponent('test', () => NV);
