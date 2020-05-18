const mongoose = require("mongoose");
const BucketListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  BucketList: [
    {
      todo: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "not done",
      },
      addDate: {
        type: Date,
        default: Date.now,
      },
      finishDate: {
        type: Date,
        default: () => {
          return null;
        },
      },
    },
  ],
});

module.exports = BucketList = mongoose.model("bucketlist", BucketListSchema);
