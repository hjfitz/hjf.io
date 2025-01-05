// used for the harris-benedict [0] calculation (old)
// [0]: https://www.calculator.net/bmr-calculator.html
// harris-benedict
// const bmr = mult.overall + (mult.weight * weight) + (mult.height * height) - (mult.age * age)
export const multipliers = {
    female: {
        overall: 447.593,
        height: 3.098,
        weight: 9.247,
        age: 4.33,
    },
    male: {
        overall: 88.362,
        height: 4.799,
        weight: 13.397,
        age: 5.677,
    },
}
