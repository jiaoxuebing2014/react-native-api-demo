'use strict';

var React = require('react-native');
var {
    StatusBarIOS,
    StyleSheet,
    View,
    Text,
} = React;

var StatusBarIOSComponent = React.createClass({
    active: {},
    upheight: {},
    siliderfn: function(index){
        for(var i in this.refs){
            var cr = this.refs[i].props.children;
            if(cr[0]){
                this.active[i].setNativeProps({
                    style: {
                        backgroundColor: '#fe5800'
                    }
                });
            }
            if(cr[1]){
                this.upheight[i].setNativeProps({
                    style: {
                        height: 0
                    }
                });
            }
        }
        var children = this.refs[index].props.children;
        if(children[0]){
            this.active[index].setNativeProps({
                style: {
                    backgroundColor: 'red'
                }
            });
        }
        if(children[1]){
            this.upheight[index].setNativeProps({
                style: {
                    height: children[1].props.children.length*34
                }
            });
        }
    },
    render: function(){
        return (
            <View style={styles.wrap}>
                <View style={styles.head}>
                    <Text style={styles.headtxt}>头部</Text>
                </View>
                <View style={styles.li} ref="li1" onTouchStart={this.siliderfn.bind(this,'li1')}>
                    <View style={styles.button} ref={(e)=>{this.active['li1'] = e}}><Text style={styles.buttontxt}>状态栏样式</Text></View>
                    <View style={styles.buttonnextwrap} ref={(e)=>{this.upheight['li1'] = e}}>
                        <View style={styles.buttonnext} onTouchEnd={() => StatusBarIOS.setStyle('default')}><Text style={styles.buttontxt}>setStyle(default)</Text></View>
                        <View style={styles.buttonnext} onTouchEnd={() => StatusBarIOS.setStyle('light-content')}><Text style={styles.buttontxt}>setStyle(light-content)</Text></View>
                    </View>
                </View>
                <View style={styles.li} ref="li2" onTouchStart={this.siliderfn.bind(this,'li2')}>
                    <View style={styles.button} ref={(e)=>{this.active['li2'] = e}}><Text style={styles.buttontxt}>状态栏样式-动画</Text></View>
                    <View style={styles.buttonnextwrap} ref={(e)=>{this.upheight['li2'] = e}}>
                        <View style={styles.buttonnext} onTouchEnd={() => StatusBarIOS.setStyle('default',true)}><Text style={styles.buttontxt}>setStyle(default,true)</Text></View>
                        <View style={styles.buttonnext} onTouchEnd={() => StatusBarIOS.setStyle('light-content',true)}><Text style={styles.buttontxt}>setStyle(light-content,true)</Text></View>
                    </View>
                </View>
                <View style={styles.li} ref="li3" onTouchStart={this.siliderfn.bind(this,'li3')}>
                    <View style={styles.button} ref={(e)=>{this.active['li3'] = e}}><Text style={styles.buttontxt}>状态栏隐藏</Text></View>
                    <View style={styles.buttonnextwrap} ref={(e)=>{this.upheight['li3'] = e}}>
                        <View style={styles.buttonnext} onTouchEnd={() => StatusBarIOS.setHidden(true,'none')}><Text style={styles.buttontxt}>setHidden(true,none)</Text></View>
                        <View style={styles.buttonnext} onTouchEnd={() => StatusBarIOS.setHidden(false,'none')}><Text style={styles.buttontxt}>setHidden(false,none)</Text></View>
                            
                        <View style={styles.buttonnext} onTouchEnd={() => StatusBarIOS.setHidden(true,'fade')}><Text style={styles.buttontxt}>setHidden(true,fade)</Text></View>
                        <View style={styles.buttonnext} onTouchEnd={() => StatusBarIOS.setHidden(false,'fade')}><Text style={styles.buttontxt}>setHidden(false,fade)</Text></View>
                            
                        <View style={styles.buttonnext} onTouchEnd={() => StatusBarIOS.setHidden(true,'slide')}><Text style={styles.buttontxt}>setHidden(true,slide)</Text></View>
                        <View style={styles.buttonnext} onTouchEnd={() => StatusBarIOS.setHidden(false,'slide')}><Text style={styles.buttontxt}>setHidden(false,slide)</Text></View>
                    </View>
                </View>
                <View style={styles.li} ref="li4" onTouchStart={this.siliderfn.bind(this,'li4')}>
                    <View style={styles.button} ref={(e)=>{this.active['li4'] = e}}><Text style={styles.buttontxt}>控制状态栏网络活动状态</Text></View>
                    <View style={styles.buttonnextwrap} ref={(e)=>{this.upheight['li4'] = e}}>
                        <View style={styles.buttonnext} onTouchEnd={() => StatusBarIOS.setNetworkActivityIndicatorVisible(true)}><Text style={styles.buttontxt}>显示网络提示</Text></View>
                        <View style={styles.buttonnext} onTouchEnd={() => StatusBarIOS.setNetworkActivityIndicatorVisible(false)}><Text style={styles.buttontxt}>隐藏网络提示</Text></View>
                    </View>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    wrap: {
        
    },
    head: {
        paddingTop: 20,
        height: 64,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headtxt: {
        color:'#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        height: 44,
        backgroundColor: '#fe5800',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonnextwrap: {
        height:0,
        overflow: 'hidden',
    },
    buttonnext: {
        height: 34,
        backgroundColor: '#ae5900',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 1,
    },
    buttontxt: {
        color: '#fff',
    },
    li: {
        backgroundColor: '#ccc',
        marginBottom: 10,
    }
});

module.exports = StatusBarIOSComponent;