const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Rider = require("../models/rider");
const mongoose = require("mongoose");
const Rides = require("../models/rides");
const RideHistory = require("../models/rideHistory");
const router = express.Router();
const Dava = require("../models/availableDrivers");
const db =
  "mongodb://usermamuliga:passwordmamuliga1@ds145072.mlab.com:45072/sharecab";
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
// let token = req.header("x-token");

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
      email: user.email,
      contact: user.contact
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
          uid: user._id,
          name: user.firstName + " " + user.lastName,
          isDriver: user.isDriver,
          email: user.email,
          contact: user.contact,
          isPromo: user.isPromo
          //  proPic: user.proPic
        };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });
      }
    });
  });
});

router.post("/image");

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
          email: user.email,
          contact: user.contact,
          isPromo: user.isPromo
          //  proPic: user.proPic
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

router.post("/rides", async (req, res) => {
  let riderData = req.body;
  rider = new Rider(riderData);
  try {
    await rider.save();
    res.send({ msg: "Suceess" });
  } catch (ex) {
    res.send({ msg: "failed" });
  }
});

router.get("/rides/:did", async (req, res) => {
  const riders = await Rider.find({ driver: req.params.did }).sort("-distance");
  res.send(riders);
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select("firstName lastName contact");
  res.send(user);
});

router.post("/ridesd", async (req, res) => {
  let ridesData = req.body;
  rides = new Rides(ridesData);

  try {
    await rides.save();
    res.send(rides);
  } catch (ex) {
    res.send({ msg: "failed" });
  }
});

router.get("/ridesd/:id", async (req, res) => {
  const id = req.params.id;
  const ride = await Rides.findOne({
    riders: { $elemMatch: { uid: id } }
  });
  res.send(ride);
});
router.delete("/ridesd/:id", async (req, res) => {
  const id = req.params.id;
  const r = await Rides.findByIdAndDelete(id);
  res.send(r);
});

router.put("/ridesd/:id",async (req,res)=>{
  const id= req.params.id;
  const {isConfirmed, uid} = req.body;
  const ride = await Rides.findById(id) ;
  ride.riders.find(r=>r.uid===uid).isConfirmed=isConfirmed;
  await ride.save();
  res.send(ride);
})

router.put("/ridesd/d/:id",async (req,res)=>{
  const id= req.params.id;
  const {isConfirmed} = req.body;
  const ride = await Rides.findByIdAndUpdate(id,{isConfirmed}) ;
  
  
  res.send(ride);
})

router.get("/ridesd/:id",async (req,res)=>{
  const r= await Rides.findById(req.params.id);
  res.send(r);
  
})

router.delete("/rides/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const r = await Rider.findByIdAndDelete(id);
    // const r = [];
    // await ids.forEach(async id => {
    //   const z = await Rider.findByIdAndDelete(id);
    //   r.push(z);
    // });
    res.send({ dlt: r });
  } catch (ex) {
    res.send({ dlt: ex.message });
  }
});

router.post("/rideHistory", async (req, res) => {
  let rideHistory = req.body;
  rides = new RideHistory(rideHistory);
  try {
    await rides.save();
    res.send({ hys: "Suceess" });
  } catch (ex) {
    res.send({ msg: "failed" });
  }
});

router.get("/rideHistory", async (req, res) => {
  const riders = await RideHistory.find();
  res.send(riders);
});

router.put("/addPromo", async (req, res) => {
  const promo = await User.findByIdAndUpdate(req.body.id, { isPromo: true });
  res.send("promo added");
});

router.get("/addPromo", async (req, res) => {
  const isPromo = await User.find("isPromo");
  res.send(isPromo);
});

router.get("/userd", async (req, res) => {
  const usersd = await User.find();
  res.send(usersd);
});
// router.get("/apiUrl", (req, res) => {
//   req =
//     "https://eu1.locationiq.com/v1/reverse.php?key=6939bb17fa5a3e&lat=6.7932617&lon=79.8974264&format=json";
//   res.send(res);
// });

router.post("/adrivers", async (req, res) => {
  const dava = new Dava(req.body);
  await dava.save();
  res.send(dava);
});

router.delete("/adrivers/:did", async (req, res) => {
  await Dava.deleteOne({ driver: req.params.did });
  res.send({ msg: "Unavailable success" });
});

router.get("/adrivers", async (req, res) => {
  const davas = await Dava.find();
  res.send(davas);
});

router.get("/adrivers/:did", async (req, res) => {
  const dava = await Dava.findOne({ driver: req.params.did });
  res.send(dava);
});

module.exports = router;
