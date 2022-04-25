function findSetOfLetters(currentWordList) {
    for (let i = 0; i < currentWordList.length; i++) {
        let tempSet = new Set(currentWordList[i])
        tempSet.forEach(item => {
            letterSetFrequency[item] += 1
        })

    }
}

let errorWords = ""
function findLetterDistribution(currentWordList) {
    for (let i = 0; i < currentWordList.length; i++) {
        for (let j = 0; j < currentWordList[i].length; j++) {
            letterFrequency[currentWordList[i][j]] += 1

        }
    }
}

let countWords = 0;
function findWordScore(currentWordList) {
    for (let object in currentWordList) {
        let tempSet = new Set(object)
        tempSet.forEach(item => {
            currentWordList[object] += letterSetFrequency[item]
        })
        countWords += 1;
    }
}


function eliminateWrongLetters(currentWord, eliminatedLetters) {
    for (let i = 0; i < eliminatedLetters.length; i++) {
        if (currentWord.includes(eliminatedLetters[i])) {
            return "exclude";
        }
    }
}

eliminatedLetters = ['i','s','e']

//Letters in the word and in the correct position
correctLetterCorrectPositionMap = [
['a',0],
['r',1]

]

//These are letters that must be in the word but are in the incorrect position
let correctLetterWrongPositionMap = [

]

function buildRegexPattern(letter, position, requirement) {
    output = ''
    for (let i = 0; i < 5; i++) {
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
        if (currentWord.match(new RegExp(pattern)) == null) {
            return "exclude";
        }
    }
}

function rightLetterRightPosition(currentWord, correctLetterCorrectPositionMap) {
    for (let i = 0; i < correctLetterCorrectPositionMap.length; i++) {
        pattern = buildRegexPattern(correctLetterCorrectPositionMap[i][0], correctLetterCorrectPositionMap[i][1], "mustHave")
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


function createScoringObject(list) {
    const value = 0
    const result = list.reduce((acc, list) => (acc[list] = value, acc), {})
    return result
}



includeExcludeWord(initialWordList, eliminatedLetters, correctLetterWrongPositionMap, correctLetterCorrectPositionMap)


//Any letter that is definitely in the word no matter if correct location
let listOfLettersInWord='';

// use word score by raw words eliminated or percent eliminated
function ifAllNewLettersAreWrongHowManyWordsAreELiminated(currentWordList){
    //takes the secondNewWordList and creates an object with the word
    //as the key and 0 as the value
    let scoringObject = createScoringObject(currentWordList);
    listOfLettersInWord  += correctLetterCorrectPositionMap.map(x => x.map(a => a[0]))
    listOfLettersInWord  += correctLetterWrongPositionMap.map(x => x.map(a => a[0]))
    for (let item in scoringObject){
        let tempEliminatedLetters=[]
        tempEliminatedLetters.push(...eliminatedLetters); //pushes the new list inline
            for (let letter in item){
                //If the letters in the word were counted as wrong then put them in the e
                //eliminated letters
                if(!listOfLettersInWord.includes(item[letter]) && !tempEliminatedLetters.includes(item[letter])){ 
                    tempEliminatedLetters.push(item[letter])
                }
            }
            let numberOfWordsEliminated=0;
            for (let word in currentWordList){
                for(let letter in tempEliminatedLetters){
                    if(currentWordList[word].includes(tempEliminatedLetters[letter])){
                        numberOfWordsEliminated += 1;     
                        scoringObject[item] = numberOfWordsEliminated;
                        break
                    }
                }
            }
    }
    return scoringObject;
    //if newly added letters are wrong - it will eliminate x from the current list
}

mostRecentScore = ifAllNewLettersAreWrongHowManyWordsAreELiminated(secondNewWordList);

sortedList = Object.fromEntries(
    Object.entries(mostRecentScore).sort(([,a],[,b]) => b-a)
)

console.log(sortedList)