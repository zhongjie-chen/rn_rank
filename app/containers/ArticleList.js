import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  RefreshControl,
  Dimensions,
  ListView,
  ScrollView,
  InteractionManager,
  ProgressBarAndroid,
  Image,
  View
} from 'react-native';
import RequestBuilder from '../http/RequestBuilder';
import {fetchArticles} from '../actions/article';

class ArticleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
  }

  render() {
    const {dispatch, read, category} = this.props;
    let nowRead;
    switch (category) {
      case 'Android':
        nowRead = read[0];
        break;
      case 'iOS':
        nowRead = read[1];
        break;
      default:
        nowRead = read[2];
    }
    let isFirstLoaded = nowRead.articleList.length == 0 ? false : true;
    return(

        <ListView
            renderFooter={this._renderFooter.bind(this, isFirstLoaded)}
            onEndReached={this._onEndReached.bind(this, dispatch, nowRead, category)}
            dataSource={this.dataSource.cloneWithRows(nowRead.articleList)}
            renderRow={this._renderRow.bind(this)}
            initialListSize={10}
            pageSize={nowRead.articleList.length}
            refreshControl={
                <RefreshControl
                  refreshing={nowRead.isRefreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                  progressBackgroundColor="#ffffff"/>}
          />

    );
  }

  componentWillMount(){
    InteractionManager.runAfterInteractions(() => {
      const {dispatch, category} = this.props;
      dispatch(fetchArticles(category));
    });
  }
  _onRefresh() {
    this.componentWillMount();
  }

  _renderRow(rowData,sectionID, rowID, highlightRow){
    return(
      <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onItemClick(rowData,rowID)}>
        <View style={{flexDirection:'row',padding:12,borderBottomWidth:StyleSheet.hairlineWidth,borderColor:'#c9c9c9'}}>
          <Image
            source = {{uri: rowData.small_photo}}
            style = {{height:80,width:120}}
          />
          <View style={{marginLeft:10,flex:1}}>
            <Text style={{fontSize: 18,fontWeight: 'bold',color:'black'}}>{rowData.who}</Text>
            <Text style={{flex:1}}>{rowData.desc}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  _onEndReached(dispatch, nowRead, category){
    InteractionManager.runAfterInteractions(() => {
      dispatch(fetchArticles(category, 2, true, nowRead));
    });
  }
  _renderFooter(isFirstLoaded){
    if(!isFirstLoaded){
      return;
    }
    if (1) {
      return (
        <View
          style={{
            marginVertical: 20,
            paddingBottom: 20,
            alignSelf: 'center'
          }}
        >
          <ProgressBarAndroid />
        </View>
      )
    } else {
      return (
        <View
          style={{
            marginVertical: 20,
            paddingBottom: 20,
            alignSelf: 'center'
          }}
        >
          <Text
            style={{
              color: 'rgba(0, 0, 0, 0.3)'
            }}
          >数据已结加载完了- -|||</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
export{ ArticleList as default };
