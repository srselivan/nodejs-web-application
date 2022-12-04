const express = require("express")
const app = express()
const router = require("./routes/router")

const PORT =  3000

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.use("/", router)

app.listen(PORT, () => {
      console.log('Server has been started on port 3000')
})