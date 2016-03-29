import React, {
  Component,
  StyleSheet,
  Text,
  DrawerLayoutAndroid,
  TouchableHighlight,
  Dimensions,
  Image,
  View
} from 'react-native';
class Home extends React.Component {

  constructor(props) {
    super(props);
     this.navigator = this.props.navigator;
  }

  _onHomeClick(){

  }

  _onMenuClick(){
    this.refs.drawer.openDrawer()
  }

  render() {
    let navigationView = (
      <View style = {styles.container}>
        <Image style = {styles.headerImage} source = {require('../../images/bg_drawer_header.png')} />
        <TouchableHighlight underlayColor = "rgba(34, 26, 38, 0.1)" onPress={() => this._onHomeClick()}>
          <View style = {styles.item}>
            <Image style = {styles.iconHomeImage} source = {require('../../images/icon_home.png')}></Image>
            <Text style = {styles.itemText}>首页</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        ref="drawer"
        drawerWidth = {width*0.8}
        drawerPosition = {DrawerLayoutAndroid.positions.Left}
        renderNavigationView = {() => navigationView}>
        <View style = {{flex: 1}}>
          <View style = {styles.headerBar}>
            <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onMenuClick()}>
              <Image style = {styles.iconImage} source = {require('../../images/ic_menu.png')}></Image>
            </TouchableHighlight>
            <Text style = {styles.headerText}>干货分享</Text>
          </View>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerImage: {
    height: height/5,
    width: width*0.8,
    backgroundColor: '#27B5EE',
    marginBottom: 20
  },
  item: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(34, 26, 38, 0.1)'
  },
  iconHomeImage: {
    height: 30,
    margin: 8,
    width: 30
  },
  itemText: {
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 16
  },
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
    fontSize: 25,
    color: 'white',
    marginLeft: 10
  }
});

export{ Home as default };
