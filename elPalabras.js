const opportunities = 6;
const lettersAmount = 5;
let row = 0;
let column = 0;
let finish = false;
let word = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
const wordMode = 'withoutAccents';
let gameMode = 'normal';

normalizeWord = (w) =>{
    return w.normalize('NFD')
    .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
    .normalize();
}

if(wordMode === 'withoutAccents') {
    word = normalizeWord(word)
}

window.onload = () => {
    start();
}

const reload = () => {
    location.reload();
}

start = () => {
    for (let r = 0; r < opportunities; r++) {
        for (let c = 0; c < lettersAmount; c++) {
            const letterContainer = document.createElement("div");
            letterContainer.id = r.toString() + c.toString();
            letterContainer.classList.add("letterContainer");
            letterContainer.innerText = "";
            document.getElementById("board").appendChild(letterContainer);
        }
    }

    document.addEventListener("keyup", (e) => {
        if (finish) return;

        //e.key devuelve la letra pero no valida los caracteres especiales en el if de abajo
        if (("KeyA" <= e.code && e.code <= "KeyZ") || (e.key === "ñ")) {
            if (column < lettersAmount) {
                const currentLetterContainer = document.getElementById(row.toString() + column.toString());
                if (currentLetterContainer.innerText === "") {
                    currentLetterContainer.innerText = e.key.toUpperCase() ;
                    column++;
                }
            }
        } else if(e.code === "Backspace") {
            if (column > 0 && column < (opportunities + 1)) {
               column--;
               const currentLetterContainer = document.getElementById(row.toString() + column.toString());
               currentLetterContainer.innerText = "";
            }
        } else if (e.code === "Enter" && column === 5) {
            check();
        }

        if (!finish && row === opportunities) {
            finish = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

check = () => {

    let writenWord = ''
    for (let i = 0; i < 5; i++) {
        writenWord += document.getElementById(row.toString() + i.toString()).innerText.toLowerCase();
    }
    // this if compares without accents
    if (arr.find(word => normalizeWord(word) === writenWord) || wordsToGuess.find(word => normalizeWord(word) === writenWord)) {
        let wordForChecking = word;
        let correct = 0;

        for (let c = 0; c < lettersAmount; c++) {
            const currentLetterContainer = document.getElementById(row.toString() + c.toString());
            let letter = currentLetterContainer.innerText.toLowerCase();
            currentLetterContainer.classList.add("dontHaveIt");
            if (wordForChecking[c] == letter) {
                currentLetterContainer.classList.remove("dontHaveIt");
                currentLetterContainer.classList.add("haveItInThatPossition");
                wordForChecking = wordForChecking.replace(letter,"-")
                correct++;
            }

            if (correct === lettersAmount) finish = true;
        }
        if (!finish) {
            for (let h = 0; h < lettersAmount; h++) {
                const currentLetterContainer = document.getElementById(row.toString() + h.toString());
                let letter = currentLetterContainer.innerText.toLowerCase();
                if (currentLetterContainer.classList[1] !== "haveItInThatPossition") {
                    if (wordForChecking.includes(letter)) {
                        currentLetterContainer.classList.remove("dontHaveIt");
                        currentLetterContainer.classList.add("haveItInOtherPossition");
                        wordForChecking = wordForChecking.replace(letter,"-")
                    }
                }
            }
        }
        row++;
        column = 0;
    } else alert("no existe esa palabra")
}
