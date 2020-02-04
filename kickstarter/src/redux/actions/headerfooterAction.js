

export const changeHeaderAction = (header) =>{
    return{
        type:'HEADER_STATE',
        payload:header
    }
}

export const changeFooterAction = (footer) =>{
    return{
        type:'FOOTER_STATE',
        payload:footer
    }
}