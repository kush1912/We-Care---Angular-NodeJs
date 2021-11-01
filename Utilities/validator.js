const db = require('../model/db')

exports.validateName = (name) => {
    console.log(name);
    if (name.length >= 3 && name.length <= 50) return true
    return false
}

exports.validatePassword = (pass) => {
    console.log(pass);
    if (pass.length >= 5 && pass.length <= 10) return true
    return false
}

exports.validateAge = (dob) => {
    console.log(dob);
    const age = new Date().getFullYear() - dob.getFullYear()
    if (age >= 20 && age <= 100) return true
    return false
}

exports.validateGender = (gender) => {
    console.log(gender);
    if (gender === "M" || gender === "F") return true
    return false
}

exports.validatePhone = (phone) => {
    console.log(phone);
    if (String(phone).length === 10) return true
    return false
}

exports.validateEmail = (email) => {
    console.log(email);
    const pattern =  /^\w[\w\.]+@\w+\.com/
    if (pattern.test(email)) return true
    return false
}

exports.validatePin = (pin) => {
    console.log(pin);
    if (String(pin).length === 6) return true
    return false
}

exports.validateAddress = (val) => {
    console.log(val);
    if (val.length >= 3 && val.length <= 20) return true
    return false
}

exports.doesEmailExist = async (email) => {
    console.log(email);
    const elist = await db.user.find({}, {_id: 0, email: 1})
    for (let i = 0; i < elist.length; i++) {
        if (email === elist[i].email) return true
    }
    return false
}

exports.validateSpeciality = (val) => {
    console.log(val);
    if (val.length >= 3 && val.length <= 50) return true
    return false
}

exports.doesCoachNameExist = async (MobileNumber
    ) => {
    console.log(MobileNumber
        );
    const result = await db.coaches.find({}, {_id:0, MobileNumber

        : 1})
    for (let i = 0; i < result.length; i++) {
        if (MobileNumber
            = result[i].MobileNumber
            ) return true
    }
    return false
}

exports.doesUserExist = async (id) => {
    //console.log(id);
    const result = await db.user.findOne({UserId: id})
    //console.log(result);
    if (result) return true
    return false
}

exports.doesCoachExist = async (id) => {
    console.log(id);
    const result = await db.coaches.findOne({CoachId: id})
    //console.log(result)
    if (result) return true
    return false
}

exports.doesBookingExist = async (id) => {
    console.log(id);
    const result = await db.bookings.findOne({BookingId: id})
    // console.log(result)
    if (result) return true
    return false
}

exports.doesAppointmentExist = async (slot, appointmentDate) => {
    const result = await db.bookings.find({Slot: slot, AppointmentDate: appointmentDate}).countDocuments();
    //console.log(result);
    if(result>0) return true;
    return false;
}

exports.validateAppointment = (appointmentDate) => {
    //console.log(appointmentDate);
    var diffDays = parseInt((new Date(appointmentDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24), 10);
    // console.log(diffDays);
    if(parseInt(diffDays)<8) return true;
    return false;
}

exports.validateSlot = (slot) => { 
    console.log(slot);
    const pattern = /^(0?[1-9]|1[0-2]):([0-5]\d)\s?((?:A|P)\.?M\.?)$/i
    console.log(pattern.test(slot));
    return pattern.test(slot);
}