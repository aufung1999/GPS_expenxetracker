const Location = require("../models/location");
const User = require("../models/user");

exports.uploadLocation = async (req, res) => {
  console.log(req.body.location);
  // res.json({ success: true });
  const { place_id, location, viewport, name, count } = req.body.location;  // deconstruct from REQUEST

  const target_User = await User.findOne({ email: req.body.email });

  const target_Location = await Location.findOne({ user: target_User, place_id: place_id});

  console.log("target_Location: " + target_Location);

  if (target_Location == null) {
    const save_location = await Location({
      user: target_User,
      place_id: place_id,
      location: location,
      viewport: viewport,
      name: name,
      count: count,
    });

    await User.findOneAndUpdate(
      { email: req.body.email },
      { $push: { locations: save_location } }
    );

    console.log(target_User);

    await save_location.save();
    res.json({ success: true, save_location });
  } else if (target_Location != null) {
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
