const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { SubmissionModel } = require("./models/submission");
const Feedback = require("./models/feedback");

const app = express();

//Configure the dotenv package so that we can use env variables accross the app
dotenv.config();

const connectDB = async () => {
  const dbUri = process.env.MONGO_URI || "";
  console.log(dbUri);
  try {
    await mongoose.connect(dbUri);
    console.log("Mongo DB connected ...");
  } catch (err) {
    console.error("error is", err.message);
    process.exit(1);
  }
};

connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/submit", async (req, res) => {
  try {
    const { id, assignment, url } = req.body;
    // const url = await axios.post()
    console.log(id, assignment);
    if ((id, assignment, url)) {
      let newSubmission = new SubmissionModel({
        id,
        url,
        assignment,
      });

      const result = await newSubmission.save();

      res.status(200).json({
        subNr: result._id,
        success: true,
        message: "Saved successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "You need to send id, assignment and url",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Failed to submit assignment, error -> ${err}`,
    });
  }
});

app.get("/getFeedback", async (req, res) => {
  try {
    const { subNr } = req.body;
    if (subNr) {
      const feedback = await Feedback.findOne({ subNr });
      if (feedback) {
        res.status(200).json({
          feedback: { subNr: feedback.subNr, text: feedback.text, mark: feedback.mark },
          success: true
        });
      } else {
        res.status(400).json({
          success: false,
          message: "The submission number does not exist. Please input a valid submission number",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Please input a valid submission number",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Failed to fetch the feedback, error -> ${err}`,
    });
  }
})

app.post("/submitFeedback", async (req, res) => {
  try {
    const { subNr, text, mark } = req.body;
    if (subNr && text && mark) {
      const feedback = await Feedback.create({ subNr, text, mark });
      if (feedback) {
        res.status(200).json({
          feedback,
          success: true,
          message: "Saved successfully",
        });
      }
    }

  } catch (err) {

  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
