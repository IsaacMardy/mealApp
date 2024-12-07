import axios from "axios";

let SelectedSchedule = null; // Singleton reference

// Function to create or retrieve the singleton instance of SelectedSchedule
export const getSchedule = () => {
    if (!SelectedSchedule) {
        SelectedSchedule = {
            SundayBreakfast: [],
            SundayLunch: [],
            SundayDinner: [],
            MondayBreakfast: [],
            MondayLunch: [],
            MondayDinner: [],
            TuesdayBreakfast: [],
            TuesdayLunch: [],
            TuesdayDinner: [],
            WednesdayBreakfast: [],
            WednesdayLunch: [],
            WednesdayDinner: [],
            ThursdayBreakfast: [],
            ThursdayLunch: [],
            ThursdayDinner: [],
            FridayBreakfast: [],
            FridayLunch: [],
            FridayDinner: [],
            SaturdayBreakfast: [],
            SaturdayLunch: [],
            SaturdayDinner: [],

        };
    }
    return SelectedSchedule;
};

// export const getSchedule = () => SelectedSchedule;

export const setSchedule = (schedule) => {
    Object.assign(SelectedSchedule, schedule); // Merges new values into the existing object
};

export const addMealtoSchedule = (time, meal) => {
    if (time === "Sunday0") {
        addSundayBreakfast(meal)
    } else if (time === "Sunday1") {
        addSundayLunch(meal)
    } else if (time === "Sunday2") {
        addSundayDinner(meal)
    } else if (time === "Monday0") {
        addMondayBreakfast(meal)
    } else if (time === "Monday1") {
        addMondayLunch(meal)
    } else if (time === "Monday2") {
        addMondayDinner(meal)
    } else if (time === "Tuesday0") {
        addTuesdayBreakfast(meal)
    } else if (time === "Tuesday1") {
        addTuesdayLunch(meal)
    } else if (time === "Tuesday2") {
        addTuesdayDinner(meal)
    } else if (time === "Wednesday0") {
        addWednesdayBreakfast(meal)
    } else if (time === "Wednesday1") {
        addWednesdayLunch(meal)
    } else if (time === "Wednesday2") {
        addWednesdayDinner(meal)
    } else if (time === "Thursday0") {
        addThursdayBreakfast(meal)
    } else if (time === "Thursday1") {
        addThursdayLunch(meal)
    } else if (time === "Thursday2") {
        addThursdayDinner(meal)
    } else if (time === "Friday0") {
        addFridayBreakfast(meal)
    } else if (time === "Friday1") {
        addFridayLunch(meal)
    } else if (time === "Friday2") {
        addFridayDinner(meal)
    } else if (time === "Saturday0") {
        addSaturdayBreakfast(meal)
    } else if (time === "Saturday1") {
        addSaturdayLunch(meal)
    } else if (time === "Saturday2") {
        addSaturdayDinner(meal)
    }else{

    }
    console.log(SelectedSchedule);
}

export function addSundayBreakfast(meal) {
    SelectedSchedule.SundayBreakfast.push(meal);
}
export function addSundayLunch(meal) {
    SelectedSchedule.SundayLunch.push(meal);
}
export function addSundayDinner(meal) {
    SelectedSchedule.SundayDinner.push(meal);
}
export function addMondayBreakfast(meal) {
    SelectedSchedule.MondayBreakfast.push(meal);
}
export function addMondayLunch(meal) {
    SelectedSchedule.MondayLunch.push(meal);
}
export function addMondayDinner(meal) {
    SelectedSchedule.MondayDinner.push(meal);
}
export function addTuesdayBreakfast(meal) {
    SelectedSchedule.TuesdayBreakfast.push(meal);
}
export function addTuesdayLunch(meal) {
    SelectedSchedule.TuesdayLunch.push(meal);
}
export function addTuesdayDinner(meal) {
    SelectedSchedule.TuesdayDinner.push(meal);
}
export function addWednesdayBreakfast(meal) {
    SelectedSchedule.WednesdayBreakfast.push(meal);
}
export function addWednesdayLunch(meal) {
    SelectedSchedule.WednesdayLunch.push(meal);
}
export function addWednesdayDinner(meal) {
    SelectedSchedule.WednesdayDinner.push(meal);
}
export function addThursdayBreakfast(meal) {
    SelectedSchedule.ThursdayBreakfast.push(meal);
}
export function addThursdayLunch(meal) {
    SelectedSchedule.ThursdayLunch.push(meal);
}
export function addThursdayDinner(meal) {
    SelectedSchedule.ThursdayDinner.push(meal);
}
export function addFridayBreakfast(meal) {
    SelectedSchedule.FridayBreakfast.push(meal);
}
export function addFridayLunch(meal) {
    SelectedSchedule.FridayLunch.push(meal);
}
export function addFridayDinner(meal) {
    SelectedSchedule.FridayDinner.push(meal);
}
export function addSaturdayBreakfast(meal) {
    SelectedSchedule.SaturdayBreakfast.push(meal);
}
export function addSaturdayLunch(meal) {
    SelectedSchedule.SaturdayLunch.push(meal);
}
export function addSaturdayDinner(meal) {
    SelectedSchedule.SaturdayDinner.push(meal);
}

export function addPersonalSchedule(schedule) {

    const scheduleWithUserId = { ...schedule, userId: `${JSON.parse(localStorage.getItem('loggedInUser'))._id}` };

    axios.put('http://localhost:5001/addPersonalSchedule', scheduleWithUserId)
        .then()
        .catch((err) => alert('Error in adding personal schedule'))
}

export function publishSchedule(schedule) {

    const scheduleWithUserId = { ...schedule, userId: `${JSON.parse(localStorage.getItem('loggedInUser'))._id}` };

    axios.post('http://localhost:5001/publishSchedule', scheduleWithUserId)
        .then()
        .catch((err) => alert('Error in publishing personal schedule'))
}