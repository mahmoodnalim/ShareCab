const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const Rider = require("../models/rider");
const mongoose = require("mongoose");
  const db = "mongodb://usermamuliga:passwordmamuliga1@ds145072.mlab.com:45072/sharecab";
  //  "mongodb://localhost/sharecab";
 

mongoose.connect(
  db,
  err => {
    if (err) {
      console.error("Error!" + err);
    } else {
      console.log("connected to mongoDb");
    }
  }
);

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthoraized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    return res.status(401).send("Unauthoraized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthoraized request");
  }
  req._id = payload.subject;
  next();
}

router.get("/events", async function(req, res) {
  const token = req.header("x-token");

  if (!token) return res.send({ error: "Access denied! Token not provided" });
  try {
    const deUser = jwt.verify(token, "secretKey");
    const user = await User.findById(deUser.uid);
    res.send(user);
  } catch (err) {
    return res.send({ error: "Access denied! Invalid Token " });
  }
});

router.put("/events", async function(req, res) {
  let token = req.header("x-token");

  if (!token) return res.send({ error: "Access denied! Token not provided" });
  try {
    const deUser = jwt.verify(token, "secretKey");
    const user = await User.findByIdAndUpdate(deUser.uid, req.body);
    let payload = {
      uid: user._id,
      name: user.firstName + " " + user.lastName,
      isDriver: user.isDriver,
      email: user.email
    };
    token = jwt.sign(payload, "secretKey");
    res.send(token);
  } catch (err) {
    return res.send({ error: "Access denied! Invalid Token " });
  }
});

router.post("/register", (req, res) => {
  let userData = req.body;
  let fuser = new User(userData);
  User.findOne({ email: userData.email }, (error, user) => {
    if (user) {
      console.log(user);
      return res.status(400).send("Email Already Exists!");
    }

    fuser.save((error, registeredUser) => {
      if (error) {
        console.log(error);
      } else {
        let payload = {
          uid: fuser._id,
          name: fuser.firstName + " " + fuser.lastName,
          isDriver: fuser.isDriver,
          email: fuser.email
        };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });
      }
    });
  });
});

// `router.post('/rider', (req, res) => {
//     let riderData = req.body
//     let rider = new Rider(riderData)
//     rider.save((error, registeredUser) => {
//         if (error) {
//             console.log(error)
//         } else {
//             let payload = { subject: registeredUser._id }
//             let token = jwt.sign(payload, 'secretKay')
//             res.status(200).send({ token })
//         }
//     })
// })`

// router.post('/register',(req,res)=>{
//     let userData = req.body
//     let user = new User(userData)
//     let x = User.findOne({email:userData.email})
//     console.log('Registered user is ssssss');
//     user.save((error, registeredUser)=> {
//         if (error) {
//           console.log(error)
//         }else{
//             let payload = {subject:registeredUser._id}
//             let token = jwt.sign(payload, 'secretKay')
//             res.status(200).send({token})
//         }
//     })
// })

router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invali email");
      } else if (user.password !== userData.password) {
        res.status(401).send("Invali password");
      } else {
        let payload = {
          uid: user._id,
          name: user.firstName + " " + user.lastName,
          isDriver: user.isDriver,
          email: user.email
        };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });
      }
    }
  });
});

router.get("/events", (req, res) => {
  let events = [
    {
      id: "1",
      name: "Auto Expo",
      description: "lorem ipsum"
    },
    {
      id: "2",
      name: "Auto Expo",
      description: "lorem ipsum"
    },
    {
      id: "3",
      name: "Auto Expo",
      description: "lorem ipsum"
    }
  ];
  res.json(events);
});
router.get("/special", (req, res) => {
  let events = [
    {
      id: "1",
      name: "Auto Expo",
      description: "lorem ipsum"
    },
    {
      id: "2",
      name: "Auto Expo",
      description: "lorem ipsum"
    },
    {
      id: "3",
      name: "Auto Expo",
      description: "lorem ipsum"
    }
  ];
  res.json(special);
});
module.exports = router;
