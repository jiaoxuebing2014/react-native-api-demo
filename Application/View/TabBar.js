
'use strict';

var React = require('react-native');
var LoadingView = require('../Component/Loading');
var HomeView = require('../View/Home');

var {
    StyleSheet,
    TabBarIOS,
    View,
    Text,
} = React;

var TabBar = React.createClass({
    
    /*定义初始状态*/
    getInitialState:function(){
        return {
            selectedTab:'news'
        };
    },
 
    render:function(){
        return(
            <TabBarIOS
                barTintColor="#eeeeee" 
                tintColor="#2b61c0">
                <TabBarIOS.Item 
                    style={{flexDirection:'column'}}
                    title="新闻中心" 
                    icon={require('../Img/icon/tab1_1.png')}
                    selectedIcon={require('../Img/icon/tab1_2.png')}
                    selected={this.state.selectedTab === 'news'}
                    onPress={() => {
                        this.setState({
                            selectedTab:'news'  
                        });         
                    }}>
                    {<HomeView />}
                </TabBarIOS.Item>
                <TabBarIOS.Item 
                    title="个人中心" 
                    icon={require('../Img/icon/tab4_1.png')}
                    selectedIcon={require('../Img/icon/tab4_2.png')}
                    selected={this.state.selectedTab==='centers'}
                    onPress={() => {
                        this.setState({
                            selectedTab:'centers'     
                        });         
                    }}>
                    <LoadingView />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
});

module.exports = TabBar;