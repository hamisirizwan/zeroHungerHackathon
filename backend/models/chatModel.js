const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    chatHistory: [
      {
        role: {
          type: String,
          enum: ['user', 'model'],
        },
        parts: [
          {
            text: 'String',
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);
