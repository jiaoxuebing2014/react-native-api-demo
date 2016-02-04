'use strict';

var React = require('react-native');

var {
    VibrationIOS,
    StyleSheet,
    View,
    Text,
} = React;

var VibrationIOSComponent = React.createClass({
    vibration: function(){
        VibrationIOS.vibrate();
    },
    render: function(){
        return (
            <View onTouchEnd={this.vibration} style={{width:300,height:44,marginTop:100,backgroundColor:'#ff3f00',alignSelf:'center',alignItems:'center',justifyContent:'center',borderRadius:5}}>
                <Text style={{color:'#fff'}}>点击触发振动</Text>
            </View>
        );
    }
});

module.exports = VibrationIOSComponent;