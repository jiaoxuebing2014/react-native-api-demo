
'use strict';

var React = require('react-native');

var {
    StyleSheet,
    View,
    Image,
    Text,
} = React;

var Loading = React.createClass({
    
    render : function(){
        return (
            <View style={styles.view}>
                <Image
                    style={styles.image}
                    source={{uri:'http://img.lanrentuku.com/img/allimg/1307/5-130H2191322-52.gif'}}
                />
                <Text>加载中...</Text>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    view:{
        alignItems: 'stretch',
        width: 200,
        height:100,
        position: 'absolute',
        top: 100,
        left: 100
    },
    image:{
        width: 40,
        height: 40
    },
});

module.exports = Loading;


