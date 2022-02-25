import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import weightIcon from "../images/weight-icon.png";
import tempIcon from "../images/temp-clip.png";
import bpIcon from "../images/bp-clip.png";
import glucoseIcon from "../images/glucose-clip.png";
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
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Edit from "@material-ui/icons/Edit";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import SmsIcon from "@material-ui/icons/Sms";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserDataChart from "./UserDataChart";
import { postData, ServerURL } from "../../FetchNodeServices";
import Appointments from "./Appointments";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
  },
}));

const UserProfile2 = (props) => {
  const classes = useStyles();
  const [openWeight, setOpenWeight] = React.useState(false);
  const [openTemp, setOpenTemp] = React.useState(false);
  const [openBp, setOpenBp] = React.useState(false);
  const [openGlucose, setOpenGlucose] = React.useState(false);
  const [userData, setUserData] = React.useState([]);
  const [userWeight, setUserWeight] = React.useState("");
  const [userTemp, setUserTemp] = React.useState("");
  const [userBpLow, setUserBpLow] = React.useState("");
  const [userBpHigh, setUserBpHigh] = React.useState("");
  const [userGlucose, setUserGlucose] = React.useState("");
  const [refresh, setRefresh] = useState(false);
  const [graphData, setGraphData] = React.useState([]);
  const [weightGraph, setWeightGraph] = useState([]);
  const [tempGraph, setTempGraph] = useState([]);
  const [glucoseGraph, setGlucoseGraph] = useState([]);
  const [bpGraph, setBpGraph] = useState([]);

  const u = JSON.parse(sessionStorage.getItem("userdetails"));

  const fetchUser = async () => {
    var body = { mobileno: u.mobileno };
    var result = await postData("userdetails/checkusermobilenumber", body);
    setUserData(result.data[0]);
  };

  const getWeight = async () => {
    var body = { usermobileno: u.mobileno };
    var result = await postData("userdetails/getweight", body);
    var array = [];
    result.graphdata.map((item) => {
      array.push(item.userweight);
    });
    setWeightGraph(array);
      setUserWeight(result.data[0].userweight);
  };
  const getTemp = async () => {
    var body = { usermobileno: u.mobileno };
    var result = await postData("userdetails/gettemp", body);
    var array = [];
    result.graphdata.map((item) => {
      array.push(item.usertemp);
    });
    setTempGraph(array);
    setUserTemp(result.data[0].usertemp);
  };
  const getGlucose = async () => {
    var body = { usermobileno: u.mobileno };
    var result = await postData("userdetails/getglucose", body);
    var array = [];
    result.graphdata.map((item) => {
      array.push(item.userglucose);
    });
    setGlucoseGraph(array);
    setUserGlucose(result.data[0].userglucose);
  };

  const getBp = async () => {
    var body = { usermobileno: u.mobileno };
    var result = await postData("userdetails/getbp", body);
    var array = [];
    result.graphdata.map((item) => {
      array.push(item.userbplow);
    });
    setBpGraph(array);
    setUserBpHigh(result.data[0].userbphigh);
    setUserBpLow(result.data[0].userbplow);
  };

  useEffect(function () {
    fetchUser();
    getWeight();
    getTemp();
    getGlucose();
    getBp();
  }, []);

  const handleData = async (value) => {
    switch (value) {
      case "userweight":
        var body = { userweight: userWeight, usermobileno: u.mobileno };
        var result = await postData("userdetails/insertweight", body);
        if (result) {
          setUserWeight(result.data.userweight);
          setOpenWeight(false);
        }
        break;
      case "usertemp":
        var body = { usertemp: userTemp, usermobileno: u.mobileno };
        var result = await postData("userdetails/inserttemp", body);
        if (result) {
          setUserTemp(result.data.usertemp);
          setOpenTemp(false);
        }
        break;
      case "userglucose":
        var body = { userglucose: userGlucose, usermobileno: u.mobileno };
        var result = await postData("userdetails/insertglucose", body);
        if (result) {
          setUserGlucose(result.data.userglucose);
          setOpenGlucose(false);
        }
        break
      case "bp":
        var body = {usermobileno:u.mobileno,userbphigh:userBpHigh,userbplow:userBpLow}
        var result = await postData("userdetails/insertbp", body);
        if (result) {
          setUserBpHigh(result.data.userbphigh);
          setUserBpLow(result.data.userbplow);
          setOpenBp(false);
        }
    }
    window.location.reload();
  };

  const weightDialog = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openWeight}
        onClose={() => setOpenWeight(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update your weight</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="Weight in kg"
            fullWidth
            onChange={(e) => setUserWeight(e.target.value)}
            onKeyPress={(event) => event.key === 'Enter' ? handleData("userweight") : null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWeight(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleData("userweight")} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const tempDialog = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openTemp}
        onClose={() => setOpenTemp(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Update your Temperature
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="Temperature in F"
            fullWidth
            onChange={(e) => setUserTemp(e.target.value)}
            onKeyPress={(event) => event.key === 'Enter' ? handleData("usertemp") : null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemp(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleData("usertemp")} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const bpDialog = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openBp}
        onClose={() => setOpenBp(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Update your Blood Pressure
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="BP Low"
            fullWidth
            onChange={(e) => setUserBpLow(e.target.value)}
          />
          <TextField
            margin="dense"
            label="BP High"
            fullWidth
            onChange={(e) => setUserBpHigh(e.target.value)}
            onKeyPress={(event) => event.key === 'Enter' ? handleData("bp") : null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBp(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleData("bp")} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const glucoseDialog = () => {
    return (
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openGlucose}
        onClose={() => setOpenGlucose(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Update your sugar level
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="Sugar Level/Glucose"
            fullWidth
            onChange={(e) => setUserGlucose(e.target.value)}
            onKeyPress={(event) => event.key === 'Enter' ? handleData("userglucose") : null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGlucose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleData("userglucose")} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

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
          <span>Patient Dashboard</span>
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
              <b>{userData.username}</b>
            </span>
            <span style={{ color: "gray" }}>
              <span
                style={{
                  fontSize: 14,
                  borderRight: "1px  solid black",
                  paddingInline: 5,
                }}
              >
                {userData.age != null ? userData.age : "--"}
              </span>
              <span style={{ padding: 2, paddingInline: 5 }}>
                {userData.gender != null ? userData.gender : "--"}
              </span>
            </span>
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
              height: 170,
            }}
          >
            <Grid container spacing={2}>
              <Grid
                onClick={() => {
                  setGraphData(weightGraph);
                }}
                item
                xs
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={weightIcon} width="70" />
                <span style={{ padding: 20 }}>Body Weight</span>
                <span
                  style={{ fontWeight: 800, fontSize: 22, color: "#3f50b5" }}
                >
                  {userWeight != null ? userWeight : "--"}
                  <span style={{ fontSize: 16 }}> kg</span>
                  <IconButton
                    aria-label="edit"
                    onClick={() => setOpenWeight(true)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </Grid>
              {weightDialog()}
              <Divider orientation="vertical" flexItem />
              <Grid
                onClick={() => {
                  setGraphData(tempGraph);
                }}
                item
                xs
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={tempIcon} width="40" />
                <span style={{ padding: 20 }}>Body Temp.</span>
                <span
                  style={{ fontWeight: 800, fontSize: 22, color: "#3f50b5" }}
                >
                  {userTemp != null ? userTemp : "--"}
                  <span style={{ fontSize: 16 }}> F</span>
                  <IconButton
                    aria-label="edit"
                    onClick={() => setOpenTemp(true)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </Grid>
              {tempDialog()}
              <Divider orientation="vertical" flexItem />
              <Grid
                onClick={() => {
                  setGraphData(glucoseGraph);
                }}
                item
                xs
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={glucoseIcon} width="40" />
                <span style={{ padding: 20 }}>Glucose Level</span>
                <span
                  style={{ fontWeight: 800, fontSize: 22, color: "#3f50b5" }}
                >
                  {userGlucose != null ? userGlucose : "--"}
                  <IconButton
                    aria-label="edit"
                    onClick={() => setOpenGlucose(true)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </Grid>
              {glucoseDialog()}
              <Divider orientation="vertical" flexItem />
              <Grid
              onClick={() => {
                setGraphData(bpGraph);
              }}
                item
                xs
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={bpIcon} width="70" />
                <span style={{ padding: 20 }}>Blood Pressure</span>
                <span
                  style={{ fontWeight: 800, fontSize: 22, color: "#3f50b5" }}
                >
                  {userBpLow != null ? userBpLow : "--"}/{userBpHigh != null ? userBpHigh : "--"}
                  <span style={{ fontSize: 16 }}> mg/dl</span>
                  <IconButton aria-label="edit" onClick={() => setOpenBp(true)}>
                    <Edit fontSize="small" />
                  </IconButton>
                </span>
              </Grid>
              {bpDialog()}
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

            <ListItem button dense>
              <ListItemIcon>
                <SmsIcon />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>
                  Messages
                </span>
              </ListItemText>
            </ListItem>

            <ListItem button dense onClick={()=>props.history.push({pathname:"/editprofile"},{userData:userData})}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: 18, fontWeight: "bold" }}>
                  Edit Profile
                </span>
              </ListItemText>
            </ListItem>

            <ListItem button dense onClick={() => {
                  sessionStorage.clear();
                  props.history.replace("/");
                }}>
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
              padding: 15,
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">Graph Status</Typography>
            <Divider />
            <div style={{ padding: 20 }}>
              <UserDataChart data={graphData} setRefresh={setRefresh} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ padding: 10 }}>
        <Paper
            elevation={3}
            style={{
              display: "flex",
              alignItems: "start",
            }}
          >
            <Appointments history={props.history}/>
            </Paper>
        </Grid>
      </Grid>

      <Footer history={props.history} />
    </div>
  );
};

export default UserProfile2;
