const Location = require("../models/location");
const User = require('../models/user');

exports.uploadLocation = async (req, res) => {
  console.log(req.body.location);
  // res.json({ success: true });
  const { place_id, location, viewport, name, count } = req.body.location;
  const save_location = await Location({
    place_id: place_id,
    location: location,
    viewport: viewport,
    name: name,
    count: count,
  });

  const target_User = User.find({email: req.body.email})
  
  console.log(target_User)

  await save_location.save();
  res.json({ success: true, save_location });
};
