const uuid = require(`uuid`);
class VanillaCommand {
    constructor(client){
        this.client = client;
        this.category == null;
        this.uid = uuid.v4();
        if (this.constructor === VanillaCommand) throw new TypeError('Ok bro maa chuda'); 
        if (this.name === undefined) throw new TypeError('bsdk naam nhi dega command ko');
        if (this.run === undefined) throw new TypeError('bhai noob hai tu run toh kr command');
    }
}
module.exports = VanillaCommand;