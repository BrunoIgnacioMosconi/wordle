const opportunities = 5;
const lettersAmount = 5;
let row = 0;
let column = 0;
let finish = false;
const wordsToGuess = ["saber","creer","tomar","tener","comer","cocer","coser","cenar","poner"];
const word = wordsToGuess[Math.round(Math.random() * (wordsToGuess.length - 1))];

window.onload = () => {
    start();
}

start = () => {
    for (let r = 0; r < opportunities; r++) {
        for (let c = 0; c < lettersAmount; c++) {
            const letterContainer = document.createElement("div");
            letterContainer.id = r.toString() + "-" + c.toString();
            letterContainer.classList.add("letterContainer");
            letterContainer.innerText = "";
            document.getElementById("board").appendChild(letterContainer);
        }
    }

    document.addEventListener("keyup", (e) => {
        if (finish) return;

        //e.key devuelve la letra pero no valida los caracteres especiales en el if de abajo
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (column < lettersAmount) {
                const currentLetterContainer = document.getElementById(row.toString() + "-" + column.toString());
                if (currentLetterContainer.innerText === "") {
                    currentLetterContainer.innerText = e.key;
                    column+=1;
                }
            }
        } else if(e.code === "Backspace") {
            if (column > 0 && column < opportunities) {
               column-=1;
               const currentLetterContainer = document.getElementById(row.toString() + "-" + column.toString());
               currentLetterContainer.innerText = "";
            }
        } else if (e.code === "Enter") {
            check();
            row +=1;
            column = 0;
        }

        if (!finish && row === opportunities) {
            finish = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

check = () => {
    let correct = 0;
    for (let c = 0; c < lettersAmount; c++) {
        const currentLetterContainer = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currentLetterContainer.innerText;

        if (word[c] == letter) {
            currentLetterContainer.classList.add("haveItInThatPossition");
            correct += 1;
        } else if (word.includes(letter)) {
            currentLetterContainer.classList.add("haveItInOtherPossition");
        } else {
            currentLetterContainer.classList.add("dontHaveIt");
        }

        if (correct === lettersAmount) finish = true;
    }
}
