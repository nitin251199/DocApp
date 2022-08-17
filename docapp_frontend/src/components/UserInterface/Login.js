import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded"
import { TextField, Grid, Button } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from "@material-ui/core/InputAdornment";
import { useDispatch } from "react-redux";
import "./styles.css"
import Header from "./Header";
import Footer from "./Footer";
import { postData } from '../FetchNodeServices'
import OtpInput from 'react-otp-input';
import { isEmpty, errorMessage, isDigits, isMobile, isEmail } from "../Checks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  subdiv: {
    width: '300',
    height: 'auto',
    marginTop: 50,

    borderRadius: 5,
  }

}))
export default function Login(props) {
  const classes = useStyles();
  const [mobileno, setMobileNo] = useState('')
  const [otp, setOtp] = useState("")
  const [gotp, setGotp] = useState("")
  const [showOtp, setShowOtp] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [details,setDetails] = useState([])

  var dispatch = useDispatch()

  const handleSend = async () => {
    var body = { mobileno: mobileno }

    if (props.location.state.loginType === 'patient') {
      var result = await postData('userdetails/checkusermobilenumber', body)

      if (result.result) {
        setShowOtp(true)
        var otpval = parseInt(8999 * Math.random() + 1000)
        alert(otpval)
        console.log('OTP',otpval);
        setGotp(otpval)
        setDetails(result.data[0])
        
        // result=await postData("userdetails/smsapi",{otp:otpval,mobileno:mobileno})

      }
      else {
        var otpval = parseInt(8999 * Math.random() + 1000)
        alert(otpval)
        console.log('OTP',otpval);
        // result=await postData("userdetails/smsapi",{otp:otpval,mobileno:mobileno})
        props.history.push({ pathname: '/signup' }, { mobileno: mobileno, otp: otpval })
      }
    }
    else {
      var docResult = await postData('doctor/checkdoctormobilenumber',{phoneno:mobileno})

      if (docResult.result) {
        setShowOtp(true)
        var otpval = parseInt(8999 * Math.random() + 1000)
        alert(otpval)
        console.log('OTP',otpval);
        setGotp(otpval)
        setDetails(docResult.data[0])
      //  result = await postData('userdetails/smsapi',{otp:otpval,mobileno:mobileno})

      }
      else {
        var otpval = parseInt(8999 * Math.random() + 1000)
        alert(otpval)
        console.log('OTP',otpval);
        // result=await postData("userdetails/smsapi",{otp:otpval,mobileno:mobileno})
        props.history.push({ pathname: '/adddoctors' }, { phoneno: mobileno, otp: otpval })
      }
    }
  }

  const handleProceed = () => {

    if (otp == gotp) {
      if (props.location.state.loginType === 'patient')
        {
          sessionStorage.setItem("userdetails",JSON.stringify(details))
          dispatch({ type: 'ADD_USER', payload: [details.mobileno, details] })
          props.history.push({ pathname: "/userprofile2" })
        }
      else {
        sessionStorage.setItem("docdetails",JSON.stringify(details))
        dispatch({ type: 'ADD_DOCTOR', payload: [details.mobileno, details] })
        props.history.push({ pathname: '/docprofile2' }, {phoneno:mobileno})
      }

    }
    else {
      errorMessage("Invalid otp")

    }

  }


  const handleChangeOtp = (value) => {

    setOtp(value)

  }
  return (
    <>
      <Header history={props.history} setRefresh={setRefresh} />
      <div className={classes.root}>
        <div className={classes.subdiv}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              {props.location.state.loginType === 'patient' ? 
              <img src="/doctor-dashboard.jpg" width='800' height='370' style={{ borderRadius: 20 }} />
              :
              <img src="/doctor-iStock-949812160_2.jpg" width='800' height='370' style={{ borderRadius: 20 }} />}
            </div>

            <div style={{ border: '1px solid #000', borderRadius: 5, width: 350, height: 320, padding: 20, margin: 10 }}>


              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AccountCircleRoundedIcon style={{ fontSize: 80 }} />
              </div>
              <div style={{ fontSize: 26 }}>
                <b>{props.location.state.loginType === 'patient' ? "Patient Sign in" : "Doctor Sign In" }</b>
              </div>
              <div style={{ fontSize: 15 }}>
              {props.location.state.loginType === 'patient' ? <font color="#95a5a6">Get access to your orders & doctor consultations</font> : <font color="#95a5a6">Get access to your patient appointments</font>}
              </div>
              <br />

              <Grid container spacing={2}>
                <Grid item sm={12}>

                  <TextField
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+91 |</InputAdornment>,
                    }}
                    variant="outlined" label="Enter Your Mobile No." fullWidth
                    onChange={(event) => setMobileNo(event.target.value)}
                    onKeyPress={(event) => event.key === 'Enter' ? handleSend() : null}
                  />


                </Grid>



                <Grid item sm={12}>
                  {showOtp ? <><OtpInput
                    value={otp}
                    onChange={(value) => handleChangeOtp(value)}
                    numInputs={4}
                    inputStyle="inputStyle"
                    separator={<span>-</span>}
                    shouldAutoFocus
                  />
                    &nbsp;
                    <Grid item sm={12}>
                      <Button onClick={() => handleProceed()}
                        fullWidth style={{ color: '#fff' }} variant="contained" color="primary" endIcon={<SendIcon />}>Proceed</Button>


                    </Grid></>
                    : <>
                      <Grid item sm={12}>
                        <Button onClick={() => handleSend()}
                          fullWidth style={{ color: '#fff' }} variant="contained" color="primary" endIcon={<SendIcon />}>Send</Button>

                      </Grid></>}
                </Grid>
              </Grid>
              &nbsp;


              <div style={{ textAlign: 'center', fontSize: 13 }}>
                By continuing you agree to our <font color='red'>Terms of service</font>
                <br />
                and
                <font color='red'> Privacy & Legal Policy.</font>
              </div>





            </div>
          </div>

        </div>
      </div>
      <Footer history={props.history} />
    </>
  )
}