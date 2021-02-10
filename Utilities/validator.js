const db = require('../model/db')

exports.validateName = (name) => {
    if (name.length >= 3 && name.length <= 50) return true
    return false
}

exports.validatePassword = (pass) => {
    if (pass.length >= 5 && pass.length <= 10) return true
    return false
}

exports.validateAge = (dob) => {
    const age = new Date().getFullYear() - dob.getFullYear()
    if (age >= 20 && age <= 100) return true
    return false
}

exports.validateGender = (gender) => {
    if (gender === "M" || gender === "F") return true
    return false
}

exports.validatePhone = (phone) => {
    if (String(phone).length === 10) return true
    return false
}

exports.validateEmail = (email) => {
    // const pattern = new RegExp(".+@.+\.com")
    const pattern =  /^\w[\w\.]+@\w+\.com/
    if (pattern.test(email)) return true
    return false
}

exports.validatePin = (pin) => {
    if (String(pin).length === 6) return true
    return false
}

exports.validateAddress = (val) => {
    if (val.length >= 3 && val.length <= 20) return true
    return false
}

exports.doesEmailExist = async (email) => {
    const elist = await db.user.find({}, {_id: 0, email: 1})
    for (let i = 0; i < elist.length; i++) {
        if (email === elist[i].email) return true
    }
    return false
}

exports.validateSpeciality = (val) => {
    if (val.length >= 10 && val.length <= 50) return true
    return false
}

exports.doesCoachNameExist = async (name) => {
    const result = await db.Coaches.find({}, {_id:0, name: 1})
    for (let i = 0; i < result.length; i++) {
        if (name = result[i].name) return true
    }
    return false
}

exports.doesUserExist = async (id) => {
    const result = await db.user.findOne({UserID: id})
    if (result) return true
    return false
}

exports.doesCoachExist = async (id) => {
    const result = await db.coaches.findOne({CoachID: id})
    console.log(result);
    if (result) return true
    return false
}

exports.doesBookingExist = async (id) => {
    const result = await db.bookings.findOne({BookingID: id})
    // console.log(result)
    if (result) return true
    return false
}

exports.doesAppointmentExist = async (slot, appointmentDate) => {
    const result = await db.bookings.find({Slot: slot, AppointmentDate: appointmentDate}).countDocuments()
    console.log(result);
    if (result) return true
    return false
}

exports.validateAppointment = (appointmentDate) => {
    // const msDay = 86400000
    // const presentDate = new Date()
    // console.log(new Date())
    var diffDays = parseInt((new Date(appointmentDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24), 10);
    // if ((appointmentDate - new Date()) < (7 * msDay)) return true
    console.log(diffDays);
    if(parseInt(diffDays)<8) return true
    return false;
}