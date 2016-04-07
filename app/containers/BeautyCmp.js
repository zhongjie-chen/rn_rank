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
    StyleSheet,
    BackAndroid,
    Animated,
    Easing,
} from 'react-native';

import {fetchBeauty} from '../actions/beauty';
import {connect} from 'react-redux';

class BeautyCmp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          progressValue: new Animated.Value(0)
        };
        const {navigator} = this.props;
        BackAndroid.addEventListener('hardwareBackPress', () =>{
         this._onBackClick(navigator);
         return true;
        });
    }

    componentDidMount() {
        Animated.timing(this.state.progressValue, {
            toValue: width * 0.8,
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

    _onBackClick(navigator){
      if(navigator) {
        navigator.pop();
      }
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
    _getImages(items){
      // if(items){
      //   this._onLoadEnd();
      // }
      return(
        items.map((item,i)=>{
          return(
            <Image key = {i} style={{height:parseInt(Math.random() * 20 + 12) * 10,width:width/2, margin:4}} source = {{uri :item.url}}></Image>
          )
        })
      )
    }
    render() {
      const {beautyReducers, navigator} = this.props;
      return (
              <View style={{flex :1}}>
                <View style = {styles.headerBar}>
                  <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onBackClick(navigator)}>
                    <Image style = {styles.iconImage} source = {require('../../images/icon_back.png')}></Image>
                  </TouchableHighlight>
                  <Text style = {styles.headerText}>福利</Text>
                </View>
                <Animated.View style = {{height: 2, backgroundColor: '#27B5EE', width: this.state.progressValue}}>
                </Animated.View>
                <ScrollView>
                  <View style = {{flexDirection : 'row'}}>
                    <View>
                      {this._getImages(beautyReducers.beauty.slice(0, 10))}
                    </View>
                    <View>
                      {this._getImages(beautyReducers.beauty.slice(10, 20))}
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
