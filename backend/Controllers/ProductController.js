const products = require('../Models/Product')
const asyncHandler = require('express-async-handler')



const getProducts = asyncHandler (async (req, res) => {
    const product = await products.find({})
    res.json(product)
})
const getProductId = asyncHandler (async (req, res) => {
    const product= await products.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
        
    }
   
})

const AdminDeleteProduct = asyncHandler(async (req, res) => {
  
    const product = await products.findById(req.params.id)
  
  
    if (product) {
      await product.remove()
      res.json({message: 'product deleted'})
    } else {
      res.status(404)
      throw new Error('product not deleted')
    }
  })


  const CreateProduct = asyncHandler(async (req, res) => {
   
    const product = new products({
      name:'sample name',
      user: req.user._id,
      image: '/image/sample.jpd',
      brand:'sample brand',
      category:'sample category',
      description:'sample description',
    })
    const createproduct = await product.save()
    res.status(201).json(createproduct )
    
  })


  const UpdateProduct = asyncHandler(async (req, res) => {
    const { name, brand, category, image, description,price,stock} = req.body
  
    
   const product = await products.findById(req.params.id)

   if (product) {
    product.name=name
    product.brand=brand
    product.category=category
    product.image=image
    product.description=description
    product.price=price
    product.stock=stock


    const updateproduct = await product.save()
    res.json(updateproduct)
   }else{
    res.status(404)
    throw new Error ('Product not found')
   }
    
  })
  





module.exports = {getProducts ,getProductId,AdminDeleteProduct,UpdateProduct,CreateProduct}