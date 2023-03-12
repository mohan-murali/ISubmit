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
  assignment: {
    text: {
      type: String,
      required: true,
    },
    moduleCode: {
      type: String,
      required: true,
    },
    moduleTitle: {
      type: String,
      required: true,
    },
  },
});

const SubmissionModel = model("submission", submissionSchema);

module.exports = {
  SubmissionModel,
};
