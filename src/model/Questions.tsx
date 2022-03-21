import questions from "./questions.json"

export default function getThreeQuestions(level: String){
    switch (level) {
    case "very-easy": return getListRandomItems(3, questions["very-easy"]);
    case "easy": return  getListRandomItems(3, questions.easy);
    case "normal": return getListRandomItems(3, questions.normal);
    case "hard": return getListRandomItems(3, questions.hard);
    case "very-hard": return getListRandomItems(3, questions["very-hard"])

    }

}

function getListRandomItems(count: number, listElements: Array<object>){
    for(let i =0; (i< count)&& (i < listElements.length); i++){
        let rnd = Math.floor(Math.random() * (listElements.length - i)) + i
    }
}