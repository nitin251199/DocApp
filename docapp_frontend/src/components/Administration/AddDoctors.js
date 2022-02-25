import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Avatar } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Swal from 'sweetalert2'
import { getData, postDataAndImage } from "../FetchNodeServices";
import { isEmpty, errorMessage, isDigits, isMobile, isEmail } from "../Checks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  subdiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    height: 'auto',
    marginTop: 10,
    background: 'inherit',
    padding: 15,
    borderRadius: 5,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  input: {
    display: 'none',
  },
}));
export default function AddDoctors(props) {

  const [doctorName, setDoctorName] = useState("")
  const [gender, setGender] = useState("")
  const [qualification, setQualification] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [status, setStatus] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [department, setDepartment] = useState("")
  const [picture, setPicture] = useState({ filename: "", bytes: "" })



  useEffect(function () {

  }, [])


  const classes = useStyles();

  const handlePicture = (event) => {
    setPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0]
    })
  }

  const handleSubmit = async () => {
    var err = false;
    if (isEmpty(doctorName)) {
      err = true;
      errorMessage("Name should not be empty");

    }
    if (isEmpty(gender)) {
      err = true;
      errorMessage("Gender should not be empty");
    }
    if (isEmpty(qualification)) {
      err = true;
      errorMessage("Qualification Name should not be empty");
    }
    if (isEmpty(startTime)) {
      err = true;
      errorMessage("Start time should not be empty");
    }
    if (isEmpty(endTime)) {
      err = true;
      errorMessage("End time should not be empty");
    }
    if (isEmpty(status)) {
      err = true;
      errorMessage("Status should not be empty");
    }
    if (isEmpty(phoneNo)) {
      err = true;
      errorMessage("Phone Number should not be empty");
    }
    if (!isMobile(phoneNo)) {
      err = true;
      errorMessage("Invalid Phone Number");
    }
    if (isEmpty(picture.filename)) {
      err = true;
      errorMessage("Please Add Doctor Picture...");
    }
    if (!err) {
      var formData = new FormData();
      formData.append("doctorname", doctorName)
      formData.append("gender", gender)
      formData.append("qualification", qualification)
      formData.append("starttime", startTime)
      formData.append("endtime", endTime)
      formData.append("status", status)
      formData.append("phoneno", phoneNo)
      formData.append("picture", picture.bytes)
      formData.append("department",department)
      var config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage("doctor/insertdoctor", formData, config);
      if (result) {
        Swal.fire({
          title: 'E-Consult.com',
          text: 'Your Record has been submitted successfully...',
          imageUrl: '/doc-icon.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
      }
      else {
        Swal.fire({
          title: 'E-Consult.com',
          text: 'Error in submitting the record...',
          imageUrl: '/doc-icon.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
      }
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container xs={12} spacing={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item xs={12}><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: "bold", letterSpacing: 1 }}>
            <Grid item xs={2}><img src="./doc-icon.png" alt="doc-icon" style={{ width: 50 }}></img></Grid><Grid item xs={3}> Add Doctors</Grid>
          </div></Grid>

          <Grid item xs={6}>
            <TextField variant="outlined" fullWidth label="Doctor Name"
              onChange={(event) => setDoctorName(event.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row
                aria-label="gender"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="Female" onClick={(event) => setGender(event.target.value)} control={<Radio />} label="Female" />
                <FormControlLabel value="Male" onClick={(event) => setGender(event.target.value)} control={<Radio />} label="Male" />
                <FormControlLabel value="Other" onClick={(event) => setGender(event.target.value)} control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField variant="outlined" fullWidth label="Qualification"
              onChange={(event) => setQualification(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField variant="outlined" fullWidth label="Specialization"
              onChange={(event) => setDepartment(event.target.value)}
            />
          </Grid>

          <Grid item xs={5}>
            <TextField variant="outlined"
              fullWidth 
              label="Start Time"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}

              onChange={(event) => setStartTime(event.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 17 }}>to</span>
          </Grid>
          <Grid item xs={5}>
            <TextField variant="outlined"
              fullWidth
              label="End Time"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={(event) => setEndTime(event.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="status-id">Select Status</InputLabel>
              <Select
                labelId="status-id"
                id="statusid"
                onChange={(event) => setStatus(event.target.value)}
                label="Select Status"
              >
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField variant="outlined" fullWidth label="Phone Number"
              onChange={(event) => setPhoneNo(event.target.value)} />
          </Grid>

          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={(event) => handlePicture(event)}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" style={{ background: "#22a6b3" }} component="span">
                Upload
              </Button>
            </label>
          </Grid>

          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar alt="" src={picture.filename} variant="rounded" className={classes.large} />
          </Grid>

          <Grid item md={12}>
            <Button variant="contained" color="primary" style={{ background: "#22a6b3" }} fullWidth onClick={() => handleSubmit()} >Submit Doctor Details</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );


}