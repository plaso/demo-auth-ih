const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const booksController = require('../controllers/book.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', (req, res, next) => res.send('hola'))

// Auth
router.get(
  '/signup',
  authMiddleware.isNotAuthenticated,
  authController.signup
);
router.post('/signup', authController.doSignup)

router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get('/logout', authController.logout)

// User
router.get('/profile', authMiddleware.isAuthenticated, userController.profile);

// Book
router.delete('/books/:id', booksController.doDelete)
router.get('/books/create', authMiddleware.isAuthenticated, booksController.create)
router.post('/books', authMiddleware.isAuthenticated, booksController.doCreate)

module.exports = router;
