const INITIAL_STATE={
    header:0,
    footer:0
}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'HEADER_STATE':
            return{...state,header:action.payload}
        case 'FOOTER_STATE':
            return{...state,footer:action.payload}
        default:
            return state
    }
}