import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import { postData } from "../../FetchNodeServices";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function DocAppointments(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  var u = JSON.parse(sessionStorage.getItem("docdetails"));

  const [appointment, setAppointment] = useState([]);

  const fetchAppointmentsbyUser = async () => {
    var body = { doctor: u.doctorname };
    var result = await postData("appointment/fetchappointmentsbydoctor", body);
      setAppointment(result.data.sort((a, b) => new Date(Date.parse(b.date)) - new Date(Date.parse(a.date))))
    
  };

  useEffect(function () {
    fetchAppointmentsbyUser();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  function AppointmentTable() {
    return (
      <MaterialTable
        columns={[
          { title: "Patient Name", field: "patientname" },
          {
            title: "Appt Date",
            render: (rowData) => (
              <span>
                {new Date(Date.parse(rowData.date)).getDate() +
                  "-" +
                  (new Date(Date.parse(rowData.date)).getMonth() + 1) +
                  "-" +
                  new Date(Date.parse(rowData.date)).getFullYear()}
              </span>
            ),
          },
          { title: "Appt Time", field: "time" },
          {
            title: "Paid Amount",
            field: "amount",
            // lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
          },
        ]}
        data={appointment}
        actions={[
          {
            icon: "chat",
            tooltip: "Chat",
            onClick: (event, rowData) => props.history.push({pathname:"/docprofile"},{patientname:rowData.patientname,doctorname:rowData.doctorname,mobileno:rowData.phoneno,message:rowData.message}),
          },
        ]}
        components={{
          Action: (props) => (
            <div style={{paddingInline:20}}>
            <Button
              onClick={(event) => props.action.onClick(event, props.data)}
              variant="contained"
              style={{ textTransform: "capitalize", width: 150 }}
              size="small"
            >
              Go To Session
            </Button>
            </div>
          ),
        }}
        options={{
          actionsColumnIndex: -1,
          toolbar: false,
        }}
      />
    );
  }


  return (
    <div style={{ width: "100%" }}>
      <AppBar color="transparent" position="static">
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Appointments" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {AppointmentTable()}
      </TabPanel>
    </div>
  );
}
