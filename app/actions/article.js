import * as types from '../constants/ActionTypes';

export function fetchArticles(category = 'Android', index = 1, isLoadMore, nowRead) {
	return dispatch => {
		if(!isLoadMore){
			dispatch(fetchArticleList(category));
		}
		let URL = `http://gank.io/api/data/${category}/10/${index}`;
		console.log(URL);
    fetch(URL).then(response => response.json())
      .then(responseData => {
        console.log(responseData);
					if(!isLoadMore){
						dispatch(receiveArticleList(responseData,category));
					} else {
						dispatch(receiveArticleListMore(responseData, category, nowRead));
					}
      }).catch((error) => {
			 		console.log('error');
			}).done();
	}
}

function fetchArticleList(category) {
	return {
		type: types.FETCH_ARTICLE_LIST,
		category: category,
		isRefreshing: true
	}
}

function receiveArticleList(rankList,category) {
	return {
		type: types.RECEIVE_ARTICLE_LIST,
		isRefreshing: false,
		category: category,
		rankList: rankList
	}
}

function receiveArticleListMore(rankList, category, nowRead) {
	return {
		type: types.RECEIVE_ARTICLE_LIST_MORE,
		isRefreshing: false,
		category: category,
		nowRead : nowRead,
		rankList: rankList
	}
}
