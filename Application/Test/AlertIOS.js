'use strict'

var React = require('react-native');

var {
    AlertIOS,
    StyleSheet,
    View,
    Text,
} = React;

var AlertIOSComponect = React.createClass({
    getInitialState: function(){
        return {
            title: '好屋中国提醒您',
            desc: '好屋中国房产网—国内首家O2O房产全民众销平台',
        };
    },
    alertFn: function(){
        switch(arguments[0]){
            case 1:
                AlertIOS.alert(
                    this.state.title,
                    this.state.desc,
                );
                break;
            case 2:
                AlertIOS.alert(
                    this.state.title,
                    this.state.desc,
                    [
                        {
                            text: '自定义按钮名称',
                            onPress: () =>{
                                AlertIOS.alert(
                                    '回调标题',
                                    '回调内容信息',
                                );
                            }
                        },
                    ]
                )
                break;
            case 3:
                AlertIOS.alert(
                    this.state.title,
                    this.state.desc,
                    [
                        {
                            text: '取消',
                        },
                        {
                            text: '确定',
                            onPress: () =>{
                                AlertIOS.alert(
                                    '确定标题',
                                    '确定内容信息',
                                );
                            }
                        },
                    ]
                )
                break;
            case 4:
                AlertIOS.alert(
                    this.state.title,
                    this.state.desc,
                    [
                        {
                            text: '按钮1',
                            onPress: () =>{
                                AlertIOS.alert(
                                    '按钮1标题',
                                    '按钮1内容信息', 
                                );
                            }
                        },
                        {
                            text: '按钮2',
                            onPress: () =>{
                                AlertIOS.alert(
                                    '按钮2标题',
                                    '按钮3内容信息',
                                );
                            }
                        },
                        {
                            text: '按钮3',
                            onPress: () =>{
                                AlertIOS.alert(
                                    '按钮3标题',
                                    '按钮3内容信息',
                                );
                            }
                        },
                    ]
                )
                break;
            case 5:
                AlertIOS.alert(
                    this.state.title,
                    this.state.desc,
                    '------------------'.split('').map((value, key) => ({
                        text: '按钮'+key+'标题',
                        onPress: () => {
                            AlertIOS.alert(
                                '按钮'+key+'标题',
                                '按钮'+key+'内容信息',
                            );
                        }
                    }))
                )
                break;
        }
    },
    prompt: function(){
         ((AlertIOS.prompt: any).apply: any)(AlertIOS, arguments);                                              
    },
    render: function(){
        return (
            <View style={styles.wrap}>
                <Text style={styles.button} onTouchEnd={this.alertFn.bind(this,1)}>默认弹窗</Text>
                <Text style={styles.button} onTouchEnd={this.alertFn.bind(this,2)}>确定后回调</Text>
                <Text style={styles.button} onTouchEnd={this.alertFn.bind(this,3)}>两个按钮 确定与取消</Text>
                <Text style={styles.button} onTouchEnd={this.alertFn.bind(this,4)}>三个按钮</Text>
                <Text style={styles.button} onTouchEnd={this.alertFn.bind(this,5)}>多个按钮</Text>     
                <Text style={styles.button} 
                    onTouchEnd={this.prompt.bind(
                        this,
                        '带输入框',
                        '带输入框内容',
                        [
                            {
                                text: '取消',
                            },
                            {
                                text: '确定',
                                onPress: function(){alert('确定回调回来信息')}
                            }
                        ],
                        null
                    )}
                >
                    带输入框
                </Text>
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
        fontSize: 14,
        lineHeight: 30,
        textAlign: 'center',
        backgroundColor: '#ccc'
    }
});

module.exports = AlertIOSComponect;