import questions from "../resources/questions.json"

export default function getThreeQuestions(level: number) {
    switch (true) {
        case level < 4:
            return getListRandomItems(3, questions.veryEasy);
        case  level < 7:
            return getListRandomItems(3, questions.easy);
        case  level < 10:
            return getListRandomItems(3, questions.normal);
        case level < 13:
            return getListRandomItems(3, questions.hard);
        default :
            return getListRandomItems(3, questions.veryHard)
    }
}
const levels = ["veryEasy", "easy", "normal", "hard", "veryHard"]

function getListRandomItems(count: number, listElements: Array<object>) {
    let resList = []
    for (let i = 0; (i < count) && (i < listElements.length); i++) {
        let rnd = Math.floor(Math.random() * (listElements.length - i)) + i

        let quest = listElements[rnd]
        listElements[rnd] = listElements[i]
        listElements[i] = quest
        resList.push(quest)
    }
    return resList
}
