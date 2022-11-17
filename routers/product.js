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
module.exports = router