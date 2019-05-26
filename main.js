const {Rectangle, Line, Color} = require("scenegraph");
const commands = require("commands");
const viewport =  require("viewport");
const interactions = require("interactions");
// const selection = require("selection")

function rulerHandlerFunction(selection) {

    var grey = new Color("949494");
    grey.a = 115;

    const horizontalRuler = new Rectangle();
    horizontalRuler.width = selection.items[0].width;
    horizontalRuler.height = 50;
    horizontalRuler.fill = grey;

    selection.insertionParent.addChild(horizontalRuler);
    horizontalRuler.moveInParentCoordinates(0, -150);


}



module.exports = {
    commands: {
        createRuler: rulerHandlerFunction
    }
};
