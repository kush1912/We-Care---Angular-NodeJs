const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/wecare';
mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).
then(() => {
    try{
        console.log("You are connected to the database! ");
    }catch(err){
        console.log(err);
    }
});

/*
{
    "Name": "setna",
    "Password": "setna123",
    "DateOfBirth": "1996-01-01",
    "Gender": "Male",
    "MobileNumber": 122334,
    "Email": "setna@gmail.com",
    "Pincode":123444,
    "City":"Delhi",
    "State": "Delhi",
    "Country": "India"
}
*/
const usersSchema = new mongoose.Schema(
    {
        UserId: {
            type: String,
            unique: true,
            required: [true,'Required Field'],  // Required Field will be the message that will be displayed? 
        },
        Name: {
            type: String,
            required: [true,'Required Field'],
        },
        Password: {
            type: String,
            required: [true,'Required Field'],
        },
        Gender: {
            type: String,
            required: [true,'Required Field'],
        },
        DateOfBirth: {
            type: Date
        },
        Email: {
            type: String,
        },
        MobileNumber: {
            type: String
        },
        PinCode: {
            type: Number
        },
        City: {
            type: String
        },
        State: {
            type: String
        },
        Country: {
            type: String
        }
    }
)

/*
{
    "Name": "John",
    "Password": "John123",
    "DateOfBirth": "1985-01-01",
    "Gender": "Male",
    "MobileNumber": 1223342345,
    "Specialty": "Depression Issues"
}
*/

const coachesSchema = new mongoose.Schema(
    {
        CoachId: {
            type: String,
            requred: [true,'Required Field'],
        },
        Name: {
            type: String,
            required: [true,'Required Field'],
        },
        Password: {
            type: String,
        },
        Gender: {
            type: String,
            required: [true,'Required Field'],
        },
        DateOfBirth: {
            type: Date,
        },
        MobileNumber: {
            type: Number,
        },
        Speciality: {
            type: String,
        }
    }
)



const bookingsSchema = new mongoose.Schema(
    {
        BookingId: {
            type: String,
            required: [true,'Required Field'],
        },
        UserId: {
            type: String
        },
        CoachId:{
            type: String
        },
        AppointmentDate: {
            type: Date,
            requred: [true,'Required Field'],
        },
        Slot: {
            type: String,
        } 
    },
    {
        timestamps: {
          createdAt: true,
          updatedAt: true,
        },
    }

)

// Collection name will be made from this inside Quote.

// const model = {}
exports.user = mongoose.model( 'user',usersSchema);  
exports.coaches = mongoose.model( 'coaches',coachesSchema);
exports.bookings = mongoose.model( 'bookings',bookingsSchema);
// module.exports = model;
