const {Rectangle, Line, Color} = require("scenegraph");
const commands = require("commands");
const viewport =  require("viewport");
const interactions = require("interactions");
// const selection = require("selection")

function setVerticalPixelLine(selection, rulerHeight, rulerWidth) {
    var x = 0; // starting x value for line

    var linesForPixels = [];
    const longHashValue = 100
    const n_longHash = Math.round(rulerWidth / longHashValue);
    const mediumHashValue = longHashValue / 2;
    const n_mediumHash = Math.round(rulerWidth / mediumHashValue);
    const smallHashValue = mediumHashValue / 5;
    const n_smallHash = Math.round(rulerWidth / smallHashValue);

    // markers for every longHashValue
    for (var i = 0; i < n_longHash; i++) {
        const line = new Line();

        x += longHashValue;

        line.setStartEnd(x, -rulerHeight, x, -rulerHeight * .35)
        line.strokeEnabled = true;
        line.stroke = new Color(1, 1, 1, 1);
        line.strokeWidth = 3;

        linesForPixels.push(line);
        selection.editContext.addChild(line);
    }

    // markers for every mediumHashValue
    x = mediumHashValue;

    for (var i = 0; i < n_mediumHash; i++) {
        const line = new Line();

        line.setStartEnd(x, -rulerHeight, x, -rulerHeight * .5)
        line.strokeEnabled = true;
        line.stroke = new Color(1, 1, 1, 1);
        line.strokeWidth = 2;

        linesForPixels.push(line);
        selection.editContext.addChild(line);

        x += mediumHashValue;
    }

    // markers for every smallHashValue
    x = smallHashValue;

    for (var i = 1; i < n_smallHash; i++) { // lines for increments of 5

        if ((i % 5 == 0 || i % 10 == 0) && i != 0) {
            x += smallHashValue;
            console.log(x);
            continue;
        }
        const line = new Line();

        line.setStartEnd(x, -rulerHeight, x, -rulerHeight * .75)
        line.strokeEnabled = true;
        line.stroke = new Color(1, 1, 1, 1);
        line.strokeWidth = 1;

        linesForPixels.push(line);
        selection.editContext.addChild(line);

        x += smallHashValue;
    }

    return linesForPixels;
}

function setHorizontalPixelLine(selection, rulerHeight, rulerWidth) {
    var y = 0; // starting x value for line

    var linesForPixels = [];
    const longHashValue = 100
    console.log(rulerHeight);
    const n_longHash = Math.floor(rulerHeight / longHashValue);
    const mediumHashValue = longHashValue / 2;
    const n_mediumHash = Math.floor(rulerHeight / mediumHashValue);
    const smallHashValue = mediumHashValue / 5;
    const n_smallHash = Math.floor(rulerHeight / smallHashValue);

    // markers for every 10%
    console.log(n_longHash);
    for (var i = 0; i < n_longHash; i++) {
        const line = new Line();
        y += longHashValue;
        console.log(y);


        line.setStartEnd(-rulerWidth, y, -rulerWidth * .35, y)
        line.strokeEnabled = true;
        line.stroke = new Color(1, 1, 1, 1);
        line.strokeWidth = 3;

        linesForPixels.push(line);
        selection.editContext.addChild(line);
    }

    // markers for every mediumHash
    y = mediumHashValue;

    for (var i = 0; i < n_mediumHash; i++) {
        const line = new Line();

        line.setStartEnd(-rulerWidth, y, -rulerWidth * .5, y)
        line.strokeEnabled = true;
        line.stroke = new Color(1, 1, 1, 1);
        line.strokeWidth = 2;

        linesForPixels.push(line);
        selection.editContext.addChild(line);

        y += mediumHashValue;
    }

    // markers for every smallHashValue
    y = smallHashValue;

    for (var i = 1; i < n_smallHash; i++) { // lines for increments of 5

        if ((i % 50 == 0 || i % 100 == 0) && i != 0) {
            y += smallHashValue;
            console.log(y);
            continue;
        }
        const line = new Line();

        line.setStartEnd(-rulerWidth, y, -rulerWidth * .75, y)
        line.strokeEnabled = true;
        line.stroke = new Color(1, 1, 1, 1);
        line.strokeWidth = 1;

        linesForPixels.push(line);
        selection.editContext.addChild(line);

        y += smallHashValue;
    }

    return linesForPixels;
}

function setVerticalPercentageLine(selection, rulerHeight, rulerWidth) {
    var x = 0; // starting x value for line

    var linesForPercentage = [];

    // markers for every 10%
    for (var i = 0; i < 9; i++) {
        const line = new Line();

        x += rulerWidth / 10;

        line.setStartEnd(x, -rulerHeight, x, -rulerHeight * .35)
        line.strokeEnabled = true;
        line.stroke = new Color(1, 1, 1, 1);
        line.strokeWidth = 3;

        linesForPercentage.push(line);
        selection.editContext.addChild(line);
    }

    // markers for every 5%
    x = rulerWidth / 20 // reset x to 5%

    for (var i = 0; i < 10; i++) {
        const line = new Line();

        line.setStartEnd(x, -rulerHeight, x, -rulerHeight * .5)
        line.strokeEnabled = true;
        line.stroke = new Color(1, 1, 1, 1);
        line.strokeWidth = 2;

        linesForPercentage.push(line);
        selection.editContext.addChild(line);

        x += rulerWidth / 10;
    }

    // markers for every 1%
    x = rulerWidth / 100; // reset x to 1%

    for (var i = 1; i < 101; i++) { // lines for increments of 5

        if ((i % 50 == 0 || i % 100 == 0) && i != 0) {
            x += rulerWidth / 100;
            console.log(x);
            continue;
        }
        const line = new Line();

        line.setStartEnd(x, -rulerHeight, x, -rulerHeight * .75)
        line.strokeEnabled = true;
        line.stroke = new Color(1, 1, 1, 1);
        line.strokeWidth = 1;

        linesForPercentage.push(line);
        selection.editContext.addChild(line);

        x += rulerWidth / 100;
    }

    return linesForPercentage;
}

function setHorizontalPercentageLine(selection, rulerHeight, rulerWidth) {
    var y = rulerHeight; // starting x value for line

    var linesForPercentage = [];

    // markers for every 10%
    for (var i = 0; i < 9; i++) {
        const line = new Line();
        y -= rulerHeight / 10;

        line.setStartEnd(-rulerWidth, y, -rulerWidth * .35, y)
        line.strokeEnabled = true;
        line.stroke = new Color(1, 1, 1, 1);
        line.strokeWidth = 3;

        linesForPercentage.push(line);
        selection.editContext.addChild(line);
    }

    // markers for every 5%
    y = rulerHeight / 20 // reset x to 5%

    for (var i = 0; i < 10; i++) {
        const line = new Line();

        line.setStartEnd(-rulerWidth, y, -rulerWidth * .5, y)
        line.strokeEnabled = true;
        line.stroke = new Color(1, 1, 1, 1);
        line.strokeWidth = 2;

        linesForPercentage.push(line);
        selection.editContext.addChild(line);

        y += rulerHeight / 10;
    }

    // markers for every 1%
    y = rulerHeight / 100 // reset x to 1%

    for (var i = 1; i < 101; i++) { // lines for increments of 5

        if ((i % 5 == 0 || i % 10 == 0) && i != 0) {
            y += rulerHeight / 100;
            console.log(y);
            continue;
        }
        const line = new Line();

        line.setStartEnd(-rulerWidth, y, -rulerWidth * .75, y)
        line.strokeEnabled = true;
        line.stroke = new Color(1, 1, 1, 1);
        line.strokeWidth = 1;

        linesForPercentage.push(line);
        selection.editContext.addChild(line);

        y += rulerHeight / 100;
    }

    return linesForPercentage;
}

function rulerHandlerFunction(selection, vertical, pixels=true) {

    var grey = new Color("949494");
    grey.a = 115;

    if (selection.items.length == 0) {
        const dialog = getDialog();
        dialog.showModal();
        return;
    }

    if (vertical === true) {
        const rulerWidth = selection.items[0].width
        const rulerHeight = 150;

        const horizontalRuler = new Rectangle();
        horizontalRuler.width = rulerWidth;
        horizontalRuler.height = rulerHeight;
        horizontalRuler.fill = grey;

        selection.insertionParent.addChild(horizontalRuler);
        horizontalRuler.moveInParentCoordinates(0, -rulerHeight - 10);

        if (!pixels) {
            var lines = setVerticalPercentageLine(selection, rulerHeight + 10, rulerWidth);
        } else {
            var lines = setVerticalPixelLine(selection, rulerHeight + 10, rulerWidth);
        }

        lines.push(horizontalRuler)
        selection.items = lines // change context to group of lines
        commands.group("Horizontal Ruler"); // group lines and horizontalLine

        console.log(selection.items[0].globalX); // print artboard width to console
    } else {
        const rulerWidth = 150;
        const rulerHeight = selection.items[0].height;

        const verticalRuler = new Rectangle();
        verticalRuler.width = rulerWidth;
        verticalRuler.height = rulerHeight;
        verticalRuler.fill = grey;

        selection.insertionParent.addChild(verticalRuler);
        verticalRuler.moveInParentCoordinates(-rulerWidth - 10, 0);

        if (!pixels) {
            var lines = setHorizontalPercentageLine(selection, rulerHeight, rulerWidth + 10);
        } else {
            var lines = setHorizontalPixelLine(selection, rulerHeight, rulerWidth + 10);
        }
        lines.push(verticalRuler)
        selection.items = lines // change context to group of lines
        commands.group("Verical Ruler"); // group lines and horizontalLine

    }

}

function getDialog() {
    let dialog =  document.querySelector("dialog");

    if (dialog) {
        console.log("Dialog already running");
        return dialog;
    }

    return createDialog();
}

function createDialog() {
    document.body.innerHTML = `
        <style>
            form {
                width: 400px;
            }
        </style>
        <dialog>
            <form method="dialog">
                <h1>Please select an Artboard</h1>
                <footer>
                    <button id="ok">OK</button>
                </footer>
            </form>
        </dialog>
    `;

    const [dialog, form, ok] = [`dialog`, `form`, "#ok"].map(s => document.querySelector(s));

    ok.addEventListener("click", () => dialog.close("reasonCanceled"));

    return dialog;
}

function verticalRuler(selection) {
    rulerHandlerFunction(selection, true, false);
}

function vRPixel(selection) {
    rulerHandlerFunction(selection, true);
}

function horizontalRuler(selection) {
    rulerHandlerFunction(selection, false, false);
}

function hRPixel(selection) {
    rulerHandlerFunction(selection, false);
}


module.exports = {
    commands: {
        createVerticalRulerPercent: verticalRuler,
        createHorizontalRulerPercent: horizontalRuler,
        createVerticalRulerPixel: vRPixel,
        createHorizontalRulerPixel: hRPixel
    }
};
