let SelectedSchedule = null; // Singleton reference

// Function to create or retrieve the singleton instance of SelectedSchedule
export const getSchedule = () => {
    if (!SelectedSchedule) {
        SelectedSchedule = {
            id: "",
            Sunday: [{}, {}, {}],
            Monday: [{}, {}, {}],
            Tuesday: [{}, {}, {}],
            Wednesday: [{}, {}, {}],
            Thursday: [{}, {}, {}],
            Friday: [{}, {}, {}],
            Saturday: [{}, {}, {}],
        };
    }
    return SelectedSchedule;
};
// export const getSchedule = () => SelectedSchedule;

export const setSchedule = (_schedule) => {
    Object.assign(SelectedSchedule, _schedule); // Merges new values into the existing object
};

export const addMealtoSchedule = (time, meal) => {
    if(time==="Sunday0"){
        addSundayBreakFast(meal)
    }
}

export function addSundayBreakFast(meal) {
    SelectedSchedule.Sunday[0]=meal
}
export function addSundayLunch(meal) {
    SelectedSchedule.Sunday[1]=meal
}
export function addSundayDinner(meal) {
    SelectedSchedule.Sunday[2]=meal
}

export function addMondayBreakFast(meal) {
    SelectedSchedule.Monday[0]=meal
}
export function addMondayLunch(meal) {
    SelectedSchedule.Monday[1]=meal
}
export function addMondayDinner(meal) {
    SelectedSchedule.Monday[2]=meal
}

export function addTuesdayBreakFast(meal) {
    SelectedSchedule.Tuesday[0]=meal
}
export function addTuesdayLunch(meal) {
    SelectedSchedule.Tuesday[1]=meal
}
export function addTuesdayDinner(meal) {
    SelectedSchedule.Tuesday[2]=meal
}

export function addWednesdayBreakFast(meal) {
    SelectedSchedule.Wednesday[0]=meal
}
export function addWednesdayLunch(meal) {
    SelectedSchedule.Wednesday[1]=meal
}
export function addWednesdayDinner(meal) {
    SelectedSchedule.Wednesday[2]=meal
}

export function addThursdayBreakFast(meal) {
    SelectedSchedule.Thursday[0]=meal
}
export function addThursdayLunch(meal) {
    SelectedSchedule.Thursday[1]=meal
}
export function addThursdayDinner(meal) {
    SelectedSchedule.Thursday[2]=meal
}

export function addFridayBreakFast(meal) {
    SelectedSchedule.Friday[0]=meal
}
export function addFridayLunch(meal) {
    SelectedSchedule.Friday[1]=meal
}
export function addFridayDinner(meal) {
    SelectedSchedule.Friday[2]=meal
}

export function addSaturdayBreakFast(meal) {
    SelectedSchedule.Saturday[0]=meal
}
export function addSaturdayLunch(meal) {
    SelectedSchedule.Saturday[1]=meal
}
export function addSaturdayDinner(meal) {
    SelectedSchedule.Saturday[2]=meal
}