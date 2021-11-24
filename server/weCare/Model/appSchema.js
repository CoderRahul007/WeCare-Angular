const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/wecare', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const usersSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      unique: true,
      required: [true, 'Required Field'],
    },
    Name: {
      type: String,
      required: [true, 'Required Field'],
    },
    Password: {
      type: String,
      required: [true, 'Required Field'],
    },
    Gender: {
      type: String,
      required: [true, 'Required Field'],
    },
    DateOfBirth: {
      type: Date,
      required: [true, 'Required Field'],
    },
    Email: {
      type: String,
      unique: true,
      required: [true, 'Required Field'],
    },
    MobileNumber: {
      type: String,
      required: [true, 'Required Field'],
    },
    Pincode: {
      type: Number,
      required: [true, 'Required Field'],
    },
    City: {
      type: String,
      required: [true, 'Required Field'],
    },
    State: {
      type: String,
      required: [true, 'Required Field'],
    },
    Country: {
      type: String,
      required: [true, 'Required Field'],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const bookingsSchema = new mongoose.Schema(
  {
    BookingId: {
      type: String,
      required: [true, 'Required Field'],
    },
    UserId: {
      type: String,
      required: [true, 'Required Field'],
    },
    CoachId: {
      type: String,
      required: [true, 'Required Field'],
    },
    AppointmentDate: {
      type: Date,
      required: [true, 'Required Field'],
    },
    Slot: {
      type: String,
      required: [true, 'Required Field'],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const coachesSchema = new mongoose.Schema(
  {
    CoachId: {
      type: String,
      required: [true, 'Required Field'],
    },
    Name: {
      type: String,
      required: [true, 'Required Field'],
    },
    Password: {
      type: String,
      required: [true, 'Required Field'],
    },
    Gender: {
      type: String,
      required: [true, 'Required Field'],
    },
    DateOfBirth: {
      type: Date,
      required: [true, 'Required Field'],
    },
    MobileNumber: {
      type: String,
      required: [true, 'Required Field'],
    },
    Speciality: {
      type: String,
      required: [true, 'Required Field'],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const BookingModel = mongoose.model('bookings', bookingsSchema);
const UserModel = mongoose.model('users', usersSchema);
const CoachModel = mongoose.model('coaches', coachesSchema);

module.exports = {
  BookingModel,
  UserModel,
  CoachModel,
};
