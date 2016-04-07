import * as types from '../constants/ActionTypes';

const initialState = {
	loading: false,
	beauty: []
}

export default function beautyReducers(state = initialState,  action) {
	switch (action.type) {
		case types.RECEIVE_BEAUTY_LIST:
			console.log(111);
			return Object.assign({}, state, {
				loading: true,
				beauty: action.beauty
			});
		// case types.RECEIVE_TYPE_LIST:
		// 	return Object.assign({}, state, {
		// 		loading: false,
		// 		typeList: action.typeList
		// 	})
		break;
		default:
			return state;
	}
}
