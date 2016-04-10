import React, {
    View,
    Text,
    Image,
    WebView,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    InteractionManager,
    ProgressBarAndroid,
    Dimensions,
    Navigator,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';

import {fetchBeauty} from '../actions/beauty';
import {connect} from 'react-redux';
import ImageDetailCmp from './ImageDetailCmp';
import Lightbox from 'react-native-lightbox';
class BeautyCmp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          progressValue: new Animated.Value(0)
        };
    }

    componentDidMount() {

        Animated.timing(this.state.progressValue, {
            toValue: width,
            duration: 1500,
            easing: Easing.linear
        }).start();
    }

    componentWillMount(){
      //InteractionManager.runAfterInteractions(() => {
        const {dispatch} = this.props;
        dispatch(fetchBeauty());
    //  });
    }

    _onBackClick(){
      const {navigator} = this.props;
      if(navigator) {
        navigator.pop();
      }
      return true;
    }


    _onLoadEnd (){
      this.setState({
        progressValue : width
      })
    }

    _getChildrenStyle() {
      return {
        width: (screenWidth - 18) / 2,
        height: parseInt(Math.random() * 20 + 12) * 10,
        backgroundColor: 'rgb(92, 67, 155)',
        paddingTop: 20,
        borderRadius: 8
      };
  }

  _onRefreshClick(){
    this.componentWillMount()
  }
  _onImageClick(item, navigator){
    if(navigator){
      navigator.push({
        name:'ImageDetailCmp',
        component : ImageDetailCmp,
        params: {
          image:item
        }
      })
    }
  }
    _getImages(items, navigator){
      return(
        items.map((item,i)=>{
          return(
            <TouchableOpacity key = {i}   style={{padding:2}} onPress = {()=>this._onImageClick(item,navigator)}>
              <Image  key = {i} style={{height:parseInt(Math.random() * 20 + 12) * 10,width:(width-8)/2}} source = {{uri :item.url}}>
              </Image>
            </TouchableOpacity>

          )
        })
      )
    }
    render() {
      const {beautyReducers, navigator} = this.props;
      //navigator.props.configureScene = ((route, routeStack) => Navigator.SceneConfigs.FadeAndroid);
      return (
              <View style={{flex :1}}>
                <View style = {styles.headerBar}>
                  <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onBackClick()}>
                    <Image style = {styles.iconImage} source = {require('../../images/icon_back.png')}></Image>
                  </TouchableHighlight>
                  <Text style = {styles.headerText}>福利</Text>
                  <TouchableHighlight style = {{right :0}} underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onRefreshClick()}>
                    <Image style = {styles.iconImage} source = {require('../../images/ic_refresh.png')}></Image>
                  </TouchableHighlight>
                </View>
                <Animated.View style = {{height: 2, backgroundColor: '#27B5EE', width: this.state.progressValue}}>
                </Animated.View>
                <ScrollView>
                  <View style = {{flexDirection : 'row'}}>
                    <View>
                      {this._getImages(beautyReducers.beauty.slice(0, 6), navigator)}
                    </View>
                    <View>
                      {this._getImages(beautyReducers.beauty.slice(6, 12), navigator)}
                    </View>

                  </View>
                </ScrollView>
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
    justifyContent:'space-between',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    marginLeft: 10
  }
});
function mapStateToProps(state) {
  const {beautyReducers} = state;
  return {
    beautyReducers
  }
}
export default connect(mapStateToProps)(BeautyCmp);
