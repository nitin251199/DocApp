import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ServerURL } from '../../../FetchNodeServices';
import { Button, CardActionArea, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 240,
    
  },
  media: {
    height: 0,
    paddingTop: '70%', 
    paddingBottom: '0%', 
    '&:hover': {
      transition: "0.3s all",
      transform: "scale(1.1)"
    }
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function DocCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [docDetails, setDocDetails] = React.useState(props.docData)

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  

  return (
    <Card className={classes.root}  >
      <CardActionArea>
      {/* <CardHeader
        // avatar={
        //   <Avatar aria-label="name" className={classes.avatar}>
        //     {docDetails.doctorname.substring(0,1)}
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        
      /> */}
      <CardMedia
        className={classes.media}
        image={`${ServerURL}/images/${docDetails.picture}`}
        title={`Dr. ${docDetails.doctorname}`}
      />
      <CardContent>
        <Typography variant="body1" >
          <b>{`Dr. ${docDetails.doctorname}`}</b>
        </Typography>
        <Typography gutterBottom variant="body2">
          {docDetails.department}
        </Typography>
        <Typography variant="subtitle" color="textSecondary" component="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Typography>
        &nbsp;
        <Divider />
      </CardContent>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon style={{ color: 'red', }} />
        </IconButton>
        <IconButton aria-label="share" >
          <FacebookIcon style={{ color: '#3b5998', }} />
        </IconButton>
        <IconButton aria-label="share">
          <TwitterIcon style={{ color: '#00acee', }} />
        </IconButton>
        <IconButton aria-label="share">
          <EmailIcon style={{ color: '#DB4437', }} />
        </IconButton>
      {/* <Button onClick={props.clicked} variant='contained' size="large" color="primary" fullWidth disableElevation>Book Appointment</Button> */}
      </CardActionArea>
    </Card>
  );
}