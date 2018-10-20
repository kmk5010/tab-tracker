const {Song} = require('../models')

module.exports = {
    async index (req, res) {
        try  {
            const songs = await Song.findAll({
                limit: 10
            })
            res.send(songs)
        }
        catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the songs.'
            })
        }
    },
    async post (req, res) {
        try  {
            const songs = await Song.create(req.body)
            res.send(songs)
        }
        catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to create the song.'
            })
        }
    },
    async show (req, res) {
        try  {
            const songs = await Song.findById(req.params.songId)
            res.send(songs)
        }
        catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the songs.'
            })
        }
    }
}
