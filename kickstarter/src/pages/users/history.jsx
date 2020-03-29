import React from 'react';
import './../../css/history.css'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useEffect } from 'react';
import {changeHeaderAction} from './../../redux/actions'
import {useDispatch} from 'react-redux'
import HistoryDonate from './historydonate'
import HistorySupporterProject from './historysupporterproject'


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 224,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));

export default function HistoryUsers(props){

    const classes = useStyles();

    const dispatch = useDispatch()

    const [value, setValue] = React.useState(0);

    useEffect(()=>{
        dispatch((changeHeaderAction(1)))
    },[])

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    


    return (
        <div className='history-box'>
            <div className={classes.root} style={{height:'100%'}}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    style={{width:'25vh'}}
                >
                    <Tab label="YOUR DONATE HISTORY" {...a11yProps(0)} style={{marginBottom:'30px',marginTop:'20px'}}/>
                    <Tab label="YOUR PROJECT SUPPORTERS" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <HistoryDonate/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <HistorySupporterProject/>
                </TabPanel>
            </div>
        </div>
    )
}
