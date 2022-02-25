import { alpha, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import Footer from '../Footer';
import Header from '../Header';
import bpIcon from "../images/bp-clip.png";

const useStyles = makeStyles((theme) => ({
  search: {
    padding: 7,
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    border: '1px solid gray',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      border: '1px solid gray'
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export const DisplayBlogs = (props) => {
  const classes = useStyles();

  return <div>
    <div style={{marginBottom:75}}>
      <Header history={props.history} />
    </div>
      <Grid container >
      <Grid
          item
          xs={12}
          style={{
            backgroundColor: "#0a3f6d",
            padding: "15px 6rem",
            color: "#fff",
            fontSize: "27px",
            fontWeight: "800",
          }}
        >
          <span>Blogs</span>
        </Grid>
        <Grid item xs={8} style={{padding:20}}>
          <Paper elevation={3} style={{padding:20,marginBottom:20}}>
              <div style={{width:"100%",height:250,backgroundImage:'url(https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)'}}></div>
              <div style={{display:'flex',justifyContent:'space-between',padding:10}}>
                <span style={{fontWeight:800,color:'#3f51b5'}}>Dr. Akash Gupta<span style={{color:'gray',marginInline:5,fontWeight:400}}>MBBS, M.D.</span></span>
                <span>22/01/2022</span>
              </div>
              <div style={{fontWeight:800,fontSize:22,marginBottom:10}}>
                Heart Problems
              </div>
              <Typography variant="body1">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Typography>
          </Paper>
          <Paper elevation={3} style={{padding:20,marginBottom:20}}>
              <div style={{width:"100%",height:250,backgroundImage:'url(https://images.unsplash.com/photo-1611694554696-e5a46f5015bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)'}}></div>
              <div style={{display:'flex',justifyContent:'space-between',padding:10}}>
                <span style={{fontWeight:800,color:'#3f51b5'}}>Dr. Vipul Agarwal<span style={{color:'gray',marginInline:5,fontWeight:400}}>MBBS, Gold Medalist</span></span>
                <span>21/01/2022</span>
              </div>
              <div style={{fontWeight:800,fontSize:22,marginBottom:10}}>
                Covid 19 pandemic
              </div>
              <Typography variant="body1">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4} style={{padding:30,display:'flex',flexDirection:'column',gap:15}}>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Paper elevation={0} variant='outlined' style={{padding:20}}>
            <h3>Latest Posts</h3>
            <Paper elevation={0} variant='outlined' style={{display:'flex',flexDirection:'row',alignItems:'center',padding:10}}>
                <img src={bpIcon} width="80px" height="80px"/>
                <div style={{display:'flex',flexDirection:'column',padding:15}}>
                    <span style={{fontSize:18,fontWeight:'bold'}}>Heart Problems</span>
                    <span style={{color:'gray',fontSize:14}}>22/01/2022</span>
                </div>
            </Paper>
          </Paper>
          <Paper elevation={0} variant="outlined" style={{padding:20}}>
          <h2 style={{marginBottom:30}}>Categories</h2>
          <Button style={{textTransform:'capitalize',margin:5}} size="small" variant="outlined">Heart Care</Button>
          <Button style={{textTransform:'capitalize',margin:5}} size="small" variant="outlined">Children</Button>
          <Button style={{textTransform:'capitalize',margin:5}} size="small" variant="outlined">Disease</Button>
          <Button style={{textTransform:'capitalize',margin:5}} size="small" variant="outlined">Appointment</Button>
          <Button style={{textTransform:'capitalize',margin:5}} size="small" variant="outlined">Covid</Button>
          <Button style={{textTransform:'capitalize',margin:5}} size="small" variant="outlined">Cardiology</Button>
          <Button style={{textTransform:'capitalize',margin:5}} size="small" variant="outlined">Eye Care</Button>
          </Paper>
        </Grid>
      </Grid>
    <Footer history={props.history} />
  </div>;
};
