const express = require('express');
const passportController = require('../controllers/passportController');
const router = express.Router();

router.get('/auth/google', passportController.loginWithGoogle);
router.get('/auth/google/callback', passportController.googleAuthCallback);

router.get('/auth/facebook', passportController.loginWithFacebook);
router.get('/auth/facebook/callback', passportController.facebookAuthCallback);

module.exports = router;
