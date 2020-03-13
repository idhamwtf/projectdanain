const INITIAL_STATE=true


export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'LOADING':
            return state=false
        default:
            return state
    }
}