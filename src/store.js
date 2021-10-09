import { createStore,applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'
const initialState = {
  sidebarShow: 'responsive',
  files:[]
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    case 'setFile':
      return {...state,...rest}  
    default:
      return state
  }
}
const middleware=[thunk]
const store = createStore(changeState,{},composeWithDevTools(applyMiddleware(...middleware)))
export default store