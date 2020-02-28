import {combineReducers} from 'redux'
import HeaderFooter from './headerfooterReducers'
import AuthenticationReducers from './AuthenticationReducers'


export default combineReducers({
    HeaderFooter:HeaderFooter,
    auth:AuthenticationReducers
})

