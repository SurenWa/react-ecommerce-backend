const Category = require('../models/category');
const Product = require('../models/product');
const Sub = require('../models/sub');
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name, slug: slugify(name).toLowerCase() })
            .save();
        res.json(category)

    } catch (error) {
        //console.log(err)
        res.status(400).send('Create category failed')
    }
}

exports.list = async (req, res) => {
    const category = await Category.find({}).sort({ createdAt: -1 }).exec()
    res.json(category) //Sort by latest product added
}

exports.read = async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    //res.json(category)
    //find products based on category
    const products = await Product.find({category})
    .populate('category')
    .exec()

    res.json({
        category,
        products
    })

}

exports.update = async (req, res) => {
    const { name } = req.body;

    try {
        const updated = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name)},
            { new: true }
        )
        res.json(updated)

    } catch (err) {
        res.status(400).send("Category update failed")
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug })
        //Also findByIdAndDelete() can be used if 'id' is used as params
        res.json(deleted)
    } catch (err) {
        res.status(400).send("Category delete failed")
    }
}

exports.getSubs = async (req, res) => {
    Sub.find({parent: req.params._id}).exec((err, subs) => {
        if (err) console.log(err)
        res.json(subs)
    })
}


