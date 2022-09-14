var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");
var Appointment = require("./models/appointments");

router.get("/getappointmentsbypatient/:patientname", function (req, res, next) {
  var { patientname } = req.params;
  Appointment.findOne({ patientname }, function (err, result) {
    if (err) {
      res.status(500).json({ status: false, message: err.toString() });
    } else {
      res.status(200).json({ status: true, result, message: "Data found!" });
    }
  });
});

router.get("/getappointmentsbydoctor/:doctorname", function (req, res, next) {
  var { doctorname } = req.params;
  Appointment.findOne({ doctorname }, function (err, result) {
    if (err) {
      res.status(500).json({ status: false, message: err.toString() });
    } else {
      res.status(200).json({ status: true, result, message: "Data found!" });
    }
  });
});

router.get("/getallappointments", function (req, res, next) {
  Appointment.find({}, function (err, result) {
    if (err) {
      res.status(500).json({ status: false, message: err.toString() });
    } else {
      res.status(200).json({ status: true, result, message: "Data found!" });
    }
  });
});

router.get("/fetchallappointments", function (req, res, next) {
  pool.query("select * from appointments", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {
      res.status(200).json({ data: result });
    }
  });
});

router.post("/fetchappointmentsbydoctor", function (req, res, next) {
  pool.query(
    "select * from appointments where doctorname=?",
    [req.body.doctor],
    function (error, result) {
      if (error) {
        console.log("ERROR", error);
        res.status(500).json([]);
      } else {
        res.status(200).json({ data: result });
      }
    }
  );
});

router.post("/fetchappointmentsbyuser", function (req, res, next) {
  pool.query(
    "select * from appointments where userid=?",
    [req.body.userid],
    function (error, result) {
      if (error) {
        console.log("ERROR", error);
        res.status(500).json([]);
      } else {
        res.status(200).json({ data: result });
      }
    }
  );
});

router.post("/insertappointments", function (req, res, next) {
  pool.query(
    "insert into appointments (patientname, date, department, doctorname, phoneno, message, time, amount) values(?,?,?,?,?,?,?,?)",
    [
      req.body.patientname,
      req.body.date,
      req.body.department,
      req.body.doctor,
      req.body.phoneno,
      req.body.message,
      req.body.time,
      req.body.amount,
    ],
    function (error, result) {
      if (error) {
        console.log("ERROR", error);
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
});

router.post("/updateappointments", function (req, res, next) {
  console.log("BODY:", req.body);
  pool.query(
    "update appointments set patientname=?, date=?, department=?, doctorname=?, phoneno=?, message=?, time=?, amount=? where appointmentid=?",
    [
      req.body.patientname,
      req.body.date,
      req.body.department,
      req.body.doctor,
      req.body.phoneno,
      req.body.status,
      req.body.phoneno,
      req.body.message,
      req.body.time,
      req.body.amount,
      req.body.appointmentid,
    ],
    function (error, result) {
      if (error) {
        console.log("ERRRRR", error);
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
});

router.post("/deleteappointments", function (req, res, next) {
  pool.query(
    "delete from appointments where appointmentid=?",
    [req.body.appointmentid],
    function (error, result) {
      if (error) {
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
});

module.exports = router;
