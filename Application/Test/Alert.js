'use strict'

var React = require('react-native');

var {
    Alert,
    StyleSheet,
    View,
    Text,
} = React;

var AlertComponect = React.createClass({
    getInitialState: function(){
        return {
            title: '好屋中国提醒您',
            desc: '好屋中国房产网—国内首家O2O房产全民众销平台',
            index: [],
        };
    },
    saveIndex: function(e){
        this.state.index.push(e.nativeEvent.target); 
    },
    alertFn: function(e){
        var index = this.state.index.sort(function(a,b){return a>b?1:-1}).indexOf(e.nativeEvent.target);
        
        switch(index+1){
            case 1:
                Alert.alert(
                    this.state.title,
                    this.state.desc,
                );
                break;
            case 2:
                Alert.alert(
                    this.state.title,
                    this.state.desc,
                    [
                        {
                            text: '自定义按钮名称',
                            onPress: () =>{
                                Alert.alert(
                                    '回调标题',
                                    '回调内容信息',
                                );
                            }
                        },
                    ]
                )
                break;
            case 3:
                Alert.alert(
                    this.state.title,
                    this.state.desc,
                    [
                        {
                            text: '取消',
                        },
                        {
                            text: '确定',
                            onPress: () =>{
                                Alert.alert(
                                    '确定标题',
                                    '确定内容信息',
                                );
                            }
                        },
                    ]
                )
                break;
            case 4:
                Alert.alert(
                    this.state.title,
                    this.state.desc,
                    [
                        {
                            text: '按钮1',
                            onPress: () =>{
                                Alert.alert(
                                    '按钮1标题',
                                    '按钮1内容信息', 
                                );
                            }
                        },
                        {
                            text: '按钮2',
                            onPress: () =>{
                                Alert.alert(
                                    '按钮2标题',
                                    '按钮3内容信息',
                                );
                            }
                        },
                        {
                            text: '按钮3',
                            onPress: () =>{
                                Alert.alert(
                                    '按钮3标题',
                                    '按钮3内容信息',
                                );
                            }
                        },
                    ]
                )
                break;
            case 5:
                Alert.alert(
                    this.state.title,
                    this.state.desc,
                    '------------------'.split('').map((value, key) => ({
                        text: '按钮'+key+'标题',
                        onPress: () => {
                            Alert.alert(
                                '按钮'+key+'标题',
                                '按钮'+key+'内容信息',
                            );
                        }
                    }))
                )
                break;
        }
        
    },
    
    render: function(){
        return (
            <View style={styles.wrap}>
                <View style={styles.button}><Text style={styles.buttonText} onLayout={this.saveIndex} onTouchEnd={this.alertFn}>默认弹窗</Text></View>
                <View style={styles.button}><Text style={styles.buttonText} onLayout={this.saveIndex} onTouchEnd={this.alertFn}>确定后回调</Text></View>
                <View style={styles.button}><Text style={styles.buttonText} onLayout={this.saveIndex} onTouchEnd={this.alertFn}>两个按钮 确定与取消</Text></View>
                <View style={styles.button}><Text style={styles.buttonText} onLayout={this.saveIndex} onTouchEnd={this.alertFn}>三个按钮</Text></View>
                <View style={styles.button}><Text style={styles.buttonText} onLayout={this.saveIndex} onTouchEnd={this.alertFn}>多个按钮</Text></View>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    wrap: {
        marginTop: 100,
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
    }
});

module.exports = AlertComponect;