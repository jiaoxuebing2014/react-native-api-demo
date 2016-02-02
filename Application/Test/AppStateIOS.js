'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  AppStateIOS,
  Text,
  View
} = React;

var {
    width,
    height,
} = Dimensions.get('window');

var AppStateIOSComponent = React.createClass({
    getInitialState: function(){
        return {
            'currentState'  : AppStateIOS.currentState,
            'currentStateTt': '初始化',
            'backgroundColor': '#9600ff',
            'memoryWarnings': 0
        };
    },
    componentDidMount: function(){
        AppStateIOS.addEventListener('change', this._changeState);
    },
    componentWillUnmount: function(){
         AppStateIOS.removeEventListener('change', this._changeState);
    },
    _changeState: function(appState) {
        var self = this;
        if(appState=='active'){
            setTimeout(function(){
                self.setState({
                    'memoryWarnings'    : self.state.memoryWarnings + 1,
                    'backgroundColor'   : '#f26101',
                    'currentStateTt'    : '现在应用正在前台运行'
                });
            },2000)
        }
        if(appState=='background'){
            setTimeout(function(){
                self.setState({
                    'memoryWarnings'    : self.state.memoryWarnings + 1,
                    'backgroundColor'   : '#0012ff',
                    'currentStateTt'    : '刚才应用正在后台运行。用户既可能在别的应用中，也可能在桌面。'
                });  
            },2000)
            
        }
        if(appState=='inactive'){
            setTimeout(function(){
                self.setState({
                    'memoryWarnings'    : self.state.memoryWarnings + 1,
                    'backgroundColor'   : '#392c9b',
                    'currentStateTt'    : '这是一个过渡状态，不会在正常的React Native应用中出现。'
                });
            },2000)
        }
    },
    render: function(){
        return (
            <View style={{width:width,height:height,alignItems:'center',justifyContent:'center',backgroundColor:this.state.backgroundColor}}>
                <Text style={{color:'#fff',fontSize:20,paddingLeft:20,paddingRight:20}}>
                   {this.state.memoryWarnings} - {this.state.currentStateTt}
                </Text>
            </View>
        );
    }
});

module.exports = AppStateIOSComponent;