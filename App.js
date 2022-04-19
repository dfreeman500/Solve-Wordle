
letterSetFrequency = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0

}


letterFrequency = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0

}

let howManyTimes = 0;


function findSetOfLetters(currentWordList) {
    for (let i = 0; i < currentWordList.length; i++) {
        console.log(currentWordList[i])
        let tempSet = new Set(currentWordList[i])
        tempSet.forEach(item => {
            letterSetFrequency[item] += 1
            // console.log(item)
        })
        // howManyTimes += 1;

    }
}

let errorWords = ""
function findLetterDistribution(currentWordList) {
    for (let i = 0; i < currentWordList.length; i++) {
        // console.log(currentWordList[i])
        for (let j = 0; j < currentWordList[i].length; j++) {
            letterFrequency[currentWordList[i][j]] += 1
            // console.log(currentWordList[i][j])

        }
        // console.log(letterFrequency)
    }
}

let countWords = 0;
function findWordScore(currentWordList) {
    for (let object in currentWordList) {
        console.log(object)
        let tempSet = new Set(object)
        console.log(tempSet)
        tempSet.forEach(item => {
            wordScore[object]+=letterSetFrequency[item]
        })
        // for (let j = 0; j < tempSet.length; j++){
        //     console.log("hello")
        //     console.log(object)
        // wordScore[object]= letterSetFrequency[tempSet[j]]
        countWords+=1;
        console.log(countWords);
    }



}


// for (let i = 0; i < currentWordList.length; i++) {
//     console.log(currentWordList[i])
//     let tempSet = new Set(currentWordList[i])
//     console.log(tempSet)
//     for (let j = 0; j < tempSet.length; j++){
//         wordScore[currentWordList[i]]= letterSetFrequency[tempSet[j]]
//     }
// }





findSetOfLetters(initialWordList);
// findLetterDistribution(initialWordList);

findWordScore(wordScore);