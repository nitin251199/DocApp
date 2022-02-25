import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import totalIcon from "../images/appointment-clip.jpg";
import todayIcon from "../images/pat-today-clip.jpg";
import ratingIcon from "../images/rating-icon.png";
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import SmsIcon from "@material-ui/icons/Sms";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { postData, ServerURL } from "../../FetchNodeServices";
import DocAppointments from "./DocAppointments";
import { Phone } from "@material-ui/icons";
import { SocketContext } from "../../../contexts/Context"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
  },
}));

const DocProfile2 = (props) => {
  const classes = useStyles();
  const { callUser,name, setName, } = useContext(SocketContext)
  const idToCall = JSON.parse(sessionStorage.getItem("me"))
 
  const [userData, setUserData] = React.useState([]);

  const u = JSON.parse(sessionStorage.getItem("docdetails"));

  const fetchUser = async () => {
    var body = { phoneno: u.phoneno };
    var result = await postData("doctor/checkdoctormobilenumber", body);
    setUserData(result.data[0]);
  };


  const [appointment, setAppointment] = useState([]);

  const fetchAppointmentsbyUser = async () => {
    var body = { doctor: u.doctorname };
    var result = await postData("appointment/fetchappointmentsbydoctor", body);
      setAppointment(result.data.sort((a, b) => new Date(Date.parse(b.date)) - new Date(Date.parse(a.date))))
    
  };

  useEffect(function () {
    fetchAppointmentsbyUser();
  }, []);

  useEffect(function () {
    fetchUser();
  }, []);

  
  return (
    <div>
      <div style={{ marginBottom: 75 }}>
        <Header history={props.history} />
      </div>

      <Grid container className={classes.root}>
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
          <span>Doctor Dashboard</span>
        </Grid>
        <Grid item xs={3} style={{ padding: 10 }}>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: 15,
              height: 170,
            }}
          >
            <Avatar
              variant="rounded"
              src={`${ServerURL}/images/${userData.picture}`}
              style={{ width: 100, height: 100, margin: 10 }}
            />
            <span style={{ fontSize: 18, letterSpacing: 1, paddingBottom: 3 }}>
              <b>{userData.doctorname}</b>
            </span>
            <span style={{ color: "gray" }}>
              <span
                style={{
                  fontSize: 14,
                  borderRight: "1px  solid black",
                  paddingInline: 5,
                }}
              >
                {userData.department != null ? userData.department : "--"}
              </span>
              <span style={{ padding: 2, paddingInline: 5 }}>
                {userData.qualification != null ? userData.qualification : "--"}
              </span>
            </span>
        {/* <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() =>{ callUser(idToCall)
          setName(u.doctorname)}} className={classes.margin}>
                  Call
                </Button> */}
          </Paper>
        </Grid>
        <Grid item xs={9} style={{ padding: 10 }}>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              padding: 15,
              height: 200,
            }}
          >
            <Grid container spacing={2}>
              <Grid
                // onClick={() => {
                //   setGraphData(weightGraph);
                // }}
                item
                xs
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={ratingIcon} width="100" />
                <span style={{ padding: 20 }}>Ratings</span>
                <span
                  style={{ fontWeight: 800, fontSize: 22, color: "#3f50b5" }}
                >
                  4
                  <span style={{ fontSize: 22 }}> ⭐</span>
                </span>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid
                item
                xs
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={todayIcon} width="110" />
                <span style={{ padding: 20 }}>Today's Appointments</span>
                <span
                  style={{ fontWeight: 800, fontSize: 22, color: "#3f50b5" }}
                >
                  1
                </span>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid
                item
                xs
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={totalIcon} width="100" />
                <span style={{ padding: 20 }}>Total Appointments</span>
                <span
                  style={{ fontWeight: 800, fontSize: 22, color: "#3f50b5" }}
                >
                  {appointment.length}
                </span>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3} style={{ padding: 10 }}>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: 15,
              height: "auto",
            }}
          >
            <ListItem button dense>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>
                  Dashboard
                </span>
              </ListItemText>
            </ListItem>

            <ListItem button dense>
              <ListItemIcon>
                <FileCopyIcon />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>
                  Reports
                </span>
              </ListItemText>
            </ListItem>

            <ListItem button dense>
              <ListItemIcon>
                <LocalHospitalIcon />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>
                  Prescriptions
                </span>
              </ListItemText>
            </ListItem>

            <ListItem button dense onClick={()=>props.history.push("/blog")}>
              <ListItemIcon>
                <SmsIcon />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>
                  Add Blogs
                </span>
              </ListItemText>
            </ListItem>

            <ListItem button dense>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>Logout</span>
              </ListItemText>
            </ListItem>
          </Paper>
        </Grid>
        <Grid item xs={9} style={{ padding: 10 }}>
        <Paper
            elevation={3}
            style={{
              display: "flex",
              alignItems: "start",
            }}
          >
            <DocAppointments history={props.history}/>
            </Paper>
        </Grid>
      </Grid>

      <Footer history={props.history} />
    </div>
  );
};

export default DocProfile2;
