const INITIAL_STATE=[

]


export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'DATAPROJECT_POST':
            return state=action.payload
        default:
            return state
    }
}