
let letterSetFrequency = {}
let letterFrequency = {}

function resetFrequencies() {
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
}
resetFrequencies()

let howManyTimes = 0;


function findSetOfLetters(currentWordList) {
    for (let i = 0; i < currentWordList.length; i++) {
        //console.log(currentWordList[i])
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
    console.log("I have run", currentWordList)
    for (let object in currentWordList) {
        console.log("i have run 2")
        console.log(object)
        let tempSet = new Set(object)
        console.log(tempSet)
        tempSet.forEach(item => {
            currentWordList[object] += letterSetFrequency[item]
        })
        // for (let j = 0; j < tempSet.length; j++){
        //     console.log("hello")
        //     console.log(object)
        // wordScore[object]= letterSetFrequency[tempSet[j]]
        countWords += 1;
        console.log(wordScore)
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
function eliminateWrongLetters(currentWord, eliminatedLetters) {
    for (let i = 0; i < eliminatedLetters.length; i++) {
        if (currentWord.includes(eliminatedLetters[i])) {
            return "exclude";
        }
    }
}

eliminatedLetters = ['a','l','e','t','h','n','y','c','p','f']

//Letters in the word and in the correct position
correctLetterCorrectPositionMap = [
    ['r',1],
    ['i',2],
    ['s',3],
    ['k',4]


]

//These are letters that must be in the word but are in the incorrect position
let correctLetterWrongPositionMap = [
    ['r',3],
    ['s',0]
]


function buildRegexPattern(letter, position, requirement) {
    output = ''
    for (let i = 0; i < 5; i++) {
        //console.log(i, letter, position)
        if (position == i) {
            if (requirement == "cantHave") {
                output += "[^" + letter + "]"
            }
            if (requirement == "mustHave") {
                output += "[" + letter + "]"
            }
        } else {
            output += "[a-z]"
        }
    }
    return output;
}

secondNewWordList = []
function rightLetterWrongPosition(currentWord, correctLetterWrongPositionMap) {
    for (let i = 0; i < correctLetterWrongPositionMap.length; i++) {
        //if letter in the wrong place isn't in the word - then exclude - 
        //ex: t,0 will eliminate 'shore' because 't' isn't the candidate word
        // MUST HAVE 't' somewhere
        if (!currentWord.includes(correctLetterWrongPositionMap[i][0])) {
            return "exclude";
        }

        //Can't have correct letter in wrong spot
        //t,0 will eliminate 'thorn'
        pattern = buildRegexPattern(correctLetterWrongPositionMap[i][0], correctLetterWrongPositionMap[i][1], "cantHave")
        console.log(new RegExp(pattern), currentWord)
        console.log(currentWord.match(new RegExp(pattern)))
        if (currentWord.match(new RegExp(pattern)) == null) {
            return "exclude";
        }
    }
}

function rightLetterRightPosition(currentWord, correctLetterCorrectPositionMap) {
    for (let i = 0; i < correctLetterCorrectPositionMap.length; i++) {
        pattern = buildRegexPattern(correctLetterCorrectPositionMap[i][0], correctLetterCorrectPositionMap[i][1], "mustHave")
        console.log(new RegExp(pattern), currentWord)
        console.log(currentWord.match(new RegExp(pattern)))
        if (currentWord.match(new RegExp(pattern)) == null) {
            return "exclude"
        }
    }
}



function includeExcludeWord(currentWordList, eliminatedLetters, correctLetterWrongPositionMap, correctLetterCorrectPositionMap) {
    for (let i = 0; i < currentWordList.length; i++) {
        decision = "";
        decision += eliminateWrongLetters(currentWordList[i], eliminatedLetters);
        decision += rightLetterWrongPosition(currentWordList[i], correctLetterWrongPositionMap);
        decision += rightLetterRightPosition(currentWordList[i], correctLetterCorrectPositionMap);

        if (decision.includes("exclude")) {
            continue;
        } else {
            secondNewWordList.push(currentWordList[i])
        }
    }
}


findSetOfLetters(initialWordList);
// findLetterDistribution(initialWordList);

findWordScore(wordScore);

//regex or loops


function createScoringObject(list) {
    const value = 0

    const result = list.reduce((acc, list) => (acc[list] = value, acc), {})

    return result
}



includeExcludeWord(initialWordList, eliminatedLetters, correctLetterWrongPositionMap, correctLetterCorrectPositionMap)

resetFrequencies()
findSetOfLetters(secondNewWordList);

createdObject = createScoringObject(secondNewWordList)

let total = findWordScore(createdObject);


//Invalid scoring - ex; contradicting grading

