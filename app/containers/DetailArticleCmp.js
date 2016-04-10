import React, {
    View,
    Text,
    Image,
    WebView,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    ProgressBarAndroid,
    Dimensions,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';


class DetailArticleCmp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isCanBack : false,
          progressValue: new Animated.Value(0)
        };
        const {navigator} = this.props;
    }

    componentDidMount() {
        Animated.timing(this.state.progressValue, {
            toValue: width * 0.8,
            duration: 1500,
            easing: Easing.linear
        }).start();
    }

    _onBackClick(navigator){
      if(this.state.isCanBack){
        this.refs.webview.goBack();
        return;
      }
      if(navigator) {
          navigator.pop();
        }
    }

    _onNavigationStateChange (navState){
      this.setState({
        isCanBack : navState.canGoBack
      });
    }

    _renderLoading(){
      console.log('_renderLoading');
    }

    _onLoadEnd (){
      this.setState({
        progressValue : width
      })
    }

    render() {
      const {rowData, navigator} = this.props;
      return (
              <View style={{flex :1}}>
                <View style = {styles.headerBar}>
                  <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onBackClick(navigator)}>
                    <Image style = {styles.iconImage} source = {require('../../images/icon_back.png')}></Image>
                  </TouchableHighlight>
                  <Text style = {styles.headerText}>{rowData.desc}</Text>
                </View>
                <Animated.View style = {{height: 2, backgroundColor: '#27B5EE', width: this.state.progressValue}}>
                </Animated.View>
                <WebView
                  ref = 'webview'
                  style = {{flex:1}}
                  source = {{uri: rowData.url}}
                  onNavigationStateChange  = {(navState) => this._onNavigationStateChange (navState)}
                  onLoadEnd  = {() => this._onLoadEnd () }
                  renderLoading = {() => this._renderLoading()}
                />
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
export { DetailArticleCmp as default}
