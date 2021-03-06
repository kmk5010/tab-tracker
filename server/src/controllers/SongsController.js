const {Song} = require('../models')

module.exports = {
    async index (req, res) {
        try  {
            let songs = null
            const search = req.query.search
            if (search) {
                songs = await Song.findAll({
                    where: {
                        $or: [
                            'title', 'artist', 'genre', 'album'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`
                            }
                        }))
                    }
                })
            } else {
                songs = await Song.findAll({
                    limit: 10
                })
            }
            
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
    },
    async post (req, res) {
        try  {
            const songs = await Song.update(req.body, {
                where: {
                    id: req.params.songId
                }
            })
            res.send(req.body)
        }
        catch (err) {
            res.status(500).send({
                error: `An error has occured trying to update the song.`
            })
        }
    }
}
