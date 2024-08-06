let notes = [2000, 500, 200, 100, 50, 20, 10, 5, 1];

function getNoOfNotes(Amount) {
    let dynamicObject = {};
    // for (let i = 0; i < notes.length; i++) {
    //     const element = notes[i];
    //     let money = Amount;
    //     for (let j = 0; j < notes.length; j++) {
    //         const element = notes[j];
    //         if (element ) {

    //         }
    //     }
    // }
    // return dynamicObject;
        for (let j = 0; j < notes.length; j++) {
            if (Amount <= 0) {
                break;
            }
            let check = Amount - notes[j];
            if (check >= 0) {
                if (dynamicObject[notes[j]] != undefined) {
                    dynamicObject[notes[j]] += 1
                } else {
                    dynamicObject[notes[j]] = 1;
                }
                Amount -= notes[j]
                j--;
            } else {
                notes.splice(j, j + 1)
                j--;
            }
        }
        return dynamicObject
    }

let result = getNoOfNotes(10);

console.log(result);