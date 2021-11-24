exports.ValidateName = (name) => {
  const Name = name.trim();
  if (Name.length < 3 || Name.length > 50) {
    return false;
  }
  return true;
};

exports.ValidatePassword = (pass) => {
  const Pass = pass.trim();
  if (Pass.length < 5 || Pass.length > 10) {
    return false;
  }
  return true;
};
exports.ValidateAge = (dob) => {
  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);
  const Age = getAge(dob);
  if (Age > 20 && Age < 100) {
    return true;
  }
  return false;
};

exports.ValidateGender = (gender) => {
  const Gender = gender.trim();
  if (Gender.length === 1 && (Gender === 'M' || Gender === 'F')) {
    return true;
  }
  return false;
};

exports.ValidateNumber = (number) => {
  const Num = number.trim();
  if (Num.length === 10) {
    return true;
  }
  return false;
};

exports.ValidatePincode = (pin) => {
  const Pin = pin.trim();
  if (Pin.length === 6) {
    return true;
  }
  return false;
};
exports.ValidateEmail = (email) => {
  const Email = email.trim();
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      Email
    )
  ) {
    return true;
  }

  return false;
};

exports.ValidateCity = (city) => {
  const City = city.trim();
  if (City.length < 3 || City.length > 20) {
    return false;
  }
  return true;
};

exports.ValidateState = (state) => {
  const State = state.trim();
  if (State.length < 3 || State.length > 20) {
    return false;
  }
  return true;
};

exports.ValidateCountry = (country) => {
  const Country = country.trim();
  if (Country.length < 3 || Country.length > 20) {
    return false;
  }
  return true;
};

exports.ValidateSpeciality = (speciality) => {
  const Speciality = speciality.trim();
  if (Speciality.length < 10 || Speciality.length > 50) {
    return false;
  }
  return true;
};
exports.ValidateSlot = (slot) => {
  const arr = slot.split(' ');
  let num = 0;
  let s = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (Number.isInteger(parseInt(arr[i], 10))) {
      num += 1;
    }
    if (arr[i] === 'AM' || arr[i] === 'PM') {
      s += 1;
    }
  }
  // console.log(arr);
  // console.log(num, s);
  if (num === 2 && s === 2) {
    return true;
  }
  return false;
};

exports.ValidateAppointment = (date) => {
  function addDays(date1, days) {
    const copy = new Date(Number(date1));
    copy.setDate(date1.getDate() + days);
    return copy;
  }
  const d = new Date(date);
  const today = new Date();
  const future = addDays(d, 7);
  if (d > today && d < future) {
    return true;
  }
  return false;
};
