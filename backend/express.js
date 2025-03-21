const express = require('express');
const cors = require('cors');
const bodyParser=require('body-parser')
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports=app;