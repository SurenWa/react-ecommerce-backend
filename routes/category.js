const express = require('express')
const router = express.Router()

//middlewares
const {authCheck, adminCheck} = require('../middlewares/auth');

//controller
const {create, read, update, remove, list, getSubs} = require('../controllers/category');

//routes
router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);

//Route for creating product with category and subcategory.Sub category is visible according to category selected by admin
router.get('/category/subs/:_id', getSubs)  //_id is id of parent i.e category

module.exports = router