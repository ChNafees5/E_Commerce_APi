const Product = require('../model/Product')
const router = require('express').Router()
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

router.post('/', verifyTokenAndAdmin, async(req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.put('/:id', verifyTokenAndAdmin, async(req, res) => {
    try {
        const updatedProdect = await Product.findByIdAndUpdate(req.params.id, {
            $set:req.body
        }, {new: true})
        res.status(200).json(updatedProdcut)
    } catch (err) {
      res.send(500).json(err)  
    }
})
router.delete('/:id', verifyTokenAndAdmin, async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('product has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})
router.get('/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/', verifyTokenAndAdmin, async(req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        const users = await Product.find()
        // const users = query ? await User.find().sort({_id:-1}).limits(5) : await User.find()
         res.status(200).json(users)
     
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router