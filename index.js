var area;
const n = 4;
var mat = [];
var lastmat = [];
var score = 0;
var undone = 0;
var highscore = 0;

function startGame() {
    area = document.getElementById("playarea");
    console.log("started");

    document.getElementById("startContainer").remove();

    document.addEventListener("keydown", keydownHandler, false);

    initialize();
}

function initialize() {

    highscore = localStorage.getItem("highScore");
    let hiscore = document.getElementById("highscore");
    hiscore.innerHTML = highscore;
    for (let i = 0; i < n; i++) {
        let subarr = [];
        for (let j = 0; j < n; j++) {
            subarr.push(0);
        }
        mat.push(subarr);
    }
    for (let i = 0; i < n; i++) {
        lastmat.push([]);
        for (let j = 0; j < n; j++) {
            lastmat[i].push(0);
        }
    }

    area.style.backgroundColor = "rgb(90,90,90)";
    area.style.display = "flex";
    area.style.flexDirection = "column";
    for (let i = 0; i < n; i++) {
        let newrow = document.createElement("div");
        newrow.setAttribute("id", "row " + i);
        newrow.style.display = "flex";
        newrow.style.flex = "1";
        area.appendChild(newrow);

        for (let j = 0; j < n; j++) {
            let newblock = document.createElement("div");
            let num = document.createElement("p");
            num.setAttribute("class", "blockNum");
            num.setAttribute("id", "blockNum " + i + " " + j)
            num.innerHTML = mat[i][j];
            if (mat[i][j] == 0) {
                num.innerHTML = "";
            }
            newblock.appendChild(num);
            if (mat[i][j] > 2048) {
                newblock.setAttribute("class", "nother");
            }
            else {
                newblock.setAttribute("class", "n" + mat[i][j]);
            }

            newblock.setAttribute("id", "block " + i + " " + j);
            newblock.style.border = "2px solid rgb(90, 90, 90)";
            newblock.style.borderRadius = "5px";
            //newblock.style.backgroundColor = "rgb(200,200,200)";
            newblock.style.flex = "1";
            newrow.appendChild(newblock);
        }
    }
    randomNext();
}

function randomNext() {
    undone = 0;
    let zeros = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] == 0) {
                zeros.push([[i], [j]]);
            }

        }
    }

    if (zeros.length == 0) {

        return;
    }

    //if (checkMoves()) {
    let the_chosen_one = zeros[Math.floor(Math.random() * zeros.length)];
    let two_or_four = 2;
    if (Math.floor(Math.random() * 10) == 0) two_or_four = 4;

    let y = the_chosen_one[0], x = the_chosen_one[1];
    mat[y][x] = two_or_four;

    let randomNum = document.getElementById("blockNum " + y + " " + x);
    let randomBlock = document.getElementById("block " + y + " " + x);
    randomNum.innerHTML = two_or_four;
    randomBlock.setAttribute("class", "n" + two_or_four);
    //}
}

function keydownHandler(event) {

    let keyPressed = event.key;
    if (keyPressed == "ArrowUp" || keyPressed == "w" || keyPressed == "W") {
        makeMove("up");
    }
    else if (keyPressed == "ArrowDown" || keyPressed == "s" || keyPressed == "S") {
        makeMove("down")
    }
    else if (keyPressed == "ArrowLeft" || keyPressed == "a" || keyPressed == "A") {
        makeMove("left");
    }
    else if (keyPressed == "ArrowRight" || keyPressed == "d" || keyPressed == "D") {
        makeMove("right");
    }
    else if (keyPressed == "u" || keyPressed == "U") {
        undoMove();
    }
    else if (keyPressed == "r" || keyPressed == "R") {
        resetGame();
    }
}

function makeMove(dir) {

    //console.log(mat.toString());
    lastmat = [];
    for (let i = 0; i < n; i++) {
        lastmat.push([]);
        for (let j = 0; j < n; j++) {
            lastmat[i].push(mat[i][j]);
        }
    }
    //console.log(lastmat.toString());

    let currarr = [];
    movearrs = [];

    for (let i = 0; i < n; i++) {
        movearrs.push([]);
    }
    if (dir == "up") {

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                movearrs[j].push(mat[i][j]);
            }
        }

        for (let i = 0; i < n; i++) {
            movearrs[i] = afterMove(movearrs[i]);
        }

        //console.log(movearrs.toString());
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                mat[i][j] = movearrs[j][i];
            }
        }
    }
    if (dir == "down") {
        for (let i = n - 1; i >= 0; i--) {
            for (let j = 0; j < n; j++) {
                movearrs[j].push(mat[i][j]);
            }
        }

        for (let i = 0; i < n; i++) {
            movearrs[i] = afterMove(movearrs[i]);
        }

        for (let i = n - 1; i >= 0; i--) {
            for (let j = 0; j < n; j++) {
                mat[i][j] = movearrs[j][n - 1 - i];
            }
        }
    }
    if (dir == "left") {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                movearrs[i].push(mat[i][j]);
            }
        }

        for (let i = 0; i < n; i++) {
            movearrs[i] = afterMove(movearrs[i]);
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                mat[i][j] = movearrs[i][j];
            }
        }
    }
    if (dir == "right") {
        for (let i = 0; i < n; i++) {
            for (let j = n - 1; j >= 0; j--) {
                movearrs[i].push(mat[i][j]);
            }
        }

        for (let i = 0; i < n; i++) {
            movearrs[i] = afterMove(movearrs[i]);
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                mat[i][j] = movearrs[i][n - 1 - j];
            }
        }
    }
    //console.log(mat.toString());
    //console.log(lastmat.toString());
    updateGame();
    if(checkMoves()) 
    randomNext();
}

function afterMove(inarr) {
    let outarr = [];
    let i = 0, curr = 0;
    let added = 0;
    while (i < n) {
        if (inarr[i] == 0) {
            i++;
            //console.log("i was zero")
            continue;
        }
        if (curr == 0) {
            outarr.push(inarr[i]);
            //console.log(inarr[i] + " when curr was zero")
            curr++;
            i++;
            continue;
        }
        if (added == 0) {
            if (outarr[curr - 1] == inarr[i]) {
                outarr[curr - 1] = (2 * inarr[i]);
                updateScore(score + 2 * inarr[i]);
                //console.log((curr - 1) + " changed to " + (2 * inarr[i]));
                i++;
                added = 1;
                continue;

            }
        }
        outarr.push(inarr[i]);
        //console.log("just another day with " + inarr[i] + "because i is " + i) 
        curr++;
        i++;
        added = 0;

    }
    while (outarr.length != n) {
        outarr.push(0);
    }

    return outarr;
}

function resetGame() {
    console.log("u pressed reset");
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            mat[i][j] = 0;
            lastmat[i][j] = 0;
        }
    }
    score = 0;
    undone = 0;
    updateScore(0);
    updateGame();
    randomNext();

}

function updateGame() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let currblock = document.getElementById("block " + i + " " + j);
            let currNum = document.getElementById("blockNum " + i + " " + j);
            currNum.innerHTML = mat[i][j];
            currblock.setAttribute("class", "n" + mat[i][j])
            if (mat[i][j] == 0)
                currNum.innerHTML = "";
        }
    }
}

function checkMoves() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (lastmat[i][j] != mat[i][j]) {
                return true;
            }
        }
    }

    return false;
}

function undoMove() {
    if (undone == 0) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                mat[i][j] = lastmat[i][j];
            }
        }
        updateGame();
    }
    undone = 1;
}

function updateScore(addScore) {
    score = addScore;
    let scorelem = document.getElementById("score");
    scorelem.innerHTML = score;

    let hiscore = document.getElementById("highscore");
    if (score > localStorage.getItem("highScore")) {
        localStorage.setItem("highScore", score);
        highscore = localStorage.getItem("highScore");
    }

    hiscore.innerHTML = highscore;

}

