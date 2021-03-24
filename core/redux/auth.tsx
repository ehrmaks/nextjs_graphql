import { produce } from 'immer'
import { handleActions } from 'redux-actions'
import { takeEvery } from 'redux-saga/effects'
import createAsyncSaga, { asyncActionCreator, createAsyncAction } from '@/util/reduxUtils'
// import { getCurrentUserApi, loginApi } from '../api/saga/auth';

// 0. 더미 데이터
const dummyMyInfo = {
	name: '홍길동',
	age: 27,
}

// 1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/' 의 조합으로 구성합니다.
const prefix = 'auth/'

// 2. 액션타입에 대해서 정의합니다.
const LOG_IN = asyncActionCreator(`${prefix}LOG_IN`)
const GET_CURRENT_USER = asyncActionCreator(`${prefix}GET_CURRENT_USER`)

const LOG_OUT = `${prefix}LOG_OUT`
const UNLOAD_USER = `${prefix}UNLOAD_USER`

// 3. 액션함수에 대해서 정의합니다.
export const login = createAsyncAction(LOG_IN)
export const getCurrentUser = createAsyncAction(GET_CURRENT_USER)

// 4. saga 비동기 관련 함수가 필요할 경우 작성 합니다. (optional) saga함수들의 모음은 최하단에 나열합니다.
// const loginSaga = createAsyncSaga(login, loginApi);
const loginSaga = createAsyncSaga(login, {})
// const getCurrentUserSaga = createAsyncSaga(getCurrentUser, getCurrentUserApi);
const getCurrentUserSaga = createAsyncSaga(getCurrentUser, {})

// 5. 초기 상태 정의
const initialState = {
	data: null,
	loading: false,
	error: null,
}

// 6. 리듀서 정의
export default handleActions(
	{
		[LOG_IN.SUCCESS]: (state, action) =>
			produce(state, draft => {
				// draft.data = action.payload;
				draft.data = action.payload
				draft.loading = false
			}),
		[LOG_IN.FAILURE]: (state, action) =>
			produce(state, draft => {
				// draft.error = action.payload;
				draft.error = null
				draft.loading = false
			}),
		[LOG_OUT]: (state, action) =>
			produce(state, draft => {
				// draft.data = action.payload;
				draft.data = null
				draft.loading = false
			}),
		[GET_CURRENT_USER.SUCCESS]: (state, action) =>
			produce(state, draft => {
				// draft.data = action.payload;
				draft.data = null
				draft.loading = false
			}),
		[GET_CURRENT_USER.FAILURE]: (state, action) =>
			produce(state, draft => {
				// draft.error = action.payload;
				draft.error = null
				draft.loading = false
				draft.data = dummyMyInfo
			}),
		[UNLOAD_USER]: () => initialState,
	},
	initialState,
)

// 7. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* authSaga() {
	yield takeEvery(LOG_IN.REQUEST, loginSaga)
	yield takeEvery(GET_CURRENT_USER.REQUEST, getCurrentUserSaga)
}
