'use strict';

var React = require('react-native');
var NativeMethodsMixin = require('NativeMethodsMixin');

var {
    StyleSheet,
    View,
    Text,
} = React;

var NativeMethodsMixinComponent = React.createClass({
    getInfo: function(){
        alert(NativeMethodsMixin.measure)
        NativeMethodsMixin.measure(function(obj){
            alert(obj)
        })
    },
    render: function(){
        return (
            <View style={styles.wrap}>
                <View style={styles.button} onTouchEnd={this.getInfo}>
                    <Text style={styles.buttontxt}>点击获取</Text>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    wrap: {
        paddingTop: 64,
    },
    button: {
        width: 300,
        height: 44,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff8400',
        borderRadius: 5,
    },
    buttontxt: {
        color: '#fff',
        fontSize: 16,
    },
});

module.exports = NativeMethodsMixinComponent;