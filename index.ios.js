
'use strict';

var React = require('react-native');

var Nav = require('./Application/Test/Nav');

var {
    AppRegistry,
} = React;

var NV = React.createClass({

    render : function() {
        return (
            <Nav />
        );
    }

});

AppRegistry.registerComponent('test', () => NV);
