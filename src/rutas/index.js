const { Router } = require('express');
const router = Router();

router.get('/',(req,res)=>{
    console.log("Hola");
    res.send("Hola");
});

module.exports = router;