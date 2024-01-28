const VanillaClientEvent = require("../../structures/Eventhandler");

class TrackEnd extends VanillaClientEvent{
    get name(){
        return 'playerEnd';
    }
    async run(player){
        try{
            player.data.get('music').delete()
        } catch(e)
        {
            
        }
    }
}
module.exports = TrackEnd;