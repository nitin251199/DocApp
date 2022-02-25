import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Paper,
  Fab,
  IconButton,
} from "@material-ui/core";
import weightIcon from "../images/weight-icon.png";
import tempIcon from "../images/temp-clip.png";
import bpIcon from "../images/bp-clip.png";
import glucoseIcon from "../images/glucose-clip.png";
import { getData, postData } from "../../FetchNodeServices";
import Main from "../ChatPortion/Main";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Swal from "sweetalert2";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Add, Remove, Send } from "@material-ui/icons";
import { SocketContext } from "../../../contexts/Context";

export const DocProfile = (props) => {
  var docDetails = useSelector((state) => state.doctor);
  var doc = Object.values(docDetails);

  var dispatch = useDispatch();

  const [username, setUsername] = useState(props.location.state.doctorname);
  const [room, setRoom] = useState(props.location.state.patientname+props.location.state.doctorname);
  const [showChat, setShowChat] = useState(false);
  const [medList, setMedList] = useState([]);
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [userWeight, setUserWeight] = React.useState("");
  const [userTemp, setUserTemp] = React.useState("");
  const [userBpLow, setUserBpLow] = React.useState("");
  const [userBpHigh, setUserBpHigh] = React.useState("");
  const [userGlucose, setUserGlucose] = React.useState("");
  const [refresh, setRefresh] = useState(false);

  var u = JSON.parse(sessionStorage.getItem("userdetails"));

  useEffect(function () {
    fetchAllMeds();
  }, []);

  const getWeight = async () => {
    var body = { usermobileno: props.location.state.mobileno };
    var result = await postData("userdetails/getweight", body);
    setUserWeight(result.data[0].userweight);
  };
  const getTemp = async () => {
    var body = { usermobileno: props.location.state.mobileno };
    var result = await postData("userdetails/gettemp", body);
    setUserTemp(result.data[0].usertemp);
  };
  const getGlucose = async () => {
    var body = { usermobileno: props.location.state.mobileno };
    var result = await postData("userdetails/getglucose", body);
    setUserGlucose(result.data[0].userglucose);
  };

  useEffect(function () {
    getWeight();
    getTemp();
    getGlucose();
  }, []);

  // const handleChat = (item) => {
  //   setUsername(item.doctorname);
  //   setRoom(item.patientname + item.doctorname);
  //   Swal.fire({
  //     title: "Are you sure to join chatroom?",
  //     text: "You won't be able to revert this!",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       setShowChat(true);
  //       setMedStatus(true);
  //       Swal.fire(
  //         "Chatroom Joined!",
  //         "Your can now chat with your patient.",
  //         "success"
  //       );
  //     }
  //   });
  // };

  const fetchAllMeds = async () => {
    var list = await getData("medicine/fetchallmeds");
    setMedList(list.data);
  };

  const handleMeds = (value) => {
    setSelectedMeds(value);
  };

  const{ socket} = useContext(SocketContext)
  const handleSendMeds = async () => {
    const medicineData = {
      medicines: selectedMeds,
      room: room,
    };
    await socket.emit("send_medicines", medicineData);
    Swal.fire(
      "Sent!",
      "Medicines are sent to the patient successfully!",
      "success"
    );
    setSelectedMeds("");
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <React.Fragment>
      <Header history={props.history} />
      <Container>
        <Grid container component={Box} mt={10}>
          <Grid item xs={6} style={{ padding: 10 }}>
            <Grid item style={{ borderBottom: "1px solid black" }}>
            <Typography variant="h6">Patient Details</Typography>
            </Grid>
            <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              padding: 15,
              height: 120,
            }}
          >
            <Grid container spacing={2}>
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
                <img src={weightIcon} width="50" />
                <span style={{ padding: 10,fontSize: 14 }}>Body Weight</span>
                <span
                  style={{ fontWeight: 800, fontSize: 22, color: "#3f50b5" }}
                >
                  {userWeight}
                  <span style={{ fontSize: 16 }}> kg</span>
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
                <img src={tempIcon} width="30" />
                <span style={{ padding: 10,fontSize: 14 }}>Body Temp.</span>
                <span
                  style={{ fontWeight: 800, fontSize: 22, color: "#3f50b5" }}
                >
                  {userTemp}
                  <span style={{ fontSize: 16 }}> F</span>
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
                <img src={bpIcon} width="50" />
                <span style={{ paddingTop: 15,paddingBottom: 10,fontSize: 14 }}>Blood Pressure</span>
                <span
                  style={{ fontWeight: 800, fontSize: 22, color: "#3f50b5" }}
                >
                  0<span style={{ fontSize: 16 }}> mg/dl</span>
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
                <img src={glucoseIcon} width="30" />
                <span style={{ padding: 10,fontSize: 14 }}>Glucose Level</span>
                <span
                  style={{ fontWeight: 800, fontSize: 22, color: "#3f50b5" }}
                >
                  {userGlucose}
                </span>
              </Grid>
            </Grid>
          </Paper>
          <Grid item style={{padding:20}}>
          <Typography variant="body1"><b>Patient Message</b></Typography>
          <Typography variant="subtitle1">{props.location.state.message}</Typography>
          </Grid>
            <Grid item style={{ borderBottom: "1px solid black" }}>
              <Typography variant="h6">Medicines</Typography>
            </Grid>
              <Grid item component={Box} pt={2}>
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={medList}
                  onChange={(event, value) => handleMeds(value)}
                  disableCloseOnSelect={false}
                  getOptionLabel={(option) => option.medicinename}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.medicinename}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Medicines"
                    />
                  )}
                />
              </Grid>
            <Grid item>
              {selectedMeds.length > 0 && (
                <>
                  <Paper
                    style={{
                      marginTop: 20,
                      padding: 10,
                      overflowY: "scroll",
                      height: "40vh",
                    }}
                  >
                    {selectedMeds.map((item) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ padding: 5, flexGrow: 1 }}>
                            <div style={{ fontWeight: 800, fontSize: 20 }}>
                              {item.medicinename}
                            </div>
                            <div style={{ fontSize: 12, color: "gray" }}>
                              {item.chemicalcompositon}
                            </div>
                            <div style={{ fontSize: 16 }}>
                              {item.description}
                            </div>
                          </div>
                          <div>
                            <IconButton
                              aria-label="reduce"
                              onClick={() => {
                                item.quantity--;
                                setRefresh(!refresh);
                                // props.setRefresh(!refresh);
                                if (item.quantity == 0) {
                                  dispatch({
                                    type: "REMOVE_MEDS",
                                    payload: [item.medicineid],
                                  });
                                }
                              }}
                              size="medium"
                              //disabled={item.qty==1?true:false}
                              disableTouchRipple
                            >
                              <Remove fontSize="medium" />
                            </IconButton>
                            <label style={{ paddingInline: 10 }}>
                              {item.quantity}
                            </label>
                            <IconButton
                              aria-label="increase"
                              onClick={() => {
                                item.quantity++;
                                setRefresh(!refresh);
                                // props.setRefresh(!refresh);
                              }}
                              size="medium"
                              disableTouchRipple
                            >
                              <Add fontSize="medium" />
                            </IconButton>
                          </div>
                          <Divider />
                        </div>
                      );
                    })}
                  </Paper>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<Send />}
                    onClick={() => handleSendMeds()}
                  >
                    Send Medicines
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
              <div style={{ width: "100%", height: "100%" }}>
                <Main username={username} room={room} />
              </div>
          </Grid>
        </Grid>
      </Container>
      <Footer history={props.history} />
    </React.Fragment>
  );
};
