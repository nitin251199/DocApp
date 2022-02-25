import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DisplayAllDoctors from './DisplayAllDoctors';


export default function ListItems(props) {


const handleClick=(v)=>{
  props.setComponent(v)
}
    return(
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>


    <Accordion>
    <ListItem button onClick={()=>handleClick(<DisplayAllDoctors  setComponent={props.setComponent}/>)}>
          <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary="Doctors" />
      </ListItem>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        </AccordionSummary>
        <AccordionDetails>
          <Typography>

    {/* <ListItem button onClick={()=>handleClick(<DisplayAllStores  setComponent={props.setComponent}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Stores" />
    </ListItem> */}

    </Typography>
        </AccordionDetails>
      </Accordion>


</div>
)
}