import {combineReducers} from 'redux'
import HeaderFooter from './headerfooterReducers'
import AuthenticationReducers from './AuthenticationReducers'
import DataProjectReducers from './DataProjectReducers'
import Loading from './LoadingReducers'
import Redirect from './RedirectReducers'
import Admin from './adminReducers'


export default combineReducers({
    HeaderFooter:HeaderFooter,
    auth:AuthenticationReducers,
    DataProjectReducers:DataProjectReducers,
    Loading:Loading,
    Redirect:Redirect,
    admin:Admin

})

