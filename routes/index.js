const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../model/url');

// @route GET /health
// @desc returns ok
router.get('/health', async (req, res) => {
    return res.json('I\'m alive');
});

// @route GET /:code
// @desc redirect to real url
router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({urlCode: req.params.code});
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No url found');
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Server error');
    }
});


module.exports = router;