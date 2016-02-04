'use strict';

var React = require('react-native');
var Geolocation = require('Geolocation');

var {
    StyleSheet,
    View,
    Text,
} = React;

var GeolocationComponent = React.createClass({
    getInitialState: function(){
        return {
            'locationinfo'  : '',
            'changeInfo'    : ''
        };
    },
    watchID: null,
    getLocationInfo: function(){
        /*获取最新的位置信息*/
        Geolocation.getCurrentPosition(
            (info)=>{
                this.setState({
                    'locationinfo'  : JSON.stringify(info)
                });
            },
            (error) => {alert(error.message)},
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    },
    stopLaction: function(){
        Geolocation.clearWatch(this.state.locationinfo)
    },
    componentDidMount: function(){
        this.watchID = Geolocation.watchPosition(
            (info) =>{
                this.setState({
                    'changeInfo'  : JSON.stringify(info)
                });
            },
            (error) => {alert(error.message)},
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    },
    componentWillUnmount: function(){
        Geolocation.clearWatch(this.watchID);
    },
    render: function(){
        return (
            <View style={styles.wrap}>
                <View style={styles.button} onTouchEnd={this.getLocationInfo}>
                    <Text style={styles.buttontxt}>获取位置</Text>
                </View>
                <View style={{marginTop:44,borderTopWidth:1,borderTopColor:'#ccc'}}>
                    <Text>{'获取位置信息：'+this.state.locationinfo}</Text>
                </View>
                <View style={{marginTop:44,borderTopWidth:1,borderTopColor:'red'}}>
                    <Text>{'持续监听位置：'+this.state.changeInfo}</Text>
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
        width: 280,
        height: 44,
        borderRadius: 5,
        backgroundColor: '#ff3800',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttontxt: {
        color: '#fff',
    },
});

module.exports = GeolocationComponent;