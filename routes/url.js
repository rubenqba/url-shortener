const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const nanoid = require('nanoid');

const Url = require('../model/url');

// @route POST /api/url/shorten 
// @desc create short url
router.post('/shorten', async (req, res) => {
    const {longUrl} = req.body;
    const baseUrl= process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

    if (!validUrl.isUri(baseUrl)) {
       return res.status(401).json('Invalid base url');
    }

    //create url code
    const urlCode = nanoid(10);

    // check long url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({longUrl});
            if (!url) {
                console.log(`creating shorten version of url '${longUrl}'`);
                const shortUrl = `${baseUrl}/${urlCode}`;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date().toISOString()
                });
                await url.save();
            } else {
                console.log(`shorten version of url '${longUrl}' already exists`);
            }
            return res.json(url);
        } catch (err) {
            console.error(err.message);
            res.status(500).json('server error');
        }
    } else {
        console.error(`Invalid longUrl '${longUrl}'`);
        res.status(401).json('Invalid longUrl');
    }
});


module.exports = router;