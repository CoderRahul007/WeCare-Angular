const { BookingModel, UserModel, CoachModel } = require('../Model/appSchema');

exports.generateUserId = async () => {
  const users = await UserModel.find({});
  let Id;
  if (users.length >= 1) {
    Id = `UI-000${users.length + 1}`;
  } else {
    Id = 'UI-0001';
  }
  return Id;
};

exports.uniqueEmail = async (email) => {
  const users = await UserModel.find({ Email: email });
  if (users.length > 0) {
    return false;
  }
  return true;
};

exports.generateCoachId = async () => {
  const coaches = await CoachModel.find({});
  let Id;
  if (coaches.length >= 1) {
    Id = `CI-000${coaches.length + 1}`;
  } else {
    Id = 'CI-0001';
  }
  return Id;
};

exports.generateBookingId = async () => {
  const bookings = await BookingModel.find({});
  let Id;
  if (bookings.length >= 1) {
    Id = `BI-000${bookings.length + 1}`;
  } else {
    Id = 'BI-0001';
  }
  return Id;
};

exports.uniqueCoachName = async (name) => {
  const coaches = await CoachModel.find({ Name: name });
  if (coaches.length > 0) {
    return false;
  }
  return true;
};

exports.coachExists = async (coachId) => {
  const coach = await CoachModel.find({ CoachId: coachId });
  if (coach.length > 0) {
    return true;
  }
  return false;
};

exports.userExists = async (userId) => {
  const user = await UserModel.find({ UserId: userId });
  if (user.length > 0) {
    return true;
  }
  return false;
};
exports.sameSlot = async (slot, date) => {
  const booking = await BookingModel.find({
    Slot: slot,
    AppointmentDate: date,
  });
  if (booking.length > 0) {
    //console.log(booking);
    return true;
  }
  // console.log('else', booking);
  return false;
};

exports.bookingExists = async (bookingId) => {
  const booking = await BookingModel.find({
    BookingId: bookingId,
  });
  if (booking.length > 0) {
    return true;
  }
  return false;
};
