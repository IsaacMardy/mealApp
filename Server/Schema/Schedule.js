import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    userID : { type: ObjectId, required: true },
    sundayBreakfastMealID : { type: ObjectId },
    sundayLunchMealID : { type: ObjectId },
    sundayDinnerMealID : { type: ObjectId },
    mondayBreakfastMealID : { type: ObjectId },
    mondayLunchMealID : { type: ObjectId },
    mondayDinnerMealID : { type: ObjectId },
    tuesdayBreakfastMealID : { type: ObjectId },
    tuesdayLunchMealID : { type: ObjectId },
    tuesdayDinnerMealID : { type: ObjectId },
    wednesBreakfastMealID : { type: ObjectId },
    wednesdayLunchMealID : { type: ObjectId },
    wednesdayDinnerMealID : { type: ObjectId },
    thursdayBreakfastMealID : { type: ObjectId },
    thursdayLunchMealID : { type: ObjectId },
    thursdayDinnerMealID : { type: ObjectId },
    fridayBreakfastMealID : { type: ObjectId },
    fridayLunchMealID : { type: ObjectId },
    fridayDinnerMealID : { type: ObjectId },
    saturdayBreakfastMealID : { type: ObjectId },
    saturdayLunchMealID : { type: ObjectId },
    saturdayDinnerMealID : { type: ObjectId },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;