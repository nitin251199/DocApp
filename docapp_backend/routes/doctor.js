var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.post('/addblog', function(req,res){
  pool.query("insert into blog (blogtitle, blogcategory, blogmaterial, blogwriter, blogdate) values(?,?,?,?,?)",
  [req.body.blogtitle, req.body.blogcategory, req.body.blogmaterial, req.body.blogwriter, req.body.blogdate], function(err,result){
      if(err)
      {
        res.status(500).json(false)
      }
      else
      {
        res.status(200).json(true)
      }
  })
})

router.post('/fetchfees', function (req, res, next) {

  pool.query("select fees from doctors where doctorname=?",[req.body.doctorname], function (error, result) {
    if (error) {
      res.status(500).json([])
    }
    else {
      res.status(200).json({ data: result })
    }
  })
});

router.post('/checkdoctormobilenumber', function (req, res) {
  pool.query("select * from doctors where phoneno=?", [req.body.phoneno], function (error, result) {

      if (error) {
          res.status(500).json([])
      }
      else {
          if (result.length == 1) {
              res.status(200).json({ data: result, result: true })
          }
          else {
              res.status(200).json({ data: [], result: false })
          }
      }
  })
})

router.get('/fetchalldepartments', function (req, res, next) {

  pool.query("select * from departments", function (error, result) {
    if (error) {
      res.status(500).json([])
    }
    else {
      res.status(200).json({ data: result })
    }
  })
});

router.get('/fetchalldoctors', function (req, res, next) {

  pool.query("select * from doctors", function (error, result) {
    if (error) {
      res.status(500).json([])
    }
    else {
      res.status(200).json({ data: result })
    }
  })
});

router.post('/fetchdoctorsbydepartment', function (req, res, next) {

  pool.query("select * from doctors where department=?", [req.body.department], function (error, result) {
    if (error) {
      console.log("ERROR",error)
      res.status(500).json([])
    }
    else {
      res.status(200).json({ data: result })
    }
  })
})

router.post('/insertdoctor', upload.single("picture"), function (req, res, next) {
  console.log("BODY:", req.body);
  console.log("FILE", req.file);
  pool.query("insert into doctors (doctorname, gender, qualification, starttime,endtime, status, phoneno, picture, department) values(?,?,?,?,?,?,?,?,?)", [req.body.doctorname, req.body.gender, req.body.qualification, req.body.starttime, req.body.endtime, req.body.status, req.body.phoneno, req.file.originalname, req.body.department], function (error, result) {
    if (error) {
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })
});

router.post('/editdoctorpicture', upload.single("picture"), function (req, res, next) {
  pool.query("update doctors set picture=? where doctorid=?", [req.file.originalname, req.body.doctorid], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })
});

router.post('/updatedoctordata', function (req, res, next) {
  console.log("BODY:", req.body);
  pool.query("update doctors set doctorname=?, gender=?, qualification=?, starttime=?, endtime=?, status=?, phoneno=?, department=? where doctorid=?", [req.body.doctorname, req.body.gender, req.body.qualification, req.body.starttime, req.body.endtime, req.body.status, req.body.phoneno, req.body.department, req.body.doctorid], function (error, result) {
    if (error) {
      console.log("ERRRRR", error)
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })
});

router.post('/deletedoctor', function (req, res, next) {
  pool.query("delete from doctors where doctorid=?", [req.body.doctorid], function (error, result) {
    if (error) {
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })
});

module.exports = router;
