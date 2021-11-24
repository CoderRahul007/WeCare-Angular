const { BookingModel, UserModel, CoachModel } = require('../Model/appSchema');
const validator = require('../Utilities/validator');
const helper = require('../Utilities/helpers');

exports.registerUser = async (req, res) => {
  try {
    const Name = req.body.name;
    const Password = req.body.password;
    const DateOfBirth = req.body.dateOfBirth;
    const Gender = req.body.gender;
    const MobileNumber = req.body.mobileNumber;
    const Email = req.body.email;
    const Pincode = req.body.pincode;
    const City = req.body.city;
    const State = req.body.state;
    const Country = req.body.country;
    const UserId = await helper.generateUserId();

    if (!validator.ValidateName(Name)) {
      res.status(400).json({
        message: 'Name should have minimum 3 and maximum 50 characters',
      });
    } else if (!validator.ValidatePassword(Password)) {
      res.status(400).json({
        message: 'Password should have minimum 5 and maximum 10 characters',
      });
    } else if (!validator.ValidateAge(DateOfBirth)) {
      res.status(400).json({
        message: 'Age should be greater than 20 and less than 100',
      });
    } else if (!validator.ValidateGender(Gender)) {
      res.status(400).json({
        message: 'Gender should be either M or F',
      });
    } else if (!validator.ValidateNumber(MobileNumber)) {
      res.status(400).json({
        message: 'Mobile Number should have 10 digits',
      });
    } else if (!validator.ValidateEmail(Email)) {
      res.status(400).json({
        message: 'Email should be a valid one',
      });
    } else if (!helper.uniqueEmail(Email)) {
      res.status(400).json({
        message: 'User exists with this email id',
      });
    } else if (!validator.ValidatePincode(Pincode)) {
      res.status(400).json({
        message: 'Pincode should have 6 digits',
      });
    } else if (!validator.ValidateCity(City)) {
      res.status(400).json({
        message: 'City should have minimum 3 and maximum 20 characters',
      });
    } else if (!validator.ValidateState(State)) {
      res.status(400).json({
        message: 'State should have minimum 3 and maximum 20 characters',
      });
    } else if (!validator.ValidateCountry(Country)) {
      res.status(400).json({
        message: 'Country should have minimum 3 and maximum 20 characters',
      });
    } else {
      //console.log(UserId);
      const user = await UserModel.create({
        UserId,
        Name,
        Password,
        Gender,
        DateOfBirth,
        Email,
        MobileNumber,
        Pincode,
        City,
        State,
        Country,
      });
      res.status(201).json({
        message: UserId,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const user = await UserModel.find({
      UserId: req.body.id,
      Password: req.body.password,
    });
    if (user.length > 0) {
      res.status(200).send(true);
    } else {
      res.status(400).json({
        message: 'Incorrect user id or password',
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.registerCoach = async (req, res) => {
  try {
    const Name = req.body.name;
    const Password = req.body.password;
    const DateOfBirth = req.body.dateOfBirth;
    const Gender = req.body.gender;
    const MobileNumber = req.body.mobileNumber;
    const CoachId = await helper.generateCoachId();
    const Speciality = req.body.speciality;

    if (!validator.ValidateName(Name)) {
      res.status(400).json({
        message: 'Name should have minimum 3 and maximum 50 characters',
      });
    } else if (!helper.uniqueCoachName(Name)) {
      res.status(400).json({
        message: 'Coach exists with this name',
      });
    } else if (!validator.ValidatePassword(Password)) {
      res.status(400).json({
        message: 'Password should have minimum 5 and maximum 10 characters',
      });
    } else if (!validator.ValidateAge(DateOfBirth)) {
      res.status(400).json({
        message: 'Age should be greater than 20 and less than 100',
      });
    } else if (!validator.ValidateGender(Gender)) {
      res.status(400).json({
        message: 'Gender should be either M or F',
      });
    } else if (!validator.ValidateNumber(MobileNumber)) {
      res.status(400).json({
        message: 'Mobile Number should have 10 digits',
      });
    } else if (!validator.ValidateSpeciality(Speciality)) {
      res.status(400).json({
        message: 'Specialty should have 10 to 50 characters',
      });
    } else {
      //console.log(UserId);
      const user = await CoachModel.create({
        CoachId,
        Name,
        Password,
        Gender,
        DateOfBirth,
        MobileNumber,
        Speciality,
      });
      res.status(201).json({
        message: CoachId,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.coachLogin = async (req, res, next) => {
  try {
    const coaches = await CoachModel.find({
      CoachId: req.body.id,
      Password: req.body.password,
    });
    if (coaches.length > 0) {
      res.status(200).send(true);
    } else {
      const er = new Error();
      er.status = 400;
      er.message = 'Incorrect user id or password';
      // res.status(400).json({
      //   message: 'Incorrect user id or password',
      // });
      next(er);
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllCoaches = async (req, res) => {
  try {
    const coaches = await CoachModel.find({});
    if (coaches.length > 0) {
      res.status(200).send(coaches);
    } else {
      res.status(400).json({
        message: 'No data of Coaches is available',
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getCoach = async (req, res) => {
  try {
    const coaches = await CoachModel.find(
      { CoachId: req.params.coachId },
      { _v: 0, _id: 0 }
    );
    if (coaches.length > 0) {
      res.status(200).send(coaches);
    } else {
      res.status(400).json({
        message: 'Coach Id does not exist',
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.find({
      UserId: req.params.userId,
    });
    if (user.length > 0) {
      res.status(200).send(user);
    } else {
      res.status(400).json({
        message: 'User Id does not exist',
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.makeAppointment = async (req, res) => {
  try {
    const { userId } = req.params;
    const { coachId } = req.params;
    const { slot } = req.body;
    const { dateOfAppointment } = req.body;
    if (!helper.coachExists(coachId)) {
      res.status(400).json({
        message: 'Coach Id does not exist',
      });
    } else if (!helper.userExists(userId)) {
      res.status(400).json({
        message: 'User Id does not exist',
      });
    } else if (!helper.sameSlot(slot, dateOfAppointment)) {
      res.status(400).json({
        message: 'There is an appointment in this slot already',
      });
    } else if (!validator.ValidateSlot(slot)) {
      res.status(400).json({
        message: 'Slot should be a valid one',
      });
    } else if (!validator.ValidateAppointment(dateOfAppointment)) {
      res.status(400).json({
        message: 'Date should be any upcoming 7 days',
      });
    } else {
      const bookingId = await helper.generateBookingId();
      const booking = await BookingModel.create({
        BookingId: bookingId,
        UserId: userId,
        CoachId: coachId,
        AppointmentDate: dateOfAppointment,
        Slot: slot,
      });
      res.status(200).send(true);
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.rescheduleAppointment = async (req, res) => {
  try {
    const BookingId = req.params.bookingId;
    const { slot } = req.body;
    const { dateOfAppointment } = req.body;
    if (!helper.sameSlot(slot, dateOfAppointment)) {
      res.status(400).json({
        message: 'There is an appointment in this slot already',
      });
    } else if (!validator.ValidateSlot(slot)) {
      res.status(400).json({
        message: 'Slot should be a valid one',
      });
    } else if (!validator.ValidateAppointment(dateOfAppointment)) {
      res.status(400).json({
        message: 'Date should be any upcoming 7 days"',
      });
    }
    if (helper.bookingExists(BookingId)) {
      const booking = await BookingModel.findOneAndUpdate(
        { BookingId: BookingId },
        { Slot: slot, AppointmentDate: dateOfAppointment },
        {
          new: true,
          runValidators: true,
        }
      );
      if (booking != null) {
        res.status(200).send(true);
      } else {
        res.status(400).json({
          message: 'Update Not Applied',
        });
      }
    } else {
      res.status(400).json({
        message: 'Booking Id does not exist',
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    if (!helper.bookingExists(bookingId)) {
      res.status(400).json({
        message: 'Could not delete this appointment',
      });
    } else {
      const bookDelete = await BookingModel.deleteOne({ BookingId: bookingId });
      if (bookDelete.deletedCount === 0) {
        res.status(404).json({
          message: 'Could Not Delete this appointment',
        });
      } else {
        res.status(200).send(true);
      }
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAppointmentsByCoach = async (req, res) => {
  try {
    const { coachId } = req.params;
    const bookings = await BookingModel.find(
      { CoachId: coachId },
      { _id: 0, _v: 0 }
    );
    if (bookings.length === 0) {
      res.status(400).json({
        message: 'Could not find any bookings',
      });
    } else {
      res.status(200).json({
        bookings,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAppointmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await BookingModel.find({ UserId: userId });
    if (bookings.length === 0) {
      res.status(400).json({
        message: 'Could not find any bookings',
      });
    } else {
      res.status(200).json({
        bookings,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.invalid = async (req, res) => {
  try {
    res.status(404).json({
      message: 'invalid path',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
