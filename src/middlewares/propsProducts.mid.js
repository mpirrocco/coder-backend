
function propsProducts(req, res, next) {
  const { title, description, price, image, stock } = req.body

  if(
    !title ||
    !description || 
    !price || 
    !image || 
    !stock ) {
      return res.json({
        statusCode: 400,
        message: `${req.method} ${req.url} All fields are required`
      })
    } else {
      return next() 
    }
}

export default propsProducts