const INITIAL_STATE=false


export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'REDIRECT':
            return state=true
        case 'FALSEREDIRECT':
            return INITIAL_STATE
        default:
            return state
    }
}