import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { getData, ServerURL, postData, postDataAndImage } from "../FetchNodeServices";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Avatar } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Swal from 'sweetalert2'
import AddDoctors from './AddDoctors';
import SaveIcon from '@material-ui/icons/Save';
import { isEmpty, errorMessage, isDigits, isMobile, isEmail } from "../Checks";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subdiv: {
    width: 950,
    height: "auto",
    background: "#f1f2f6",
    marginTop: 5,
    padding: 15,
    borderRadius: 5,
  },
  droot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  dsubdiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#ecf0f1',
    padding: 1,
    borderRadius: 5,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  input: {
    display: 'none',
  },
  fab: {
    margin: theme.spacing(2),
  },
}));

export default function DisplayAllStores(props) {
  const classes = useStyles();
  const [doctorList, setDoctorList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [doctorId, setDoctorId] = useState("")
  const [doctorName, setDoctorName] = useState("")
  const [gender, setGender] = useState("")
  const [qualification, setQualification] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [status, setStatus] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [department, setDepartment] = useState("")
  const [btnStatus, setBtnStatus] = useState(false)
  const [picture, setPicture] = useState({ filename: "", bytes: "" })
  const [oldPicture, setOldPicture] = useState("")



  const handleCancelPicture = async () => {
    setPicture({ filename: oldPicture, bytes: "" })
    setBtnStatus(false)
  }

  const handleSavePicture = async () => {
    var formData = new FormData();
    formData.append("doctorid", doctorId)
    formData.append("picture", picture.bytes)
    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage("doctor/editdoctorpicture", formData, config);
    if (result) {
      Swal.fire({
        title: 'E-Consult.com',
        text: 'Your Picture has been updated successfully...',
        imageUrl: '/doc-icon.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    }
    else {
      Swal.fire({
        title: 'E-Consult.com',
        text: 'Error in updating the picture...',
        imageUrl: '/doc-icon.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    }
    setOpen(false);
    setBtnStatus(false);
    fetchAllDoctors();
  }

  const handlePicture = (event) => {
    setOldPicture(picture.filename)
    setPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0]
    })
    setBtnStatus(true);
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
      var body = {
        "doctorid": doctorId, "doctorname": doctorName, "gender": gender, "qualification": qualification, "starttime": startTime, "endtime": endTime, "status": status,
        "phoneno": phoneNo, "department": department
      }
      var result = await postData("doctor/updatedoctordata", body);
      if (result) {
        Swal.fire({
          title: 'E-Consult.com',
          text: 'Your Record has been updated successfully...',
          imageUrl: '/doc-icon.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
      }
      else {
        Swal.fire({
          title: 'E-Consult.com',
          text: 'Error in updating the record...',
          imageUrl: '/doc-icon.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
      }
      setOpen(false);
    }
    fetchAllDoctors();
  }


  const handleDeleteDoctor = async (data) => {
    var body = { doctorid: data.doctorid };
    Swal.fire({
      imageUrl: "/doc-icon.png",
      imageWidth: 200,
      title: "E-Consult.com",
      text: "Are u Sure to Delete Selected Record...",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        result = await postData("doctor/deletedoctor", body);
        if (result) {
          Swal.fire("Deleted!", "Your record has been deleted.", "success");
          fetchAllDoctors();
        }
        else
          Swal.fire("FAIL!!!!", "Server Error Fail to Delete Record", "error");

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Record is safe :)", "error");
      }
    });
    fetchAllDoctors();
  }

  const handleClickOpen = (data) => {
    setDoctorId(data.doctorid)
    setDoctorName(data.doctorname)
    setGender(data.gender)
    setQualification(data.qualification)
    setStartTime(data.starttime)
    setEndTime(data.endtime)
    setStatus(data.status)
    setPhoneNo(data.phoneno)
    setDepartment(data.department)
    setPicture({ filename: `${ServerURL}/images/${data.picture}`, bytes: "" })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBtnStatus(false)
  };

  const storeDialog = () => {
    return (
      <div>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"><div
            style={{
              width: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: 1,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 1,
                padding: 1,
              }}
            >
              <span>
                <img alt="" src="/doc-icon.png" width="40" />
              </span>{" "}
              <span>Edit Doctor Details</span>
            </div>
          </div></DialogTitle>
          <DialogContent>
            <div className={classes.droot}>
              <div className={classes.dsubdiv}>
                <Grid container xs={12} spacing={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                  <Grid item xs={6}>
                    <TextField variant="outlined" fullWidth label="Doctor Name" value={doctorName}
                      onChange={(event) => setDoctorName(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup row
                        aria-label="gender"
                        defaultValue={gender}
                        name="radio-buttons-group"
                      >
                        <FormControlLabel value="Female" onClick={(event) => setGender(event.target.value)} control={<Radio />} label="Female" />
                        <FormControlLabel value="Male" onClick={(event) => setGender(event.target.value)} control={<Radio />} label="Male" />
                        <FormControlLabel value="Other" onClick={(event) => setGender(event.target.value)} control={<Radio />} label="Other" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="Qualification" value={qualification}
                      onChange={(event) => setQualification(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth label="Specialization" value={department}
                      onChange={(event) => setDepartment(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <TextField variant="outlined" fullWidth label="Start Time" value={startTime}
                      onChange={(event) => setStartTime(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 17 }}>to</span>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField variant="outlined" fullWidth label="End Time" value={endTime}
                      onChange={(event) => setEndTime(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="status-id">Select Status</InputLabel>
                      <Select
                        labelId="status-id"
                        id="statusid"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        label="Select Status"
                      >
                        <MenuItem value="Online">Online</MenuItem>
                        <MenuItem value="Offline">Offline</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField variant="outlined" fullWidth label="Phone Number" value={phoneNo}
                      onChange={(event) => setPhoneNo(event.target.value)} />
                  </Grid>

                  <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {!btnStatus ? <>
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
                          Edit Picture
                        </Button>
                      </label></> : <></>}
                    {btnStatus ? <>
                      <Button onClick={() => handleSavePicture()}>Save</Button>
                      <Button onClick={() => handleCancelPicture()}>Cancel</Button></> : <></>}
                  </Grid>

                  <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar alt="" src={picture.filename} variant="rounded" className={classes.large} />
                  </Grid>

                  <Grid item md={12}>
                    <Button variant="contained" color="primary" style={{ background: "#22a6b3" }} fullWidth onClick={() => handleSubmit()} >Edit Doctor Details</Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    );

  }

  useEffect(function () {
    fetchAllDoctors()
  }, [])


  const fetchAllDoctors = async () => {
    var list = await getData('doctor/fetchalldoctors')

    setDoctorList(list.data)

  }

  function SimpleAction() {

    return (
      <MaterialTable
        title={
          <>
            <span>
              <img alt="" src="/glasskart.png" width="40" />
            </span>&nbsp;&nbsp;{" "}
            <b style={{ fontSize: 18, opacity: 0.5 }}> OUR DOCTORS </b>{" "}
            <Tooltip title="Add Stores" >
              <Fab color="primary" size="small" onClick={() => props.setComponent(<AddDoctors />)} className={classes.fab}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </>
        }
        columns={[
          { title: 'Id', field: 'doctorid' },
          { title: 'Doctor Name', field: 'doctorname' },
          { title: 'Gender', field: 'gender' },
          { title: 'Qualification', field: 'qualification' },
          { title: 'Department', field: 'department' },
          {
            title: 'Active Time',
            render: rowData => <div>{rowData.starttime} to {rowData.endtime}</div>
          },
          { title: 'Status', field: 'status' },
          { title: 'Contact', field: 'phoneno' },
          {
            title: "Picture",
            render: (rowData) => (
              <img
                alt={rowData.picture}
                style={{ width: 50, height: 50, borderRadius: 10 }}
                src={`${ServerURL}/images/${rowData.picture}`}
              />
            ),
          },
        ]}
        data={doctorList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Doctor',
            onClick: (event, rowData) => handleClickOpen(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Doctor',
            onClick: (event, rowData) => handleDeleteDoctor(rowData)
          }
        ]}
      />
    )
  }

  return (

    <div className={classes.root}>
      <div className={classes.subdiv}>
        {SimpleAction()}
      </div>
      {storeDialog()}
    </div>
  )


}