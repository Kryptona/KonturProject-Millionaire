import questions from "../resources/questions.json"

export default function getThreeQuestions(level: number){
    switch (true) {
    case level < 4: return getListRandomItems(3, questions["very-easy"]);
    case (level >= 4 && level < 7): return  getListRandomItems(3, questions.easy);
    case (level >= 7 && level < 10): return getListRandomItems(3, questions.normal);
    case (level >= 10 && level < 13): return getListRandomItems(3, questions.hard);
    case level >= 13: return getListRandomItems(3, questions["very-hard"])
    }
    return [{}]

}
const levels = ["very-easy", "easy", "normal", "hard", "very-hard"]
function getListRandomItems(count: number, listElements: Array<object>){
    let resList = []
    for(let i =0; (i< count)&& (i < listElements.length); i++){
        let rnd = Math.floor(Math.random() * (listElements.length - i)) + i

        let quest = listElements[rnd]
        listElements[rnd] = listElements[i]
        listElements[i] = quest
        resList.push(quest)
    }
    return resList
}