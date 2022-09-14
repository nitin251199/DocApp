var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");
var User = require("./models/userdetails");

router.put(
  "/updateuserpicture/:_id",
  upload.single("picture"),
  function (req, res, next) {
    console.log("FILE", req.file);
    const { _id } = req.params;
    User.findOneAndUpdate({ _id }, req.file.originalname, { new: true }, function (err, data) {
      if (err) {
        res.status(500).json({ status: false, message: err.toString() });
      } else {
        res
          .status(200)
          .json({ status: true, data, message: "User picture updated successfully!" });
      }
    });
  }
);

router.put("/updateuser/:_id", function (req, res) {
  const { _id } = req.params;
  User.findOneAndUpdate({ _id }, req.body, { new: true }, function (err, data) {
    if (err) {
      res.status(500).json({ status: false, message: err.toString() });
    } else {
      res
        .status(200)
        .json({ status: true, data, message: "User updated successfully!" });
    }
  });
});

router.get("/getuserbyname/:username", function (req, res) {
  const { username } = req.params;
  User.findOne({ username }, function (err, data) {
    if (err) {
      res.status(500).json({ status: false, message: err });
    } else {
      console.log(data);
      res.status(200).json({ status: true, data, message: "Data found!" });
    }
  });
});

router.post("/adduser", function (req, res) {
  const user = new User(req.body);
  user.save(function (err, data) {
    if (err) {
      res.status(500).json({ status: false, message: err.toString() });
    } else {
      console.log(data);
      res.status(200).json({ status: true, data, message: "User Created!" });
    }
  });
});

router.get("/getallusers", function (req, res) {
  User.find({}, function (err, data) {
    if (err) {
      res.status(500).json({ status: false, message: err });
    } else {
      res.status(200).json({ status: true, data, message: "Data found!" });
    }
  });
});

// router.post("/smsapi", function (req,res,next) {
//   const accountSid = "ACdbe07e946a1049e84b41ea754ab14b4f";
//   const authToken = "e0c7226a65f8f9dc5ec40cf8717832fb";
//   const client = require("twilio")(accountSid, authToken);

//   client.messages
//     .create({
//       body: `Your OTP for login is ${req.body.otp}`,
//       messagingServiceSid: "MG48a34c7d8bded1759c31490ea4489c13",
//       to: `+91${req.body.mobileno}`,
//     })
//     .then((message) => res.status(200).json({id : message.sid}))
//     .done();
// });

router.post("/fetchalladdresses", function (req, res) {
  pool.query(
    "select * from useraddress where mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      if (error) {
        res.status(500).json([]);
      } else {
        res.status(200).json({ data: result });
      }
    }
  );
});

router.post("/insertaddress", function (req, res, next) {
  console.log("BODY:", req.body);
  pool.query(
    "insert into useraddress (mobileno, name, mobilenumber, pincode, housenumber, address, landmark, city, state) values(?,?,?,?,?,?,?,?,?) ",
    [
      req.body.mobileno,
      req.body.name,
      req.body.mobilenumber,
      req.body.pincode,
      req.body.housenumber,
      req.body.address,
      req.body.landmark,
      req.body.city,
      req.body.state,
    ],
    function (error, result) {
      if (error) {
        console.error(error);
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
});

router.post("/updateaddress", function (req, res, next) {
  console.log("BODY:", req.body);
  pool.query(
    "update useraddress set mobileno=?, name=?, mobilenumber=?, pincode=?, housenumber=?, address=?, landmark=?, city=?, state=? where addressid=?",
    [
      req.body.mobileno,
      req.body.name,
      req.body.mobilenumber,
      req.body.pincode,
      req.body.housenumber,
      req.body.address,
      req.body.landmark,
      req.body.city,
      req.body.state,
      req.body.addressid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
});

router.post("/deleteaddress", function (req, res, next) {
  pool.query(
    "delete from useraddress where addressid=?",
    [req.body.addressid],
    function (error, result) {
      if (error) {
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
});

router.post("/getbp", function (req, res) {
  pool.query(
    "select userbphigh,userbplow from userhealthdata where usermobileno=? and userbphigh>=0 and userbplow>=0 order by id desc",
    [req.body.usermobileno],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json([]);
      } else {
        pool.query(
          "select userbphigh,userbplow from userhealthdata where usermobileno=? and userbphigh>=0 and userbplow>=0",
          [req.body.usermobileno],
          function (e, r) {
            if (e) {
              res.status(500).json([]);
            } else {
              res.status(200).json({ graphdata: r, data: result });
            }
          }
        );
      }
    }
  );
});

router.post("/getglucose", function (req, res) {
  pool.query(
    "select userglucose from userhealthdata where usermobileno=? and userglucose>=0 order by id desc",
    [req.body.usermobileno],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json([]);
      } else {
        pool.query(
          "select userglucose from userhealthdata where usermobileno=? and userglucose>=0",
          [req.body.usermobileno],
          function (e, r) {
            if (e) {
              res.status(500).json([]);
            } else {
              res.status(200).json({ graphdata: r, data: result });
            }
          }
        );
      }
    }
  );
});

router.post("/gettemp", function (req, res) {
  pool.query(
    "select usertemp from userhealthdata where usermobileno=? and usertemp>=0 order by id desc",
    [req.body.usermobileno],
    function (error, result) {
      if (error) {
        res.status(500).json([]);
      } else {
        pool.query(
          "select usertemp from userhealthdata where usermobileno=? and usertemp>=0",
          [req.body.usermobileno],
          function (e, r) {
            if (e) {
              res.status(500).json([]);
            } else {
              res.status(200).json({ graphdata: r, data: result });
            }
          }
        );
      }
    }
  );
});

router.post("/getweight", function (req, res) {
  pool.query(
    "select userweight from userhealthdata where usermobileno=? and userweight>=0 order by id desc",
    [req.body.usermobileno],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json([]);
      } else {
        pool.query(
          "select userweight from userhealthdata where usermobileno=? and userweight>=0",
          [req.body.usermobileno],
          function (e, r) {
            if (e) {
              res.status(500).json([]);
            } else {
              res.status(200).json({ graphdata: r, data: result });
            }
          }
        );
      }
    }
  );
});

router.post("/insertbp", function (req, res) {
  pool.query(
    "insert into userhealthdata (usermobileno,userbphigh,userbplow) values(?,?,?)",
    [req.body.usermobileno, req.body.userbphigh, req.body.userbplow],
    function (err, result) {
      if (err) {
        res.status(500).json({ result: false });
      } else {
        var data = {
          userbphigh: req.body.userbphigh,
          userbplow: req.body.userbplow,
        };
        res.status(200).json({ data: data, result: true });
      }
    }
  );
});

router.post("/insertglucose", function (req, res) {
  pool.query(
    "insert into userhealthdata (usermobileno,userglucose) values(?,?)",
    [req.body.usermobileno, req.body.userglucose],
    function (err, result) {
      if (err) {
        res.status(500).json({ result: false });
      } else {
        var data = { userglucose: req.body.userglucose };
        res.status(200).json({ data: data, result: true });
      }
    }
  );
});

router.post("/inserttemp", function (req, res) {
  pool.query(
    "insert into userhealthdata (usermobileno,usertemp) values(?,?)",
    [req.body.usermobileno, req.body.usertemp],
    function (err, result) {
      if (err) {
        res.status(500).json({ result: false });
      } else {
        var data = { usertemp: req.body.usertemp };
        res.status(200).json({ data: data, result: true });
      }
    }
  );
});

router.post("/insertweight", function (req, res) {
  pool.query(
    "insert into userhealthdata (usermobileno,userweight) values(?,?)",
    [req.body.usermobileno, req.body.userweight],
    function (err, result) {
      if (err) {
        res.status(500).json({ result: false });
      } else {
        var data = { userweight: req.body.userweight };
        res.status(200).json({ data: data, result: true });
      }
    }
  );
});

router.post("/checkusermobilenumber", function (req, res) {
  pool.query(
    "select * from userdetails where mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json([]);
      } else {
        if (result.length == 1) {
          res.status(200).json({ data: result, result: true });
        } else {
          res.status(200).json({ data: [], result: false });
        }
      }
    }
  );
});

router.post("/fetchuserbyname", function (req, res) {
  pool.query(
    "select * from userdetails where name=?",
    [req.body.name],
    function (error, result) {
      if (error) {
        res.status(500).json([]);
      } else {
        if (result.length == 1) {
          res.status(200).json({ data: result, result: true });
        } else {
          res.status(200).json({ data: [], result: false });
        }
      }
    }
  );
});

router.post("/insertuser", function (req, res) {
  pool.query(
    "insert into userdetails (emailid, mobileno, username, password) values(?,?,?,?); insert into userhealthdata (usermobileno, userweight, usertemp, userbphigh, userbplow, userglucose) values(?,0,0,0,0,0)",
    [
      req.body.emailid,
      req.body.mobileno,
      req.body.username,
      req.body.password,
      req.body.mobileno,
    ],
    function (error, result) {
      if (error) {
        res.status(500).json({ result: false });
      } else {
        var data = {
          emailid: req.body.emailid,
          mobileno: req.body.mobileno,
          username: req.body.username,
        };
        res.status(200).json({ data: data, result: true });
      }
    }
  );
});

router.post("/edituser", function (req, res) {
  pool.query(
    "update userdetails set mobileno=?, username=?, gender=?, age=?, bloodgroup=?, height=?, weight=?, address=?, city=?, state=? where userid=?",
    [
      req.body.mobileno,
      req.body.username,
      req.body.gender,
      req.body.age,
      req.body.bloodgroup,
      req.body.height,
      req.body.weight,
      req.body.address,
      req.body.city,
      req.body.state,
      req.body.userid,
    ],
    function (error, result) {
      if (error) {
        console.log("err", error);
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
});

router.post(
  "/edituserpicture",
  upload.single("picture"),
  function (req, res, next) {
    console.log("BODY", req.body);
    console.log("FILE", req.file);

    pool.query(
      "update userdetails set picture=? where userid=?",
      [req.file.originalname, req.body.userid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  }
);

module.exports = router;
