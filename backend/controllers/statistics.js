const Location = require("../models/location");
const User = require("../models/user");
const Bill = require("../models/bill");
const Statistic = require("../models/statistic");

exports.updateStatistics = async (req, res, next) => {
  const { email, bill_exp, location_exp } = req.body;

  const target_User = await User.findOne({ email: email });

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log("bill_exp: " + bill_exp);
  console.log(bill_exp);
  console.log("location_exp: " + location_exp);
  console.log(location_exp);

  // // INITIALIZE if NOT in Statistic Collection
  // if (target_Statistic === undefined || null) {
  // come from the  "location"  side
  if (location_exp !== undefined) {
    //INSIDE the objects-array
    for (const key in location_exp) {
      const target_Location = await Location.findOne({ _id: key });

      const target_Statistic = await Statistic.findOne({
        user: target_User,
        location: target_Location,
      });

      if (target_Statistic) {
        await Statistic.updateOne(
          { _id: target_Statistic },
          { $set: { expense: location_exp[key] } }
        );
      } else {
        const save_Statistic = await Statistic({
          user: target_User,
          location: target_Location,
          name: target_Location.name,
          date: target_Location.date,
          expense: location_exp[key],
          place_id: target_Location.place_id,
        });

        await save_Statistic.save();
      }
    }
  }
  // come from the  "bill"  side
  if (bill_exp !== undefined) {
    //INSIDE the objects-array
    for (const key in bill_exp) {
      // const target_Statistic = await Statistic.findOne({ user: target_User });

      const target_Bill = await Bill.findOne({ _id: key });

      console.log("target_Bill: " + target_Bill);

      const save_Statistic = await Statistic({
        user: target_User,
        bill: target_Bill,
        name: target_Bill.bill,
        date: target_Bill.due_date,
        expense: target_Bill.bill_price,
      });
      await save_Statistic.save();
    }
  }

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  next();
};
