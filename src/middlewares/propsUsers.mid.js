
function propsUsers(req, res, next) {
  const { name, image, email } = req.body

  if(
    !name ||
    !image || 
    !email ) {
      return res.json({
        statusCode: 400,
        message: `${req.method} ${req.url} All user fields are required`
      })
    } else {
      return next() 
    }
}

export default propsUsers