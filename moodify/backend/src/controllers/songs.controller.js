const songModel =  require('../Model/songs.model')

async function uploadSong(req, res) {
    console.log(req.file)
    
}
module.exports = {uploadSong}