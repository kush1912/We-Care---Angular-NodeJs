const db = require('../model/db');
const {user} = require('../model/db');
const {coaches} = require('../model/db');
const {bookings} = require('../model/db');
const validators = require('../Utilities/validator')
const helper = require('../Utilities/helper')

// Data manipulation = Async wale function await....study.

exports.register = async(req,res) =>{
    try{

        console.log(req.body)
        // Destructuring of req.body
        const {Name, Password, DateOfBirth, Gender, MobileNumber, Email, PinCode, City, State, Country} = req.body
        console.log(Email);
        if(!validators.validateName(Name))
        {
            res.status(400).json({
                message: "Name should have minimum 3 and maximum 50 characters"
            })
            return;
        }
        if(!validators.validatePassword(Password))
        {
            res.status(400).json({
                message: "Password should have minimum 5 and maximum 10 characters",
            })
            return;
        }
        if(!validators.validateAge(new Date(DateOfBirth)))
        {
            res.status(400).json({
                message:  "Age should be greater than 20 and less than 100",
            })
            return;
        }
        if(!validators.validateGender(Gender))
        {
            res.status(400).json({
                message: "Gender",
            })
            return;
        }
        if (!validators.validatePhone(MobileNumber)) {
            res.status(400).json({message: "Mobile Number should have 10 digits"})
            return
        }

        if (!validators.validateEmail(Email)) {
            res.status(400).json({message: "Email should be a valid one"})
            return
        }

        if (!validators.validatePin(PinCode)) {
            res.status(400).json({message: "Pincode should have 6 digits"})
            return
        }
        if (!validators.validateAddress(City) || !validators.validateAddress(State) || !validators.validateAddress(Country)) {
            res.status(400).json({message: "City should have minimum 3 and maximum 20 characters"})
            return
        }
        const flag = await db.user.find({Email:Email}).count();
        if(flag){
            // 400 Bad Request
            res.status(400).json({
                message: "Email Already Exist"
            })
            return;
        }
        const UserId = await helper.genUserId();
        await db.user.create({
            UserId,Name,Password,DateOfBirth: new Date(DateOfBirth),Gender,MobileNumber,Email,PinCode,City,State,Country
        })
        res.status(200).json({
            message: `${UserId} Created Succesfully!`,
        })

    }catch(err)
    {
        res.status(500).json({
            error: err.message,
        })
        return;
    }
}

exports.registerAsCoach = async(req,res) =>{
    try{

        console.log(req.body)
        // Destructuring of req.body
        const {Name, Password, DateOfBirth, Gender, MobileNumber, Speciality} = req.body
        
        if(!validators.validateName(Name))
        {
            res.status(400).json({
                message: "Name should have minimum 3 and maximum 50 characters"
            })
            return;
        }
        if(!validators.validatePassword(Password))
        {
            res.status(400).json({
                message: "Password should have minimum 5 and maximum 10 characters",
            })
            return;
        }
        if(!validators.validateAge(new Date(DateOfBirth)))
        {
            res.status(400).json({
                message:  "Age should be greater than 20 and less than 100",
            })
            return;
        }
        if(!validators.validateGender(Gender))
        {
            res.status(400).json({
                message: "Gender should be either M or F",
            })
            return;
        }
        if (!validators.validatePhone(MobileNumber)) {
            res.status(400).json({message: "Mobile Number should have 10 digits"})
            return
        }

 
        if (!validators.validateSpeciality(Speciality)) {
            res.status(400).json({message: "Speciality should have 10 to 50 characters"})
            return
        }
        if (!validators.doesCoachNameExist(Name)){
            res.status(400).json({message: "Coach exists with this name"})
            return;
        }
        const CoachId = await helper.genCoachId();
        
        await db.coaches.create({
            CoachId,Name,Password,DateOfBirth: new Date(DateOfBirth),Gender,MobileNumber,Speciality
        })
        res.status(200).json({
            message: `${CoachId} Created Succesfully!`,
        })

    }catch(err)
    {
        res.status(500).json({
            error: err.message,
        })
        return;
    }
}

exports.makeAppointment = async(req,res) =>{
    try{
        console.log(req.body)
        const {Slot, DateOfAppointment} = req.body;
        const {userId, coachId} =req.params;

        let flag = await validators.doesUserExist(userId);
        if(!flag){
            res.status(400).json({message: "User Id does not exist"});
            return;
        }

        flag = await validators.doesCoachExist(coachId);
        if(!flag){
            res.status(400).json({message: "Coach Id does not exist!"});
            return;
        }

        if(!validators.validateSlot(Slot)){
            res.status(400).json({message:"Slot should be a valid One!"});
            return;
        }

        if(!validators.validateAppointment(DateOfAppointment))
        {
            res.status(400).json({
                message: "Date should be any upcoming 7 days!",
            })
            return;
        }

        flag = await validators.doesAppointmentExist(DateOfAppointment);
        if(flag){
            res.status(400).json({message: "There is an appointment in this slot already!"});
            return;
        }

        const BookingId = await helper.genBookingId();
        const CoachId = req.params.coachId;
        const UserId = req.params.userId;
        await db.bookings.create({
            BookingId, CoachId, UserId,AppointmentDate: new Date(DateOfAppointment),Slot   // Be careful that the name matches with the db key Values.
        })
        res.status(200).json({
            message: `${BookingId} Created Succesfully!`,
        })

    }catch(err)
    {
        // console.log("Error "+err)
        res.status(500).json({
            error: err.message,
        })
        return;
    }
}

exports.login = async(req,res) =>{
    try{
        //console.log(req.body)
        const {UserId, Password} = req.body;
        const doc = await db.user.findOne({UserId:UserId},{_id:0,Password:1})
        // console.log(doc);   /// When there is no document matching it return null (check how exist works).
            if(!doc)
            {
                res.status(400).json({
                    message: "No user found with that UserId!"
                });
                return;
            }
            else
            {
                //console.log(doc.Password);
                //console.log(Password);
                if(doc.Password == Password){
                    res.status(200).json({
                        message:"Logged in..."
                    });
                }
                else{
                    res.status(400).json({
                        message: " Please enter correct Password!"
                    });
                }
            }
    }catch(err)
    {
        res.status(500).json({
            error: err.message
        })
        return;
    }
}

exports.loginAsCoach = async(req,res) => {
    try{
        //console.log(req.body)
        const {CoachId, Password} = req.body;
        const doc = await db.coaches.findOne({CoachId:CoachId},{_id:0,Password:1})
        console.log(Password);
        console.log(doc);   /// When there is no document matching it return null (check how exist works).
            if(!doc)
            {
                res.status(400).json({
                    message: "No user found with that CoachId!"
                });
                return;
            }
            else
            {
                //console.log(doc.Password);
                // console.log(Password);
                if(doc.Password == Password){
                    res.status(200).json({
                        message:"Logged in...As Coach"
                    });
                }
                else{
                    res.status(400).json({
                        message: " Please enter correct Password!"
                    });
                }
            }
    }catch(err)
    {
        res.status(500).json({
            error: err.message
        })
        return;
    }
}

exports.getCoaches = async(req,res) => {
    try{
        const all_coaches = await db.coaches.find({},{_id: 0, __v: 0});
        if(all_coaches.length>0){
            console.log(all_coaches.length);
            res.status(200).json({          // If the status is not mentioned it doesn't gives the output.
                status: 'success',
                results: all_coaches.length,
                data: {
                    all_coaches,
                },
            });
        }else{
            res.status(400).json({
                status:'success',
                data: {
                    message: 'No Coaches available',
                }
            });
        }
    }
    catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err,
        });
    }
};

exports.getCoachById = async(req,res) => {
    try{
        const coach_details = await db.coaches.findOne({CoachId:req.params.coachId},{_id: 0, __v: 0});
        if(coach_details!=null){
            res.status(200).json({
                status: 'success',
                data: {
                    coach_details,
                }
            });
        }
        else{
            res.status(400).json({
                status: 'success',
                data: {
                    message: 'No coach found with that ID!'
                }
            });
        }
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err,
        });
    }
};

exports.getUserById = async(req,res) => {
    try{
        console.log(req.params.userId);
        const user_details = await db.user.findOne({UserId:req.params.userId},{_id:0, __v: 0});
        console.log(user_details);
        if(user_details!=null){
            res.status(200).json({
                status: 'success',
                data: {
                    user_details,
                }
            });
        }
        else{
            console.log("ent");
            res.status(400).json({
                status: 'success',
                data: {
                    message: 'No user found with that ID!'
                }
            });
        }
    }catch(err){
        console.log("entersd");
        res.status(404).json({
            status: 'Failed',
            message: err,
        });
    }
}

// Study More on that findOneUpdate
exports.reschedule = async(req,res) => {
    try{
        const {Slot,DateOfAppointment} = req.body;
        
        let flag = await validators.doesBookingExist(req.params.bookingId);
        if(!flag){
            res.status(400).json({message: "Booking does not Exist!"});
            return;
        }

        if(!validators.validateSlot(Slot)){
            res.status(400).json({message:"Slot should be a valid One!"});
            return;
        }

        if(!validators.validateAppointment(DateOfAppointment))
        {
            res.status(400).json({
                message: "Date should be any upcoming 7 days!",
            })
            return;
        }

        flag = await validators.doesAppointmentExist(DateOfAppointment);
        if(flag){
            res.status(400).json({message: "There is an appointment in this slot already!"});
            return;
        }

        const result = await db.bookings.findOneAndUpdate(
            {
                BookingId: req.params.bookingId
            },
            {
                BookingId: req.params.bookingId,
                Slot:Slot,
                AppointmentDate: DateOfAppointment
            });
        if(result){
            res.status(200).json({message:"Booking updated!"});
        }
    }catch(err)
    {
        console.log("Error Found in catch!");
        res.status(404).json({
            message: 'Bookings Not updated!'
        })
    }
}

exports.cancelAppointment = async(req,res) =>{
    //console.log(req.params.bookingId);
    const BookingId = req.params.bookingId;

    let flag = await validators.doesBookingExist(req.params.bookingId);
    if(!flag){
        res.status(400).json({message: "Booking does not Exist!"});
        return;
    }

    const delDet = await db.bookings.deleteOne({BookingId: req.params.bookingId});
    console.log(delDet);
    if(delDet.deletedCount===0){
        res.status(404).json({
            status:"Failed",
            message: "Booking deletion Failed!"
        });
    }else{
        res.status(200).json({
            status:"Sucsess",
            message:`${BookingId} deleted!`
        });
    }
}

exports.appointmentsByUserId =async(req,res) => {
    try{
        const user_appointments = await db.bookings.find({UserId:req.params.userId},{_id: 0, __v: 0});
        if(user_appointments.length>0){
            res.status(200).json({
                results: user_appointments.length,
                status: 'success',
                data: {
                    user_appointments,
                }
            });
        }
        else{
            res.status(400).json({
                status: 'success',
                data: {
                    message: 'No Bookings found with that ID!'
                }
            });
        }
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err,
        });
    }
}

exports.appointmentsByCoachId = async(req,res) => {
    try{
        const coach_appointments = await db.bookings.find({CoachId:req.params.coachId},{_id: 0, __v: 0});
        if(coach_appointments.length>0){
            res.status(200).json({
                results: coach_appointments.length,
                status: 'success',
                data: {
                    coach_appointments,
                }
            });
        }
        else{
            res.status(400).json({
                status: 'success',
                data: {
                    message: 'No Bookings found with that ID!'
                }
            });
        }
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err,
        });
    }

}

exports.invalidUrl = async(req,res,next) => {
    const err = new Error();
    err.message = "Please enter a valid Url!";
    err.status = 404;
    next(err);
}