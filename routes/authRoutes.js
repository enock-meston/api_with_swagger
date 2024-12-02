const {Router} = require('express');
const AuthController = require('../controller/userController');

const router = Router();

// routes
router.get('/login', (req, res) => res.render('login'));
router.post('/register',AuthController.signup_post);
router.get('/all-users', AuthController.all_users);
router.get('/user/:id', AuthController.single_user);
// update user
router.put('/user/:id', AuthController.update_user);
// delete user
router.delete('/user/:id', AuthController.delete_user);


module.exports = router;