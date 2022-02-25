const mongoose = require("mongoose");

module.exports = () => {
  mongoose.Promise = global.Promise;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(
    `mongodb+srv://nitin:b92f5M5v305CZWZg@cluster0.rvi68.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    options
  );
  //mongodb+srv://nitin:oXGtsHHlbD2uvMnS@cluster0.rvi68.mongodb.net/MediCare?retryWrites=true&w=majority

  // mongoose.connect("mongodb://localhost:27017/numeric")
  mongoose.connection
    // eslint-disable-next-line no-console
    .once("open", () => console.log("MongoDb running"))
    // eslint-disable-next-line no-console
    .on("error", (err) => console.log(err));
  // mongoose.set("debug", true);
};
