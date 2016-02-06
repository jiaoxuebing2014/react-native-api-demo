'use strict';

var React = require('react-native');

/*参考资料：https://github.com/sunnylqm/react-native-storage/blob/master/README-CHN.md*/
/*请在项目中：npm install react-native-storage --save*/

/*请勿使用require('react-native-storage')语法, 否则在react native 0.16版本中会报错.*/
import Storage from 'react-native-storage';

var {
    AsyncStorage,
    InteractionManager,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
} = React;

/*初始化*/
var storage = new Storage({
    //最大容量，默认值1000条数据循环存储
    size: 1000,    

    //数据过期时间，默认一整天（1000 * 3600 * 24秒）
    defaultExpires: 1000 * 3600 * 24,

    //读写时在内存中缓存数据。默认启用。
    enableCache: true,

    //如果storage中没有相应数据，或数据已过期，
    //则会调用相应的sync同步方法，无缝返回最新数据。
    sync : {
    //同步方法的具体说明会在后文提到
    }
});
//对于react native
//global.storage = storage;

var AsyncStorageComponect = React.createClass({
    getInitialState: function(){
        return {
            isacitve: false,
            ispost: false,
            buttontxt: '清除本地数据',
            init: []
        };
    },
    componentDidMount: function(){
        var self = this;
        
        /*Interactionmanager可以将一些耗时较长的工作安排到所有互动或动画完成之后再进行。这样可以保证JavaScript动画的流畅运行。*/
        InteractionManager.runAfterInteractions(() => {
            storage.sync = {
                newList(){
                    self.setState({buttontxt:'重新请求数据中...'});
                    fetch('http://88.studyteam.sinaapp.com/rnn/news_list.json')
                    .then( result => {
                        return result.json(); 
                    })
                    .then( json => {
                        if(json){
                            self.setState({
                                init: json,
                                buttontxt: '清除本地数据',
                                ispost: false,
                                isacitve: false,
                            });
                            storage.save({
                                key: 'newList',
                                rawData: json,
                                expires: 1000*3600
                            });
                        }else{
                            // 失败则调用
                            console.warn('数据异常');
                        }
                    })
                    .catch( err => {
                        console.warn(err);
                    });
                }
            };
            storage.load({
                key: 'newList',
                //autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
                autoSync: true,

                //syncInBackground(默认为true)意味着如果数据过期，
                //在调用同步方法的同时先返回已经过期的数据。
                //设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
                syncInBackground: true
            }).then(ret=>{
                self.setState({
                    init: ret
                });
            }).catch( err => {
                //如果没有找到数据且没有同步方法，
                //或者有其他异常，则在catch中返回
                console.warn(err);
            });
        });
    },
    cleardata: function(){
        if(this.state.ispost){
            this.componentDidMount();
        }else{
            this.setState({
                init: [],
                buttontxt: '重新请求并存到本地',
                ispost: true,
                isacitve: false
            });
            storage.remove({
                key: 'newList'
            });
        }
    },
    render: function(){
        return (
            <View style={styles.wrap}>
                <ScrollView automaticallyAdjustContentInsets={false} style={{height:350}}>
                    {this.state.init.map((value,key)=>
                        <View style={styles.li} key={key}>
                            <View style={styles.lileft}>
                                <Image style={styles.image} source={{uri:value.pic}} />
                                <View style={styles.alt}>
                                    <Text style={styles.alttext}>{value.id}</Text>
                                </View>
                            </View>
                            <View style={styles.liright}>
                                <View style={styles.h1}><Text style={styles.h1text}>{value.title}</Text></View>
                                <View style={styles.dec}><Text style={styles.dectext}>{value.summary}</Text></View>
                                <View style={styles.cet}><Text style={styles.cettext}>{value.title}</Text></View> 
                            </View>
                        </View>
                    )}
                </ScrollView>
                <View style={[styles.button,this.state.isacitve&&styles.buttoncurrent]} onTouchEnd={this.cleardata} onTouchStart={()=>this.setState({isacitve:true})}>
                    <Text style={styles.buttontext}>{this.state.buttontxt}</Text>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    wrap: {
        
    },
    li: {
        height: 110,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
    lileft: {
        
    },
    liright: {
        flex: 1,
        paddingLeft: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
    alt: {
        flex: 1,
        width: 100,
        height: 24,
        position: 'absolute',
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    alttext: {
        color: '#fff'
    },
    h1: {
        height: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
    h1text: {
       fontSize: 16, 
    },
    dec: {
        paddingTop: 10,
        paddingBottom: 10,
        height: 50,
    },
    cet: {
        
    },
    button: {
        width: 300,
        height: 44,
        backgroundColor: '#ff6600',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        alignSelf: 'center',
    },
    buttoncurrent: {
        backgroundColor: '#008aff'
    },
    buttontext: {
        color: '#fff'
    },
});

module.exports = AsyncStorageComponect;

