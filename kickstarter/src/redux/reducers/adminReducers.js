const INITIAL_STATE=[

]


export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'GET_BUKTI' :
            // console.log(state.getbukti)
            return state=action.payload
        default:
            return state
    }
}