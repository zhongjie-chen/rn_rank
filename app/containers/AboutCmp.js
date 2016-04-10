import React, {
    View,
    Text,
    Image,
    WebView,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    ProgressBarAndroid,
    Linking,
    Dimensions,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';


class AboutCmp extends React.Component {

    constructor(props) {
        super(props);
        const {navigator} = this.props;
    }



    _onBackClick(navigator){

      if(navigator) {
          navigator.pop();
        }
    }


    _onLinkClick(url){
      Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }


    render() {
      const {navigator} = this.props;
      return (
              <View style={{flex :1}}>
                <View style = {styles.headerBar}>
                  <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onBackClick(navigator)}>
                    <Image style = {styles.iconImage} source = {require('../../images/icon_back.png')}></Image>
                  </TouchableHighlight>
                  <Text style = {styles.headerText}>关于</Text>
                </View>
                <Image style={{alignSelf:'center',margin:40}} source = {require('../../images/ic_app.png')}></Image>
                <Text style={{alignSelf:'center',marginTop:-38,color:'#9c9c9c'}}>干货分享1.0.0</Text>
                <Text style={{alignSelf:'center',fontSize:18,margin:6}}>每日提供技术干货的App。</Text>
                <Text style={{alignSelf:'center',fontSize:14,margin:6}}>本App中所有数据均来自
                  <Text onPress={()=>this._onLinkClick('http://gank.io')}
                   style={{color:'#9c9c9c',fontSize:14,margin:6}}>@干货集中营。</Text>
                </Text>
                <Text style={{alignSelf:'center',fontSize:14,margin:6}} >作者：陈忠杰 杭州 328197444</Text>
                <Text style={{alignSelf:'center',fontSize:14,margin:6,color:'blue',}} onPress={()=>this._onLinkClick('mailto:czjchn@163.com')} >e-mail:czjchn@163.com</Text>
                <Text style={{alignSelf:'center',fontSize:14,color:'blue',margin:6}} onPress={()=>this._onLinkClick('https://github.com/zhongjie-chen')} >
                @Github</Text>
                <Text style={{alignSelf:'center',fontSize:14,color:'blue',margin:6}}  onPress={()=>this._onLinkClick('https://github.com/zhongjie-chen/rn_rank')} >
                @该项目开源地址</Text>
                <Text style={{alignSelf:'center',fontSize:14,margin:6}} >感谢
                <Text onPress={()=>this._onLinkClick('https://github.com/facebook/react-native')}
                 style={{color:'#9c9c9c',fontSize:14,margin:6}}>@React-native</Text>
                <Text onPress={()=>this._onLinkClick('http://toutiao.io/')}
                  style={{color:'#9c9c9c',fontSize:14,margin:6}}>@开发者头条</Text>
                <Text onPress={()=>this._onLinkClick('https://github.com/attentiveness/reading')}
                   style={{color:'#9c9c9c',fontSize:14,margin:6}}>@reading</Text>


                </Text>
              </View>
      );
    }
}
let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  iconImage: {
    height: 30,
    margin: 4,
    width: 30
  },
  headerBar: {
    backgroundColor: '#27B5EE',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    marginLeft: 10
  }
});
export { AboutCmp as default}
