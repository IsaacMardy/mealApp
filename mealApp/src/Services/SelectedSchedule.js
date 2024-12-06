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
    if(time==="Sunday0"){
        addSundayBreakFast(meal)
    }
    console.log(SelectedSchedule);
}

export function addSundayBreakFast(meal) {
    SelectedSchedule.SundayBreakfast.push(meal);
}
export function addSundayLunch(meal) {
    SelectedSchedule.SundayLunch.push(meal);
}
export function addSundayDinner(meal) {
    SelectedSchedule.SundayDinner.push(meal);
}


export function addPersonalSchedule(schedule){

    const scheduleWithUserId = { ...schedule, userId: `${JSON.parse(localStorage.getItem('loggedInUser'))._id}` };

    axios.put('http://localhost:5001/addPersonalSchedule', scheduleWithUserId)
          .then()
          .catch((err) => alert('Error in adding personal schedule'))
  }

export function publishSchedule(schedule){

    const scheduleWithUserId = { ...schedule, userId: `${JSON.parse(localStorage.getItem('loggedInUser'))._id}` };

    axios.post('http://localhost:5001/publishSchedule', scheduleWithUserId)
          .then()
          .catch((err) => alert('Error in publishing personal schedule'))
  }