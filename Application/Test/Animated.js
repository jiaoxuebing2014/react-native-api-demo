'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio').get();

var {
    width,
    height,
} = Dimensions.get('window');

var {
    Animated,
    Platform,
    StyleSheet,
    View,
    Text,
    Easing,
} = React;

var AnimatedComponent = React.createClass({
    getInitialState:function(){
        return {
            opacity: new Animated.Value(0),
            size: new Animated.Value(0),
            marginLeft: -width,
            istouchstart: false,
        };
    },
    fadeIn: function(){
        this.setState({
            marginLeft:0
        });
        Animated.timing(
            this.state.opacity,
            {
                toValue: 0.8,
            }
        ).start();
        Animated.timing(
            this.state.size,
            {
                toValue: 200,
            }
        ).start();
    },
    fadeOut: function(){
        var self = this;
        self.setState({
            istouchstart: false,
        });
        Animated.timing(
            this.state.opacity,
            {
                toValue: 0,
            }
        ).start(function(){
            self.setState({
                marginLeft:-width,
            });
        });
        Animated.timing(
            this.state.size,
            {
                toValue: 0,
            }
        ).start();
    },
    touchstartfn: function(){
        this.setState({
            istouchstart: true,
        });
    },
    render: function(){
        return ( 
            <View style={styles.wrap}>
                <View style={styles.button} onTouchEnd={this.fadeIn}>
                    <Text style={styles.buttonText}>点击弹窗</Text>
                </View>
                <Animated.View style={[styles.popupComponentWrap,{opacity:this.state.opacity,marginLeft:this.state.marginLeft}]}>
                    <Animated.View style={[styles.popupComponentBox,Platform.OS=='ios'?styles.popupComponentBoxIos:undefined,{width:this.state.size,height:this.state.size}]}></Animated.View>
                    <Animated.View style={[styles.popupComponentBtn,{opacity:this.state.opacity},this.state.istouchstart&&styles.popupComponentBtnCurrent]} onTouchEnd={this.fadeOut} onTouchStart={this.touchstartfn}>
                        <Text style={[styles.popupComponentText,this.state.istouchstart&&styles.popupComponentTextCurrent]}>关闭</Text>
                    </Animated.View>
                </Animated.View> 
            </View>
        );
    }
});

var styles = StyleSheet.create({
    wrap: {
        flex:1,
        flexDirection: 'column',
        paddingTop: 100,
    },
    button: {
        height: 44,
        marginBottom: 10,
        backgroundColor: '#ccc',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        textAlign: 'center',
    },
    popupComponentWrap: {
        width: width,
        height: height,
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#000',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupComponentBox: {
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    popupComponentBoxIos: {
        borderWidth: 5,
        borderColor: '#fff',
    },
    popupComponentBtn: {
        width: 200,
        height: 44,
        position: 'absolute',
        bottom: 100,
        left: (width-200)/2,
        borderColor: '#defdee',
        borderRadius: 5,
        backgroundColor: '#defdee',
        justifyContent: 'center',
    },
    popupComponentBtnCurrent: {
        borderColor: '#248a89',
        backgroundColor: '#248a89',
    },
    popupComponentText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
    },
    popupComponentTextCurrent: {
        color: '#ffffff',
    },
});
 
module.exports = AnimatedComponent;