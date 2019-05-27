const {Rectangle, Line, Color} = require("scenegraph");
const commands = require("commands");
const viewport =  require("viewport");
const interactions = require("interactions");
// const selection = require("selection")

function setVerticalPercantageLine(selection, rulerHeight, rulerWidth) {
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
    x = rulerWidth / 100 // reset x to 1%

    for (var i = 1; i < 101; i++) { // lines for increments of 5

        if ((i % 5 == 0 || i % 10 == 0) && i != 0) {
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

function rulerHandlerFunction(selection) {

    var grey = new Color("949494");
    grey.a = 115;

    if (selection.items.length == 0) {
        const dialog = getDialog();
        dialog.showModal();
        return;
    }

    const rulerWidth = selection.items[0].width
    const rulerHeight = 150;

    const horizontalRuler = new Rectangle();
    horizontalRuler.width = rulerWidth;
    horizontalRuler.height = rulerHeight;
    horizontalRuler.fill = grey;

    selection.insertionParent.addChild(horizontalRuler);
    horizontalRuler.moveInParentCoordinates(0, -rulerHeight - 10);

    var lines = setVerticalPercantageLine(selection, rulerHeight + 10, rulerWidth);
    lines.push(horizontalRuler)
    selection.items = lines // change context to group of lines
    commands.group("Ruler"); // group lines and horizontalLine

    console.log(selection.items[0].globalX); // print artboard width to console

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



module.exports = {
    commands: {
        createRuler: rulerHandlerFunction
    }
};
