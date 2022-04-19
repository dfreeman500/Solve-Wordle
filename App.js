
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
newWordList = []
function wrongLetterEliminate(currentWordList, lettersToEliminate) {
    for (let i = 0; i < currentWordList.length; i++) {
        let isWordAcceptable = true;
        for (let j = 0; j < lettersToEliminate.length; j++) {
            if (currentWordList[i].includes(lettersToEliminate[j])) {
                isWordAcceptable = false;

            }

        }
        if (isWordAcceptable) {
            newWordList.push(currentWordList[i])
        }
    }
}


positionMap = [
    ['e', 2],
    ['r', 3],
    ['r', 1],
    ['o', 2],
    ['e', 4],
    ['o', 0],
    ['e', 2],

]


function buildRegexPattern(letter, position) {
    output = ''
    for (let i = 0; i < 5; i++) {
        //console.log(i, letter, position)
        if (position == i) {
            output += "[^" + letter + "]"
        } else {
            output += "[a-z]"
        }
    }
    // a = new RegExp(output,'g')

    return output;
}

secondNewWordList = []
function rightLetterWrongPosition(newWordList, positionMap) {
    for (let i = 0; i < newWordList.length; i++) {
        let isWordAcceptable = true;
        for (let k = 0; k < positionMap.length; k++) {
            pattern = buildRegexPattern(positionMap[k][0], positionMap[k][1])
            console.log(new RegExp(pattern), newWordList[i])
            console.log(newWordList[i].match(new RegExp(pattern)))
            if (newWordList[i].match(new RegExp(pattern)) == null) {
                isWordAcceptable = false;
            }

            //if letter in the wrong place isn't in the word - don't add
            if(!newWordList[i].includes(positionMap[k][0])){ 
                isWordAcceptable = false;
            }
        }
        if (isWordAcceptable) {
            secondNewWordList.push(newWordList[i])
        }
    }
}



eliminatedLetters = ['a', 'l', 't', 'b', 'k', 'm', 'n', 's', 'c', 'h','p','w']
findSetOfLetters(initialWordList);
// findLetterDistribution(initialWordList);

findWordScore(wordScore);

wrongLetterEliminate(initialWordList, eliminatedLetters)

rightLetterWrongPosition(newWordList, positionMap);

//regex or loops


function createScoringObject(list) {
    const value = 0

    const result = list.reduce((acc, list) => (acc[list] = value, acc), {})

    return result
}

resetFrequencies()
findSetOfLetters(secondNewWordList);

createdObject = createScoringObject(secondNewWordList)

let total = findWordScore(createdObject);
