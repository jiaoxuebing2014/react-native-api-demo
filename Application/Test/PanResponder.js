'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var {
    PanResponder,
    StyleSheet,
    View,
    Text,
    processColor,
} = React;

var {
    width,
    height,
} = Dimensions.get('window');

var PanResponderComponent = React.createClass({
    getInitialState: function(){
        return {
            gestureState: '',
        };
    },
    _panResponder: {},
    _previousLeft: 0,
    _previousTop: 0,
    _circleStyles: {},
    circle: {},
    componentWillMount: function(){
        this._panResponder = PanResponder.create({
            // 要求成为响应者： return true
            onStartShouldSetPanResponder: this._onStartShouldSetPanResponder,
            onStartShouldSetPanResponderCapture: this._onStartShouldSetPanResponderCapture,
            onMoveShouldSetPanResponder: this._onMoveShouldSetPanResponder,
            onMoveShouldSetPanResponderCapture: this._onMoveShouldSetPanResponderCapture,
            
            onPanResponderReject: this._onPanResponderReject,
            
            // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
            // gestureState.{x,y}0 现在会被设置为0
            onPanResponderGrant: this._onPanResponderGrant,
            onPanResponderStart: this._onPanResponderStart,
            
            // 最近一次的移动距离为gestureState.move{X,Y}
            // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            onPanResponderMove: this._onPanResponderMove,
            
            onPanResponderEnd: this._onPanResponderEnd,
            
            // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            onPanResponderTerminate: this._onPanResponderTerminate,
            
            // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
            // 一般来说这意味着一个手势操作已经成功完成。
            onPanResponderTerminationRequest: this._onPanResponderTerminationRequest,
            // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            onPanResponderRelease: this._onPanResponderRelease,
            
            // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
            // 默认返回true。目前暂时只支持android。
            onShouldBlockNativeResponder: this._onShouldBlockNativeResponder,
        });
        this._previousLeft = 100;
        this._previousTop = 100;
        this._circleStyles = {
            style: {
                left: this._previousLeft,
                top: this._previousTop
            }
        };
    },
    componentDidMount: function(){
        this._updatePosition();
    },
    render: function(){
        return (
            <View style={{width: width,height: height-64}}>
                <View 
                    ref={(circle) => {
                        this.circle = circle;
                    }}
                    style={styles.moveBox}
                    {...this._panResponder.panHandlers}>
                </View>
                <Text style={styles.state}>gestureState信息： {this.state.gestureState}</Text>
            </View>
        );
    },
    _active: function() {
        var circle = this.circle;
        circle && circle.setNativeProps({
            style: {
                backgroundColor: processColor('green')
            }
        });
    },

    _unactive: function() {
        var circle = this.circle;
        circle && circle.setNativeProps({
            style: {
                backgroundColor: processColor('blue')
            }
        });
    },
    _updatePosition: function(gestureState) {
        this.circle && this.circle.setNativeProps(this._circleStyles);
        this.setState({
            gestureState:JSON.stringify(gestureState)
        });
    },
    _onStartShouldSetPanResponder: function(e,gestureState){
        return true;
    },
    _onMoveShouldSetPanResponder: function(e,gestureState){
        return true;
    },
    _onPanResponderGrant: function(event,gestureState){ 
        this._active();
    },
    _onPanResponderMove: function(event,gestureState){
        this._circleStyles.style.left = this._previousLeft + gestureState.dx;
        this._circleStyles.style.top = this._previousTop + gestureState.dy;
        this._updatePosition(gestureState);
    },
    _onPanResponderEnd: function(event,gestureState){
        this._unactive();
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
    }
});

var styles = StyleSheet.create({
    moveBox: {
        width: 80,
        height: 80,
        borderRadius: 40,
        position: 'absolute',
        backgroundColor: 'blue',
    },
    state: {
        position: 'absolute',
        bottom: 44,
        alignSelf: 'center',
    }
});

module.exports = PanResponderComponent;