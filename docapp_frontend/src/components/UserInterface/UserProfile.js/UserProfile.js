import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { postData, postDataAndImage } from "../../FetchNodeServices";
import Main from "../ChatPortion/Main";
import Swal from "sweetalert2";
import socketContext from "../../../contexts/socketContext";
import { Remove, Add, Send } from "@material-ui/icons";
import { SocketContext } from "../../../contexts/Context";

const UserProfile = (props) => {
  var userDetails = useSelector((state) => state.user);
  var user = Object.values(userDetails);

  var u = JSON.parse(sessionStorage.getItem("userdetails"))

  var dispatch = useDispatch();

  const [appointment, setAppointment] = useState([]);
  const [username, setUsername] = useState(props.location.state.patientname);
  const [room, setRoom] = useState(props.location.state.patientname+props.location.state.doctorname);
  const [medsData, setMedsData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchAppointmentsbyUser = async () => {
    var body = { patientname: u.username };
    var result = await postData("appointment/fetchappointmentsbyuser", body);
    setAppointment(result.data);
  };

  useEffect(function () {
    fetchAppointmentsbyUser();
  }, []);

  const{ socket} = useContext(SocketContext)
  useEffect(
    function () {
      socket.on("recieve_medicines", (data) => {
        setMedsData(data.medicines);
      });
    },
    [socket]
  );


  const handleCart = () => {
    sessionStorage.setItem("medicines",JSON.stringify(medsData))
    dispatch({ type: "ADD_CART", payload: [medsData.room, medsData] });
    props.history.push({ pathname: "/cart" }, { medsData: medsData });
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div>
      <Header history={props.history} />

      <Container>
        <Grid container component={Box} mt={10}>
          <Grid item xs={6} style={{ marginTop: 10 }}>
            <Grid item style={{ borderBottom: "1px solid black" }}>
              <Typography variant="h6">Your Medicines</Typography>
            </Grid>
            <Grid item>
              {medsData.length > 0 ? (
                <>
                  <Paper
                    style={{
                      margin: 0,
                      padding: 10,
                      overflowY: "scroll",
                      height: "65vh",
                    }}
                  >
                    {medsData.map((item) => {
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
                            {/* <Fab size="small"><Remove/></Fab>
                          <span style={{paddingInline:15,fontSize:20,fontWeight:800}}>1</span>
                          <Fab size="small"><Add/></Fab> */}
                            <IconButton
                              aria-label="reduce"
                              onClick={() => {
                                item.quantity--;
                                setRefresh(!refresh);
                                // props.setRefresh(!refresh);
                                if (item.quantity == 0) {
                                  dispatch({
                                    type: "REMOVE_MED",
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
                    style={{padding:10}}
                    endIcon={<Send />}
                    onClick={() => handleCart()}
                  >
                    Add To Cart
                  </Button>
                </>
              ):(
                <Grid
                  item
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "77vh",
                    fontSize:20,
                    textAlign:'center'
                  }}
                >
                  <span>Medicines sent by your doctor will appear here!</span>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              backgroundColor: "white",
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
    </div>
  );
};

export default UserProfile;
