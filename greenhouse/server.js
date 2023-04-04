const express = require('express')
const app = express()
const port = 3000

app.get( '/:user', ( req, res ) => {
  let {user} = req.params
  res.send('You have connected to the server '+user+'. Nice.')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
