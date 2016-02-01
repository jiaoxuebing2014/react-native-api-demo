
'use strict';
//react 宽度基于pt为单位

/*
1.react 宽度基于pt为单位， 可以通过Dimensions 来获取宽高，PixelRatio 获取密度，如果想使用百分比，可以通过获取屏幕宽度手动计算。
2.基于flex的布局
    view默认宽度为100%
    水平居中用alignItems, 垂直居中用justifyContent
    基于flex能够实现现有的网格系统需求，且网格能够各种嵌套无bug
3.图片布局
    通过Image.resizeMode来适配图片布局，包括contain, cover, stretch
    默认不设置模式等于cover模式
    contain模式自适应宽高，给出高度值即可
    cover铺满容器，但是会做截取
    stretch铺满容器，拉伸
4.定位
    定位相对于父元素，父元素不用设置position也行
    padding 设置在Text元素上的时候会存在bug。所有padding变成了marginBottom
5.文本元素
    文字必须放在Text元素里边
    Text元素可以相互嵌套，且存在样式继承关系
    numberOfLines 需要放在最外层的Text元素上，且虽然截取了文字但是还是会占用空间
*/
var React = require('react-native');
var Dimensions = require('Dimensions'); //获取宽高
var PixelRatio = require('PixelRatio'); //获取密度

var {
    StyleSheet,
    ScrollView,
    Image,
    View,
    Text,
} = React;

var Layout = React.createClass({
    getInitialState: function(){
        return {
            'string'    : 5,
            'postLeft'  : 185
        };
    },
    textClick: function(){
        this.setState({
            'string'    : Math.floor(Math.random() * (5 - 1 + 1)) + 1,
            'postLeft'  : Math.floor(Math.random() * (280 - 1 + 1)) + 1
        });
    },
    render : function(){
        var {
            width,
            height,
        } = Dimensions.get('window');
        
        var str = '文字';
        for(var i=0;i<this.state.string;i++){
            str += str;
        }
        var string = str+'最后一个文字';                                                                 //文字字数不定
        var postLeft = this.state.postLeft;                                                            //后端给的定位值
        var iconWidth = 25;                                                                            //图标ICON
        var paddingWidth = 20;                                                                         //文字区域两边设置的paddingLeft paddingRight
        var spaceWidth = 10;                                                                           //离边留个10dt
        var fizeWidth = 12;                                                                            //文字大小
        
        var dir = postLeft>=(width/2);                                                                 //标签位置条件
        var absWidth = dir?Math.abs(width-postLeft):postLeft; 
        
        var conditionTextWidth = (string.length*fizeWidth+paddingWidth+iconWidth+spaceWidth+absWidth)>=width;   //文字个数*文字大小+文字区域padding值+Icon宽度+（留个10）
        
        var textWidth = conditionTextWidth?(width-spaceWidth-absWidth-(dir?0:iconWidth)):(string.length*fizeWidth+paddingWidth);   //设置文本区域宽度
        
        var direction = dir?{right:25}:{left:25};                                                       //标签位置
        
        
        return (
            <ScrollView style={[styles.mainView]}>
            
                <View style={{flex: 1,height:100,backgroundColor: '#fe0000', alignItems:'center', justifyContent:'center'}}>
                    <Image style={{width:100, height: 100, resizeMode: Image.resizeMode.cover}} source={require('../Img/img.png')} />
                </View>
                <Text>宽度单位和像素密度</Text>
                <Text>
                    window.width={Dimensions.get('window').width + '\n'}
                    window.height={Dimensions.get('window').height + '\n'}
                    pxielRatio={PixelRatio.get()}
                </Text>
                    
                <Text style={styles.title}>文字定位布局例子</Text>
                <View style={{height:100}}>
                    <View style={{width:25,height:25,position:'absolute',top:10,left:postLeft}}>
                        <View style={[{position:'absolute',top:0,backgroundColor:'blue',width:textWidth,paddingLeft:10,paddingRight:10,borderRadius:5,paddingTop:5,paddingBottom:5},direction]}>
                            <View style={[{width:0,height:0,borderWidth:5,position:'absolute',top:5,borderLeftColor:'#fff',borderRightColor:'blue',borderTopColor:'#fff',borderBottomColor:'#fff'},dir?{right:-10,borderRightColor:'#fff',borderLeftColor:'blue'}:{left:-10}]}></View>
                            <Text style={{fontSize:fizeWidth,color:'#fff'}}>{string}</Text>
                        </View>
                        <View style={[{width:25,height:25,backgroundColor:'red',borderRadius:12.5,position:'absolute'},dir?{left:5}:{left:-5}]}>
                            <View style={{width:10,height:10,backgroundColor:'#fff',borderRadius:5,position:'absolute',left:7.5,top:7.5}}></View>
                        </View>
                    </View>
                </View>
                <View style={{width:100,height:44,backgroundColor:'red',marginLeft:(width-100)/2,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#fff'}} onTouchEnd={this.textClick}>点击</Text>    
                </View>

                <Text style={styles.title}>根节点上放一个元素，不设置宽度</Text>
                <View style={{height: 20, backgroundColor: '#333333'}}></View>

                <Text style={styles.title}>固定宽度的元素上放一个View，不设置宽度</Text>
                <View style={{width: 100}}>
                    <View style={{height: 20, backgroundColor: '#333333'}} />
                </View>

                <Text style={styles.title}>flex的元素上放一个View，不设置宽度</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <View style={{height: 20, backgroundColor: '#333333'}} />
                    </View>
                    <View style={{flex: 1,backgroundColor: '#cccccc',borderWidth:1}}/>
                </View>

                <Text style={styles.title}>水平居中</Text>
                <View style={{height:100,alignItems:"center",backgroundColor:'#ccc'}}>
                    <View style={{width:30,height:30,backgroundColor:'#fff',borderRadius:15}}></View>
                </View>

                <Text style={styles.title}>垂直居中</Text>
                <View style={{height:100,justifyContent:'center',backgroundColor:'#ccc'}}>
                    <View style={{width:30,height:30,backgroundColor:'#fff',borderRadius:15}}></View>
                </View>

                <Text style={styles.title}>水平垂直居中</Text>
                <View style={{height:100,alignItems:'center',justifyContent:'center',backgroundColor:'#ccc'}}>
                    <View style={{width:30,height:30,backgroundColor:'#fff',borderRadius:15}}></View>
                </View>

                <Text style={styles.title}>等分的网格布局</Text>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1,height:30,backgroundColor:'#666'}}>
                        <Text style={{fontSize:20,textAlign:'center',margin:5}}>Tab1</Text>
                    </View>
                    <View style={{flex:1,height:30,backgroundColor:'#333'}}>
                        <Text style={{fontSize:20,textAlign:'center',margin:5}}>Tab2</Text>
                    </View>
                    <View style={{flex:1,height:30,backgroundColor:'#999'}}>
                        <Text style={{fontSize:20,textAlign:'center',margin:5}}>Tab3</Text>
                    </View>
                </View>

                <Text style={styles.title}>左边固定， 右边固定，中间flex的布局</Text>
                <View style={{flexDirection:'row'}}>
                    <View style={{width:70,height:30,backgroundColor:'#666'}}>
                        <Text style={{fontSize:20,textAlign:'center',margin:5}}>Tab1</Text>
                    </View>
                    <View style={{flex:1,height:30,backgroundColor:'#333'}}>
                        <Text style={{fontSize:20,textAlign:'center',margin:5}}>Tab2</Text>
                    </View>
                    <View style={{width:60,height:30,backgroundColor:'#999'}}>
                        <Text style={{fontSize:20,textAlign:'center',margin:5}}>Tab3</Text>
                    </View>
                </View>

                <Text style={styles.title}>嵌套的网格</Text>
                <View style={{height:200,flexDirection:'row',backgroundColor:'#eeeeee'}}>
                    <View style={{flex:1,flexDirection:'column',padding:15}}>
                        <View style={{flex:1,backgroundColor:'#bbaaaa',transform:[{rotateZ:'45deg'}]}} />
                        <View style={{flex:1,backgroundColor:'#aabbaa'}} />
                    </View>
                    <View style={{flex:1,flexDirection:'column',padding:15}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <View style={{flex:1,backgroundColor:'#eebbaa'}}/>
                                <View style={{flex:1,backgroundColor:'#bbccee'}}/>
                            </View>
                            <View style={{flex:1,backgroundColor:'#aac2d9',flexDirection:'row'}}>
                                <View style={{flex:1,flexDirection:'column',padding:5,paddingRight:2.5}}>
                                    <View style={{flex:1,backgroundColor:'#bbaaaa'}}/>
                                    <View style={{flex:1,backgroundColor:'#aabbaa'}}/>
                                </View>
                                <View style={{flex:1,flexDirection:'column',padding:5,paddingLeft:2.5}}>
                                    <View style={{flex:1,backgroundColor:'#bbaaaa'}}/>
                                    <View style={{flex:1,backgroundColor:'#aabbaa'}}/>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:1,backgroundColor:'#eebbdd'}}/>
                            <View style={{flex:1,backgroundColor:'#bbccdd'}}>
                                <ScrollView>
                                    <View style={{height:20}}></View>
                                    <Text style={{color:'#ffffff'}}>
                                        {(function(){
                                            var str = '';
                                            var n = 100;
                                            while(n--){
                                                str += '嵌套的网格'+'\n';
                                            }
                                            return str;
                                        }())}
                                    </Text>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    mainView:{
        marginTop: 20,
        marginBottom: 20,
    },
    title:{
        marginTop:20,
        fontSize:10,
    },

});

module.exports = Layout;
