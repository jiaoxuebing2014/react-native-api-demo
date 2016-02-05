'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

/*DEMO*/
var TabBarView = require('../View/TabBar');

/*布局 Test*/
var LayoutView = require('./Layout');

/*API Test*/
var AlertView = require('./Alert');
var AnimatedView = require('./Animated');
var AsyncStorageView = require('./AsyncStorage');
var CameraRollView = require('./CameraRoll');
var NativeMethodsMixinView = require('./NativeMethodsMixin');
var NetInfoView = require('./NetInfo');
var PanResponderView = require('./PanResponder');
var GeolocationView = require('./Geolocation');

var ApiDemo = [
    <LayoutView />,
    <AlertView />,
    <AnimatedView />,
    <AsyncStorageView />,
    <CameraRollView />,
    <NativeMethodsMixinView />,
    <NetInfoView />,
    <PanResponderView />,
    <GeolocationView />,
];

var ApiDemoText = [
    'Layout 布局',
    'Alert alert 弹窗组件',
    'Animated动画API ',
    'AsyncStorage存储API',
    'CameraRoll 未完成',
    'NativeMethodsMixin 未完成',
    'NetInfo NetInfo网络API',
    'PanResponder类触摸操作',
    'Geolocation 获取地理位置',
];

var {
    width,
    height,
} = Dimensions.get('window');

var {
    TouchableOpacity,
    StatusBarIOS,
    StyleSheet,
    ScrollView,
    Animated,
    LayoutAnimation,
    Image,
    View,
    Text,
    Easing,
} = React;

var NavComponent = React.createClass({
    getInitialState: function(){
        return {
            pageDemo: null,
            homeLeft: new Animated.Value(0),
            detailLeft: new Animated.Value(width),
        };
    },
    componentDidMount: function(){
        StatusBarIOS.setStyle('light-content');
    },
    goDetailPage: function(i){
        this.setState({
            pageDemo: ApiDemo[i]       
        });
        Animated.timing(
            this.state.homeLeft,
            {
                toValue: -width,
                duration: 500,
            }
        ).start();
        Animated.timing(
            this.state.detailLeft,
            {
                toValue: 0,
                duration: 300,
            }
        ).start();
    },
    backHome: function(){
        Animated.timing(
            this.state.homeLeft,
            {
                toValue: 0,
                duration: 300,
            }
        ).start();
        Animated.timing(
            this.state.detailLeft,
            {
                toValue: width,
                duration: 350,
            }
        ).start();
    },
    render: function(){
        var icon = require('../Img/icon/arrow3.png');
        var back = require('../Img/icon/arrow2.png');
        return (
            <View style={styles.wrapMain}>
                <Animated.View style={[styles.wrap,styles.home,{left:this.state.homeLeft}]}>
                    <View style={styles.head}><Text style={styles.headtxt}>React Native API Demo</Text></View>
                    <ScrollView style={styles.list} automaticallyAdjustContentInsets={false}>
                        {ApiDemo.map((v,i)=>
                            <TouchableOpacity key={i} style={styles.button} onPress={this.goDetailPage.bind(this,i)}><Text style={styles.buttontxt}>{(i+1)+'、'+ApiDemoText[i]}</Text><Image style={styles.icon} source={icon} /></TouchableOpacity>
                        )}
                    </ScrollView>
                </Animated.View>
                <Animated.View style={[styles.wrap,styles.detail,{left:this.state.detailLeft}]}>
                    <View style={styles.head}><TouchableOpacity style={styles.back} onPress={this.backHome}><Image style={styles.backicon} source={back} /><Text style={styles.headtxt}>返回</Text></TouchableOpacity><Text style={styles.headtxt}>详情</Text></View>
                    <View style={styles.list} automaticallyAdjustContentInsets={false}>
                        {this.state.pageDemo}
                    </View>
                </Animated.View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    wrapMain: {
        width: width,
        height: height,
        overflow: 'hidden',
    },
    wrap: {
        width: width,
        height: height,
        flexDirection: 'column',
        position: 'absolute',
        top:0,
    },
    home: {
        left:0,
    },
    detail: {
        left: width,
    },
    head: {
        paddingTop: 20,
        height: 64,
        backgroundColor: 'rgb(144, 0, 203)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headtxt: {
        color: '#fff'
    },
    back: {
        width: 60,
        height: 44,
        position: 'absolute',
        left: 0,
        top: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    backicon: {
        width: 7,
        height:12,
        marginRight: 10,
    },
    list: {
        flex: 1,
    },
    button: {
        height: 44,
        justifyContent: 'center',
        backgroundColor: 'rgb(208, 208, 208)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(195, 195, 195)',
    },
    buttontxt: {
        paddingLeft: 20,
        color: '#000'
    },
    icon: {
        width: 7,
        height: 12,
        position: 'absolute',
        right: 10,
        top:14,
    }
});

module.exports = NavComponent;