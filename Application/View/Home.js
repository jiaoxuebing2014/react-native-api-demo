
'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio').get();

var {
    height,
    width,
} = Dimensions.get('window');

var {
    StyleSheet,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Image,
    View,
    Text,
    ListView,
} = React;

var Home = React.createClass({
    getInitialState:function(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            'dataSource'    : ds.cloneWithRows(['row 1', 'row 2','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐']),
            'selectedTab'   : 'news',
            'isRefreshing'  : false,
            'isCurrent'     : false,
            'textInfoWidth' : {},
            'textInfoLeft'  : [],
            'moveText'      : {
                'width'     : 0,
                'left'      : 0
            },
            'headlist'      : ['头条','上海娱乐','娱乐','上海','头条娱乐','上海','头条娱乐']
        };
    },
    setMoveLeft:function(event){
        this.setState({
            'moveText'  : {
                'width' : this.state.textInfoWidth[event.nativeEvent.target],
                'left'  : this.state.textInfoLeft[event.nativeEvent.target],
            }
        });
    },
    setTextInfo:function(e){
        
        this.state.textInfoWidth[e.nativeEvent.target]=e.nativeEvent.layout.width;
        this.state.textInfoLeft[e.nativeEvent.target]=e.nativeEvent.layout.x;
    },  
    
    render:function(){
        return(
            <View style={styles.homewrap}>
                <View style={styles.header}>
                    <ScrollView
                        style={styles.headerscroll}
                        bounces={true} 
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        automaticallyAdjustContentInsets={false}
                        horizontal={true}
                    >
                        <Text style={[styles.headtextmovecurrent,{width:this.state.moveText.width,left:this.state.moveText.left}]}></Text>
                        {this.state.headlist.map((value,key)=>
                            <Text style={styles.headtext} key={key} onLayout={this.setTextInfo} onTouchStart={this.setMoveLeft}>{value}</Text>
                        )}
                    </ScrollView>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData}</Text>}
                ></ListView>
            </View>
        );
    },
    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({
                isRefreshing: false,
            });
        }, 3000);
    },
});

var styles = StyleSheet.create({
    homewrap:{
        flex:1,
        flexDirection:'column',
    },
    header:{
        height:64,
        paddingTop:20,
        borderBottomColor:'#b9b9b9',
        borderBottomWidth:0.5,
        
    },
    headerscroll:{
        marginLeft:10,
        marginRight:10,
        flex:1,
    },
    headtext:{
        flex:1,
        lineHeight:30,
        fontSize:16,
        fontWeight:'bold',
        paddingLeft:7,
        paddingRight:7,
        borderRadius:8,
        position:'relative',
        backgroundColor:'transparent',
        
    },
    headercurren:{
        color:'#2b61c0'
    },
    headtextmovecurrent:{
        width:45,
        height:20,
        borderRadius:8,
        backgroundColor:'#ccc',
        position:'absolute',
        top:12,
    },
    scrollcontent:{
        marginBottom:48,
        flex:1,
    },
    li:{
        flexDirection:'row',
        margin:10,
        marginBottom:0,
        paddingBottom:10,
        borderBottomWidth:0.5,
        borderBottomColor:'#d7d7d7',
        height:70
    },
    imageleft:{
        width:75,
        height:60
    },
    textright:{
        marginLeft:8,
        flex:1,
    },
    textright1:{
        fontSize:14,
        color:'#141414'
    },
    textright2:{
        height:40,
        fontSize:12,
        lineHeight:20,
        color:'#74787b'
    }
});

module.exports = Home;