const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3003;
const app = express();

// const databaseURL = "workouts";
// const collections = "workouts";
// const db = mongojs(databaseURL, collections);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workouts',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
);

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
