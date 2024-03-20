const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    location: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      enum: ['donor', 'recipient'],
    },
    chatHistory: [
          {
            is_user_message:{
              type:Boolean,
              default:true
            },
            text: String,
          },
    ],
    // chatHistory: [
    //   {
    //     role: {
    //       type: String,
    //       enum: ['user', 'model'],
    //     },
    //     parts: [
    //       {
    //         text: 'String',
    //       },
    //     ],
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
