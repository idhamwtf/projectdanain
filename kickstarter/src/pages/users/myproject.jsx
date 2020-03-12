import React from 'react';
import Progressbar from '../../components/progressbar'
import {useSelector, useDispatch} from 'react-redux'

// style={{height:'60%', width:'75%', margin:'15px 10%'}} 
const MyProject =()=>{

    const {username,id,role} = useSelector(state=>state.auth)

    useEffect(()=>{
        dispatch(changeHeaderAction(1))
        // console.log(id)
        // dispatch(changeFooterAction(1))
    },[])







    return(
    <div style={{height:'150vh', width:'100vh', margin:'5px'}}>
        <img style={{height:'50vh',width:'100%'}} src="https://ksr-static.imgix.net/8v9uwida-valor_anthology.png?ixlib=rb-2.1.0&auto=compress%2Cformat&w=1000&fit=min&s=4bcc268b184adad6cba9bb23fc75c1e7" alt=""/>
        <Progressbar value='30' height='15px' color='secondary' />
        <div className='mt-3' style={{textAlign:'left', fontSize:'24px', fontWeight:'600'}}>Valor Anthology : Volume 3</div>
        <div className='mt-3' style={{textAlign:'left', fontSize:'18px', fontWeight:'500'}}>Fairy-tale comics starring courageous heroines</div>
        <div className='mt-3' style={{textAlign:'left', fontSize:'13px', fontWeight:'500', color:'#757575'}}>By {username}</div>
    </div>
    )
}


export default MyProject;