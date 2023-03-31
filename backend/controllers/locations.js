const Location = require("../models/location");
const User = require("../models/user");

exports.uploadLocation = async (req, res) => {
  //   console.log(req.body.location);
  // res.json({ success: true });
  const { place_id, location, viewport, name, count } = req.body.location; // deconstruct from REQUEST

  const target_User = await User.findOne({ email: req.body.email });

  const target_Location = await Location.findOne({
    user: target_User,
    place_id: place_id,
  });

  //   console.log("target_Location: " + target_Location);

  // if the locations NEVER exist in MONGODB
  if (target_Location == null) {
    const save_location = await Location({
      user: target_User,
      place_id: place_id,
      location: location,
      viewport: viewport,
      name: name,
      count: count,
      date: new Date(Date.now()).toLocaleString().split(", ")[0],
    });

    await User.findOneAndUpdate(
      { email: req.body.email },
      { $push: { locations: save_location } }
    );

    await save_location.save();
    res.json({ success: true, save_location });
  }
  // if the locations exist in MONGODB
  else if (target_Location != null) {
    console.log("target_Location.count: " + target_Location.count);
    if (target_Location.count > count) {
      await Location.updateOne(
        { _id: target_Location },
        {
          $set: {
            count: target_Location.count + 1,
          },
        }
      );
    }
  } else if (target_Location.count < count) {
    await Location.updateOne(
      { _id: target_Location },
      {
        $set: {
          count: count,
        },
      }
    );
  }
};

exports.getLocations = async (req, res) => {
  console.log("***getLocations:***", req.body.email);

  const target_User = await User.findOne({ email: req.body.email });

  //   console.log("target_User: " + target_User);

  const target_Locations = await Location.find({ user: target_User });

  console.log("target_Locations: " + target_Locations);
  // .populate("Location")
  // .then((res) => {
  //   //if succeded do this block of code
  //   res.json({ success: true, location: res });
  // })
  // .catch((err) => {
  //   //catch error
  //   res.json({ success: false, message: "FAILED to rerieve locations" });
  // });
  try {
    res.json({ success: true, location: target_Locations });
  } catch (error) {
    res.json({ success: false, message: "FAILED to rerieve locations" });
  }
};
