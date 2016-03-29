import React, {
  Component,
  StyleSheet,
  Text,
  Navigator,
  View
} from 'react-native';

import Home from './Home';
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let name = 'Home';
    let home = Home;
    return (
    <Navigator
     initialRoute={{ name: name, component: home }}
     configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
     renderScene={(route, navigator) => {
       let Component = route.component;
       return <Component {...route.params} navigator={navigator} />
     }} />
    );
  }
}


export{ App as default };
