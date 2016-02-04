'use strict';

var React = require('react-native');

var {
    NetInfo,
    StyleSheet,
    View,
    Text,
} = React;

var NetInfoComponent = React.createClass({
    getInitialState: function(){
        return {
            'isConnected'   : '是否联网',
            'currentNetInfo': '当前网络类型',   
        }; 
    },
    componentDidMount: function(){
        var self = this;
        NetInfo.isConnected.fetch().done((reach) => {
            self.setState({
                isConnected: reach?'已连上网络':'未连上网络'
            });
        });
        NetInfo.fetch().done((reach) => {
            self.setState({
                currentNetInfo: reach
            });
        });
        function netChange(reach) {
          self.setState({
            isConnected: reach!=='none'?'已连上网络':'未连上网络',
            currentNetInfo: reach,
        });
        }
        NetInfo.addEventListener('change',netChange);
    },
    render: function(){
        return (
            <View style={styles.wrap}>
                <Text>是否联网：{this.state.isConnected}</Text>
                <Text>当前网络类型：{this.state.currentNetInfo}</Text>
            
                <Text style={{marginTop:50}}>说明：</Text>
                <Text>none - 设备处于离线状态。</Text>
                <Text>wifi - 设备处于联网状态且通过wifi链接，或者是一个iOS的模拟器。</Text>
                <Text>cell - 设备是通过Edge、3G、WiMax或是LTE网络联网的。</Text>
                <Text>unknown - 发生错误，网络状况不可知</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    wrap: {
        paddingTop: 100,
        alignSelf: 'center',
    },
});

module.exports = NetInfoComponent;