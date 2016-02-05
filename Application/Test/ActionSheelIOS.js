'use strict'

var React = require('react-native');

var {
    ActionSheetIOS,
    StyleSheet,
    View,
    Text,
} = React;

var ActionSheelIOSComponect = React.createClass({
    
    getInitialState: function(){
        return {
            options: {
                buttons: ['男','女','保密','取消'],
                defaultIndex: 0,
                msg: '（男）默认值',
            },
            share:{
                msg: '',
            }
        };
    },
    
    showOptions: function(){
        var btn = this.state.options;
        ActionSheetIOS.showActionSheetWithOptions({
            options: btn.buttons,
            cancelButtonIndex: (btn.buttons.length-1),
            destructiveButtonIndex: btn.defaultIndex,
        },(index) => {
            if(index<btn.buttons.length-1){ 
                this.setState(
                    Object.assign(btn,{
                        defaultIndex: index,
                        msg: btn.buttons[index],
                    })
                );
            }
        });
    },
    
    showShare: function(){
        ActionSheetIOS.showShareActionSheetWithOptions({
            url: 'https:www.baidu.com',
        },
        (error)=>{
            alert(error)
        },
        (success, method)=>{
            alert(method)
            alert(success)
            var msg = '';
            if(success){
                msg = '操作成功';
            }else{
                msg = '操作失败';
            }
            this.setState(
                Object.assign(this.state.share,{
                    msg: msg,
                })
            );
        });
    },
    
    render: function(){
        return (
            <View style={styles.wrap}>
                <View style={styles.options}>
                    <Text style={styles.title}>Options 弹出选择</Text>
                    <Text style={styles.button} onTouchEnd={this.showOptions}>点击弹出选项</Text>
                    <Text style={styles.msg}>{'你选择的是： '+this.state.options.msg}</Text>
                </View>
                <View style={styles.share}>
                    <Text style={styles.title}>Share 弹出本地分享</Text>
                    <Text style={styles.button} onTouchEnd={this.showShare}>点击弹出分享</Text>
                    <Text style={styles.msg}>{this.state.share.msg}</Text>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    wrap: {
        marginTop:100,
        height:300,
        flexDirection: 'column',
    },
    title: {
        color: '#000',
        fontSize: 16,
        lineHeight: 30,
        marginBottom: 10,
    },
    msg:{
        color: 'red',
        marginTop: 20,
    },
    button: {
        width: 100,
        height: 44,
        borderWidth: 1,
        borderColor: 'green',
        fontSize: 14,
        lineHeight: 28,
        textAlign: 'center',
        marginLeft: 40,
    },
    options: {
        flex: 1,
        backgroundColor: '#ccc'
    },
    share: {
        flex: 1,
        backgroundColor: '#ddd',
    },
});

module.exports = ActionSheelIOSComponect; 