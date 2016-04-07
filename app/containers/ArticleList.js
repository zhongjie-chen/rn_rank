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
import DetailArticleCmp from './DetailArticleCmp';
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
            style={{flex: 1}}
            renderFooter={this._renderFooter.bind(this, isFirstLoaded)}
            onEndReached={this._onEndReached.bind(this, dispatch, nowRead, category)}
            dataSource={this.dataSource.cloneWithRows(nowRead.articleList)}
            renderRow={this._renderRow.bind(this)}
            //renderSectionHeader  = {this._renderSectionHeader.bind(this)}
            initialListSize={10}
            onEndReachedThreshold={10}
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

  _onItemClick(rowData,rowID){
    const { navigator } = this.props;
    if(navigator) {
        navigator.push({
            name: 'DetailArticleCmp',
            component: DetailArticleCmp,
            params:{
              rowData
            }
        })
    }
  }
  _renderSectionHeader(sectionData, sectionID){
    retrun(
      <View>
        <Text>123</Text>
      </View>
    )

  }
  _renderRow(rowData, sectionID, rowID, highlightRow){
    return(
      <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onItemClick(rowData,rowID)}>
        <View style={{flexDirection:'row',padding:12,borderBottomWidth:StyleSheet.hairlineWidth,borderColor:'#c9c9c9'}}>
          <Image
            source = {{uri: rowData.small_photo}}
            style = {{height:80,width:120}}
          />
          <View style={{marginLeft:10,flex:1}}>
            <Text style={{fontSize: 15,fontWeight: 'bold',color:'black'}}>{rowData.desc}</Text>
            <View style={{marginTop: 4, justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{}}>{'作者：' + rowData.who}</Text>
              <Text style={{}}>{this._formatDate(rowData.publishedAt)}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  _onEndReached(dispatch, nowRead, category, index){
    if(typeof(nowRead) == 'undefined' || nowRead.isFirstLoaded){
      return;
    }
    InteractionManager.runAfterInteractions(() => {
      dispatch(fetchArticles(category, nowRead.index + 1, true, nowRead));
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
  _formatDate (strTime) {
    var date = new Date(strTime);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
export{ ArticleList as default };
