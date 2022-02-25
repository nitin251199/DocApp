import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import {
  Avatar,
  Divider,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Edit from "@material-ui/icons/Edit";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import SmsIcon from "@material-ui/icons/Sms";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { postData, postDataAndImage, ServerURL } from "../../FetchNodeServices";
import { Navigation } from "@material-ui/icons";
import BackupIcon from "@material-ui/icons/Backup";
import { errorMessage, isEmpty } from "../../Checks";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
  },
  margin: {
    margin: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

const EditProfile = (props) => {
  const classes = useStyles();

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [mobileno, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [picture, setPicture] = useState("");

  const u = JSON.parse(sessionStorage.getItem("userdetails"));

  const fetchUser = async () => {
    var body = { mobileno: u.mobileno };
    var result = await postData("userdetails/checkusermobilenumber", body);
    setUserId(result.data[0].userid);
    setUsername(result.data[0].username);
    setAge(result.data[0].age);
    setBloodGroup(result.data[0].bloodgroup);
    setHeight(result.data[0].height);
    setWeight(result.data[0].weight);
    setGender(result.data[0].gender);
    setMobileNo(result.data[0].mobileno);
    setAddress(result.data[0].address);
    setCity(result.data[0].city);
    setState(result.data[0].state);
    setPicture(result.data[0].picture);
  };

  useEffect(function () {
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    var err = false;
    if (isEmpty(username)) {
      err = true;
      errorMessage("Username should not be empty");
    }
    if (isEmpty(age)) {
      err = true;
      errorMessage("Age should not be empty");
    }
    if (isEmpty(bloodGroup)) {
      err = true;
      errorMessage("Blood Group should not be empty");
    }
    if (isEmpty(height)) {
      err = true;
      errorMessage("Height should not be empty");
    }
    if (isEmpty(weight)) {
      err = true;
      errorMessage("Weight should not be empty");
    }
    if (isEmpty(gender)) {
      err = true;
      errorMessage("Gender should not be empty");
    }
    if (isEmpty(mobileno)) {
      err = true;
      errorMessage("Mobile No should not be empty");
    }
    if (isEmpty(address)) {
      err = true;
      errorMessage("Address should not be empty");
    }
    if (isEmpty(city)) {
      err = true;
      errorMessage("City should not be empty");
    }
    if (isEmpty(state)) {
      err = true;
      errorMessage("States should not be empty");
    }
    if (!err) {
      var body = {
        userid: userId,
        username: username,
        age: age,
        bloodgroup: bloodGroup,
        height: height,
        weight: weight,
        gender: gender,
        mobileno: mobileno,
        address: address,
        city: city,
        state: state,
      };
      var result = await postData("userdetails/edituser", body);
      if (result) {
        Swal.fire({
          title: "E-Consult.com",
          text: "Your Profile updated successfully...",
          imageUrl: "/doc-icon.png",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      } else {
        Swal.fire({
          title: "E-Consult.com",
          text: "Error in updating your profile...",
          imageUrl: "/doc-icon.png",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      }
    }
    fetchUser();
  };

  const handlePicture = async (event) => {
    //yaha sahi krna he
    //  await setPicture();
    var formData = new FormData();
    formData.append("userid", userId);
    formData.append("picture", event.target.files[0]);
    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "userdetails/edituserpicture",
      formData,
      config
    );
    if (result) {
      Swal.fire({
        title: "E-Consult.com",
        text: "Your Profile Picture updated successfully...",
        imageUrl: "/doc-icon.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    } else {
      Swal.fire({
        title: "E-Consult.com",
        text: "Error in updating your profile picture...",
        imageUrl: "/doc-icon.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    }
    fetchUser();
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
          <span>Edit Profile</span>
        </Grid>
        <Grid
          item
          xs
          style={{ padding: 10, display: "flex", flexDirection: "column" }}
        >
          <Grid item xs={12}>
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
                src={`${ServerURL}/images/${picture}`}
                style={{ width: 100, height: 100, margin: 10 }}
              />
              <span
                style={{ fontSize: 18, letterSpacing: 1, paddingBottom: 3 }}
              >
                <b>{username}</b>
              </span>
              <span style={{ color: "gray" }}>
                <span
                  style={{
                    fontSize: 14,
                    borderRight: "1px  solid black",
                    paddingInline: 5,
                  }}
                >
                  {age != null ? age : "--"}
                </span>
                <span style={{ padding: 2, paddingInline: 5 }}>
                  {gender != null ? gender : "--"}
                </span>
              </span>
            </Paper>
          </Grid>
          <Grid item xs={12}>
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
              <ListItem
                button
                dense
                onClick={() =>
                  props.history.push({ pathname: "/userprofile2" })
                }
              >
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

              <ListItem button dense>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>
                  <span style={{ fontSize: 18, fontWeight: "bold" }}>
                    Edit Profile
                  </span>
                </ListItemText>
              </ListItem>

              <ListItem button dense>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText>
                  <span style={{ fontSize: 18, fontWeight: "bold" }}>
                    Logout
                  </span>
                </ListItemText>
              </ListItem>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={9} style={{ padding: 10 }}>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              flexDirection: "column",
              padding: 50,
              height: "auto",
            }}
          >
            <Grid container spacing={2}>
              <Grid item container xs={12}>
                <Avatar
                  src={`${ServerURL}/images/${picture}`}
                  variant="rounded"
                  style={{ width: 100, height: 100 }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(event) => handlePicture(event)}
                  />
                  <label htmlFor="contained-button-file">
                    <Fab
                      variant="extended"
                      size="medium"
                      color="primary"
                      component="span"
                      style={{ width: 200, marginLeft: 20 }}
                    >
                      <BackupIcon className={classes.extendedIcon} />
                      Upload Photo
                    </Fab>
                  </label>
                  <span
                    className={classes.margin}
                    style={{
                      fontSize: 14,
                      color: "gray",
                    }}
                  >
                    Allowed JPG, GIF or PNG. Max size of 2MB
                  </span>
                </div>
              </Grid>
              &nbsp;
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    variant="filled"
                    value={username}
                    label="Username"
                    fullWidth
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="filled"
                    value={age}
                    label="Age"
                    fullWidth
                    onChange={(event) => setAge(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">
                      Blood Group
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={bloodGroup}
                      onChange={(event) => setBloodGroup(event.target.value)}
                    >
                      <MenuItem value="A+">A+</MenuItem>
                      <MenuItem value="B+">B+</MenuItem>
                      <MenuItem value="O+">O+</MenuItem>
                      <MenuItem value="AB+">AB+</MenuItem>
                      <MenuItem value="A-">A-</MenuItem>
                      <MenuItem value="B-">B-</MenuItem>
                      <MenuItem value="O-">O-</MenuItem>
                      <MenuItem value="AB-">AB-</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="filled"
                    value={height}
                    label="Height in cm"
                    fullWidth
                    onChange={(event) => setHeight(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="filled"
                    value={weight}
                    label="Weight in kg"
                    fullWidth
                    onChange={(event) => setWeight(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                <FormControl variant="filled" fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={gender}
                      onChange={(event) => setGender(event.target.value)}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="filled"
                    value={mobileno}
                    label="Mobile No"
                    fullWidth
                    onChange={(event) => setMobileNo(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="filled"
                    value={address}
                    label="Address"
                    fullWidth
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="filled"
                    value={city}
                    label="City"
                    fullWidth
                    onChange={(event) => setCity(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="filled"
                    value={state}
                    label="State"
                    fullWidth
                    onChange={(event) => setState(event.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: 30,
                }}
                justifyContent="right"
              >
                <Grid item xs={6}>
                  <Button
                    style={{ padding: 15 }}
                    fullWidth
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={() => handleSubmit()}
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Footer history={props.history} />
    </div>
  );
};

export default EditProfile;
