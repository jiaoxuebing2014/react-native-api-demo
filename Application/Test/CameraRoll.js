'use strict';

var React = require('react-native');
var {
    CameraRoll,
    StyleSheet,
    View,
    Text,
} = React;

var CameraRollComponent = React.createClass({
    getInitialState: function(){
        return {
            photos: []
        };
    },
    onpenCamera: function(){
        var self = this;
        var fetchParams = {
            first: 5,//获取数据个数
            groupTypes: React.PropTypes.oneOf([//数据的分组类型，可以是数组中的任意一个
                'Album',
                'All',
                'Event',
                'Faces',
                'Library',
                'PhotoStream',
                'SavedPhotos'
            ]),
            assetType: React.PropTypes.oneOf([//资源类型，可以是数组中的任意一个
                'Photos',
                'Videos',
                'All'
            ]),
        };
        CameraRoll.getPhotos(
            fetchParams,
            function(data){
                var edges = data.edges;
                var photos = [];
                for(var i in edges){
                    photos.push(edges[i].node.image.uri)
                }
                self.setState({
                    photos: photos,
                });
            },
            function(){
                alert('获取图片失败')
            }
        )
    },
    render: function(){
        return (
            <View style={styles.wrap}>
                
                <View style={styles.button} onTouchEnd={this.onpenCamera}>
                    <Text style={styles.buttontxt}>打开相册</Text>
                    
                </View>
                <Text>{this.state.photos}</Text>
            </View>
        );
    }
}); 

var styles = StyleSheet.create({
    wrap: {
        paddingTop: 64,
    },
    button: {
        width: 280,
        height: 44,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff9c00',
        borderRadius: 5,
    },
    buttontxt: {
        color: '#fff',
        fontSize: 16,
    },
});

module.exports = CameraRollComponent;