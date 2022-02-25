import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postData, ServerURL } from "../../FetchNodeServices";
import Divider from "@material-ui/core/Divider";
import {
  Grid,
  Box,
  Container,
  Fab,
  Button,
  TextField,
  Radio,
  Paper,
} from "@material-ui/core";
import Header from "../Header";
import Footer from "../Footer";
import Drawer from "@material-ui/core/Drawer";
import Add from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Remove from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 300,
    paddingInline: 20,
  },
  fullList: {
    width: "auto",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subdiv: {
    width: "300",
    height: "auto",
    marginTop: 10,

    borderRadius: 5,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function AddressCart(props) {
  const classes = useStyles();
  var cart = useSelector((state) => state.cart);
  var dispatch = useDispatch();
  var key = Object.keys(cart);
  var medicines = Object.values(cart);

  var userData = useSelector((state) => state.user);
  var user = Object.values(userData)[0];

  const [refresh, setRefresh] = useState(false);

  const [name, setName] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandMark] = useState("");
  const [city, setCity] = useState("");
  const [userState, setUserState] = useState("");
  const [addresses, setAddresses] = useState([]);


  var meds = JSON.parse(sessionStorage.getItem("medicines"));
	var u = JSON.parse(sessionStorage.getItem("userdetails"));

    useEffect(function () {
      fetchAllAddresses()
  }, [])

  const fetchAllAddresses = async () => {
    var body = { mobileno: u.mobileno };
    var list = await postData("userdetails/fetchalladdresses", body);
    setAddresses(list.data);
  };

	if(meds.length > 0){
	var totalAmt = meds.reduce(calculateAmount, 0)
	var actualAmt = meds.reduce(calculateActualAmount, 0)
	var savingAmt = meds.reduce(calculateSavingAmount, 0)
	}

  function calculateAmount(a, b) {
    var actualPrice =
      b.offerprice > 0 ? b.offerprice * b.quantity : b.price * b.quantity;
    return a + actualPrice;
  }
  function calculateActualAmount(a, b) {
    return a + b.price * b.quantity;
  }
  function calculateSavingAmount(a, b) {
    var savingPrice =
      b.offerprice > 0 ? (b.price - b.offerprice) * b.quantity : 0;
    return a + savingPrice;
  }

  //////////////////////////////Payment Gateway /////////////////////////////////////

  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: totalAmt * 100, //  = INR 1
    name: "E-Consult",
    description: "Gwalior,Madhya Pradesh",
    image: `/docConsultblue.jpg`,

    handler:async function (response) {
      // alert(response.razorpay_payment_id);
      if (response) {
        var body = {
          // patientname: firstName + " " + lastName,
          // date: date,
          // department: department,
          // doctor: doctor,
          // phoneno: phoneno,
          // message: message,
          // time: time,
          // amount: amount,
        };
        var result = await postData("appointment/insertappointments", body);
        if (result) {
          Swal.fire({
            title: "E-Consult.com",
            text: "Your Order has been placed successfully...",
            imageUrl: "/docConsultblue.jpg",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
           props.history.push({pathname:"/myorders"},{meds:meds})
          })
        } else {
          Swal.fire({
            title: "E-Consult.com",
            text: "Error in placing the order...",
            imageUrl: "/docConsultblue.jpg",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image",
          });
        }
      }
    },
    prefill: {
      name: u.username,
      contact: u.mobileno,
      email: u.emailid,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "#3f51b5",
      hide_topbar: false,
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    fetchAllAddresses();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  //////////////////////////////////////////////////////////////////////////////////

  // const handleQtyChange = (value, item) => {
  //     if (value == 0) {
  //         dispatch({ type: "REMOVE_CART", payload: [item.finalproductid] });
  //     } else {
  //         item.qty = value
  //         dispatch({ type: "ADD_CART", payload: [item.finalproductid, item] });
  //     }
  //     setRefresh(!refresh);
  // };

  const handleSaveAddress = async () => {
    var body = {
      mobileno: u.mobileno,
      name: name,
      mobilenumber: mobilenumber,
      pincode: pinCode,
      housenumber: houseNumber,
      address: address,
      landmark: landmark,
      city: city,
      state: userState,
    };
    var result = await postData("userdetails/insertaddress", body);
    setRefresh(!refresh);
    toggleDrawer("right", false);
    fetchAllAddresses();
  };

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };

  const drawer = () => {
    return (
      <div >
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={() => toggleDrawer("right", false)}
          >
            {showAddressDrawer("right")}
          </Drawer>
        </React.Fragment>
      </div>
    );
  };

  const showAddressDrawer = (anchor) => {
    return (
      <div className={classes.list}>
        <Grid container spacing={2} direction="column">
          <Grid item xs>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
                <img style={{marginInline:15}} src="/docConsultblue.jpg" width="15%" />
              <h3>Add Address</h3>
            </span>
          </Grid>
          <Grid item xs>
            <TextField
              value={name}
              onChange={(event) => setName(event.target.value)}
              size="small"
              variant="outlined"
              label="Name"
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              value={mobilenumber}
              onChange={(event) => setMobileNumber(event.target.value)}
              size="small"
              variant="outlined"
              label="Mob No."
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              value={pinCode}
              onChange={(event) => setPinCode(event.target.value)}
              size="small"
              variant="outlined"
              label="Pin Code"
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              value={houseNumber}
              onChange={(event) => setHouseNumber(event.target.value)}
              size="small"
              variant="outlined"
              label="House No."
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              size="small"
              variant="outlined"
              label="Address"
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              value={landmark}
              onChange={(event) => setLandMark(event.target.value)}
              size="small"
              variant="outlined"
              label="Landmark"
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              value={city}
              onChange={(event) => setCity(event.target.value)}
              size="small"
              variant="outlined"
              label="City"
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <TextField
              value={userState}
              onChange={(event) => setUserState(event.target.value)}
              size="small"
              variant="outlined"
              label="State"
              fullWidth
            />
          </Grid>
          <Grid item xs>
            <Button
              onClick={() => handleSaveAddress()}
              variant="contained"
              disableElevation
              size="large"
              fullWidth
              color="primary"
            >
              Save Address
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  const productDetails = () => {
    return meds.map((item, index) => {
      return (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ margin: 0 }}>
              <img
                alt={item.medicinename}
                src={`${ServerURL}/images/${item.picture}`}
                width="150px"
              />
            </div>

            <div style={{ marginInline: 20 }}>
              <div
                style={{
                  fontWeight: 700,
                  margin: 2,
                  letterSpacing: 1,
                  display: "flex",
                  padding: 10,
                }}
              >
                {item.medicinename}
                <span
                  style={{
                    fontWeight: 300,
                    letterSpacing: 0,
                    paddingInline: 5,
                    color: "grey",
                  }}
                >
                  ({item.description})
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ fontWeight: 500, marginInline: 5 }}>
                  <span>
                    {item.offerprice > 0 ? (
                      <span>&#8377; {item.offerprice}</span>
                    ) : (
                      <span>
                        &#8377; {item.price} × {item.quantity}
                      </span>
                    )}
                  </span>
                </div>
                <div style={{ fontWeight: 500, marginInline: 5 }}>
                  {item.offerprice > 0 ? (
                    <span>
                      <s>&#8377; {item.price}</s>
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <div style={{ fontWeight: 500, marginInline: 5 }}>
                  {item.offerprice > 0 ? (
                    <span style={{ color: "green" }}>
                      You save &#8377;{" "}
                      {(item.price - item.offerprice) * item.quantity}
                    </span>
                  ) : (
                    <span>No offer</span>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "end",
                marginLeft: 40,
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: 10,
                  fontWeight: 500,
                  margin: 2,
                }}
              >
                {item.offerprice > 0 ? (
                  <span>&#8377; {item.offerprice * item.quantity}</span>
                ) : (
                  <span>&#8377; {item.price * item.quantity}</span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingInline:15,
                }}
              >
                  <span style={{fontWeight: 700,}}>Quantity: </span>&nbsp;<span>{item.quantity} strips</span>
              </div>
            </div>
          </div>
          <div style={{ margin: 15 }}>
            <Divider />
          </div>
        </>
      );
    });
  };


  const handleDeleteAddress = async (item) => {
    var body = { addressid: item.addressid };
    var result = await postData("userdetails/deleteaddress", body);
    fetchAllAddresses();
  };

  const handleEditAddress = async (item) => {
    toggleDrawer("right", true);
    showAddressDrawer(item);
  };

  const handleSelectAddress = () => {
    return (
      <div
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {
               addresses.map(item => {
                   return (
                       <>
                       {/* <Radio checked />  */}
          <div style={{margin: 5,padding: 10 ,border: '0.5px solid #3f51b5' ,borderRadius: 5,color:'#3f51b5'}}>
              <div>{item.name} <span style={{float: 'right'}}><EditIcon onClick={()=>handleEditAddress(item)} fontSize="small"/>&nbsp;&nbsp;<DeleteIcon onClick={()=>handleDeleteAddress(item)} fontSize="small"/></span></div>
              <div>{item.mobilenumber}</div>
              <div>{item.housenumber}</div>
              <div>{item.address}</div>
              <div>{item.landmark}</div>
              <div>{item.city} {item.pincode} {item.state}</div>
          </div>
                       </>
                   )
               })
        }

        <Button
          onClick={() => toggleDrawer("right", true)}
          variant="outlined"
          size="large"
          color="primary"
          style={{
            padding: 10,
            margin: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Add fontSize="large" />
          &nbsp;
          <div style={{ textTransform: "capitalize" }}>Add Address</div>
        </Button>
      </div>
    );
  };

  const showMainCart = () => {
    return (
      <Box style={{}}>
        <Box
          style={{ display: "flex", marginInline: 40, flexDirection: "column" }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              paddingBottom: 15,
              paddingLeft: 5,
            }}
          >
            <div
              style={{ textAlign: "left", fontWeight: "bolder", fontSize: 25 }}
            >
              My Cart ({meds.length})
            </div>
          </Box>
          <Grid
            container
            justifyContent="space-evenly"
            spacing={5}
            direction="row"
          >
            <Grid item xs={7}>
              <Grid item xs={12}>
                <Paper
                elevation={3}
                  style={{
                    borderRadius: 5,
                    width: "100%",
                    padding: 10,
                  }}
                >
                  <div
                    style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}
                  >
                    Select Delivery Address
                  </div>
                  <div>{handleSelectAddress()}</div>
                </Paper>
              </Grid>
              &nbsp;
              <Grid item xs={12}>
                <Paper
                elevation={3}
                  style={{
                    borderRadius: 5,
                    width: "100%",
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      padding: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      Order Summary{" "}
                      <span style={{ color: "grey" }}>
                        ({meds.length})
                      </span>
                    </span>
                    <span>&#8377; {totalAmt}</span>
                  </div>

                  {productDetails()}
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid item xs>
                <Paper
                elevation={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 5,
                    width: "100%",
                    padding: 10,
                  }}
                >
                  <div
                    style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}
                  >
                    Payment Details
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <div style={{}}>M.R.P</div>
                    <div style={{}}>&#8377; {actualAmt}</div>
                  </div>
                  <Divider variant="middle" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <div style={{}}>Savings</div>
                    <div
                      style={{
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      &#8377; {savingAmt}
                    </div>
                  </div>
                  <Divider variant="middle" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <div style={{}}>Delivery Charges</div>
                    <div style={{}}>&#8377; {0}</div>
                  </div>
                  <Divider variant="middle" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <div style={{}}>
                      <b>Total Amount</b>
                    </div>
                    <div style={{}}>
                      <b>&#8377; {totalAmt}</b>
                    </div>
                  </div>
                  <Button
                  fullWidth
                    color="primary"
                    variant="contained"
                    onClick={() => openPayModal()}
                    style={{
                      width: "auto",
                      display: "block",
                      borderRadius: 5,
                      padding: 15,
                      marginTop: 30,
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                      letterSpacing: 0.5,
                      cursor: "pointer",
                    }}
                  >
                    Make Payment
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 100 }}>
        <Header history={props.history} setRefresh={setRefresh} />
      </div>
      {showMainCart()}
      {drawer()}
      <Footer history={props.history} />
    </div>
  );
}
