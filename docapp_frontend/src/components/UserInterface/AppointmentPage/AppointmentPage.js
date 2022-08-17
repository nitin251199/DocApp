import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Button,
} from "@material-ui/core";
import Header from "../Header";
import Footer from "../Footer";
import { getData, postData } from "../../FetchNodeServices";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const AppointmentPage = (props) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1 > 9
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1)) +
      "-" +
      (new Date().getDate() > 9
        ? new Date().getDate()
        : "0" + new Date().getDate())
  );
  const [department, setDepartment] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState("");

  var u = JSON.parse(sessionStorage.getItem("userdetails"));

  const fetchAllDepartments = async () => {
    var list = await getData("doctor/fetchalldepartments");
    setDepartmentList(list.data);
  };

  const fetchDoctorsByDepartment = async (departmentname) => {
    var body = { department: departmentname };
    var result = await postData("doctor/fetchdoctorsbydepartment", body);
    setDoctorList(result.data);
  };

  const fetchAmountByDoctor = async (doctorname) => {
    var body = { doctorname: doctorname };
    var result = await postData("doctor/fetchfees", body);
    setAmount(result.data[0].fees);
  };

  useEffect(function () {
    fetchAllDepartments();
  }, []);

  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value);
    fetchDoctorsByDepartment(event.target.value);
  };

  const fillDepartments = () => {
    return departmentList.map((item) => {
      return (
        <MenuItem value={item.departmentname}>{item.departmentname}</MenuItem>
      );
    });
  };

  const fillDoctors = () => {
    return doctorList.map((item) => {
      return <MenuItem value={item.doctorname}>{item.doctorname}</MenuItem>;
    });
  };

  //////////////////////////////Payment Gateway /////////////////////////////////////

  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: amount * 100, //  = INR 1
    name: "E-Consult",
    description: "Gwalior,Madhya Pradesh",
    image: `/docConsultblue.jpg`,

    handler: async function (response) {
      if (response) {
        var body = {
          userid: u.userid,
          patientname: firstName + " " + lastName,
          date,
          department,
          doctor,
          phoneno,
          message,
          time,
          amount,
        };
        var result = await postData("appointment/insertappointments", body);
        if (result) {
          Swal.fire({
            title: "E-Consult.com",
            text: "Your Appointment has been placed successfully...",
            imageUrl: "/docConsultblue.jpg",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            props.history.push("/userprofile2");
          });
        } else {
          Swal.fire({
            title: "E-Consult.com",
            text: "Error in placing the appointment...",
            imageUrl: "/docConsultblue.jpg",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image",
          });
        }
      }
    },
    prefill: {
      name: firstName + " " + lastName,
      contact: phoneno,
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
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ marginTop: 120 }}>
      <Header history={props.history} />
      <Grid container>
        <Grid item xs>
          <img src="/appointment-image.jpg" alt="" width="100%" />
        </Grid>
        <Grid item xs>
          <Box style={{ marginBottom: 40 }}>
            <Grid item xs>
              <span
                style={{
                  fontSize: 43,
                  fontWeight: "bolder",
                  fontFamily: "Poppins,sans-serif",
                }}
              >
                Make an appointment
              </span>
            </Grid>
          </Box>
          <Grid item container xs={12} spacing={3} style={{ width: 600 }}>
            <Grid item xs={6}>
              <TextField
                onChange={(event) => setFirstName(event.target.value)}
                variant="filled"
                size="small"
                fullWidth
                label="First Name"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(event) => setLastName(event.target.value)}
                variant="filled"
                size="small"
                fullWidth
                label="Last Name"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(event) => setDate(event.target.value)}
                variant="filled"
                size="small"
                defaultValue={
                  new Date().getFullYear() +
                  "-" +
                  (new Date().getMonth() + 1 > 9
                    ? new Date().getMonth() + 1
                    : "0" + (new Date().getMonth() + 1)) +
                  "-" +
                  (new Date().getDate() > 9
                    ? new Date().getDate()
                    : "0" + new Date().getDate())
                }
                type="date"
                fullWidth
                label="Select Date"
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="filled" fullWidth size="small">
                <InputLabel id="department">Department</InputLabel>
                <Select
                  labelId="department"
                  //value={department}
                  onChange={(event) => handleChangeDepartment(event)}
                >
                  {fillDepartments()}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="filled" fullWidth size="small">
                <InputLabel id="doctor">Doctor</InputLabel>
                <Select
                  labelId="doctor"
                  //value={doctor}
                  onChange={(event) => {
                    setDoctor(event.target.value);
                    fetchAmountByDoctor(event.target.value);
                  }}
                >
                  {fillDoctors()}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(event) => setPhoneNo(event.target.value)}
                variant="filled"
                size="small"
                fullWidth
                label="Phone Number"
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth size="small" variant="filled">
                <InputLabel id="time">Time Slot</InputLabel>
                <Select
                  labelId="time"
                  id="demo-simple-select"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <MenuItem value={"8:00 am"}>8:00 am</MenuItem>
                  <MenuItem value={"9:00 am"}>9:00 am</MenuItem>
                  <MenuItem value={"10:00 am"}>10:00 am</MenuItem>
                  <MenuItem value={"11:00 am"}>11:00 am</MenuItem>
                  <MenuItem value={"12:00 pm"}>12:00 pm</MenuItem>
                  <MenuItem value={"2:00 pm"}>2:00 pm</MenuItem>
                  <MenuItem value={"3:00 pm"}>3:00 pm</MenuItem>
                  <MenuItem value={"4:00 pm"}>4:00 pm</MenuItem>
                  <MenuItem value={"5:00 pm"}>5:00 pm</MenuItem>
                  <MenuItem value={"6:00 pm"}>6:00 pm</MenuItem>
                  <MenuItem value={"7:00 pm"}>7:00 pm</MenuItem>
                  <MenuItem value={"8:00 pm"}>8:00 pm</MenuItem>
                  <MenuItem value={"9:00 pm"}>8:00 pm</MenuItem>
                  <MenuItem value={"10:00 pm"}>10:00 pm</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                // onChange={(event) => setAmount(event.target.value)}
                variant="filled"
                value={amount}
                InputProps={{
                  readOnly: true,
                }}
                size="small"
                fullWidth
                label="Fees Amount"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Additional message"
                multiline
                rows={4}
                variant="filled"
                fullWidth
                onChange={(event) => setMessage(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={() => openPayModal()}
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                disableElevation
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer history={props.history} />
    </div>
  );
};
