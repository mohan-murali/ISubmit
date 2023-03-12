const { model, Schema } = require("mongoose");

const submissionSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  feedback: {
    text: {
      type: String,
      required: true,
    },
    mark: {
      type: String,
      required: true,
    },
  },
});

const SubmissionModel = model("submission", submissionSchema);

module.exports = {
  SubmissionModel,
};
