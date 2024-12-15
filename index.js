import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import qs from "qs";

const app= express();
const port=3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
    const short = req.query.short || null;  
    const originalURL = req.query.url || '';  
    res.render("index.ejs", { short: short, originalURL: originalURL });
});
app.post("/generate",async(req,res)=>{
    const userURL=req.body.url;
    
    try{
        const params = qs.stringify({
            url: userURL
        });
       
        const response = await axios.post('https://cleanuri.com/api/v1/shorten', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const result = response.data.result_url;
        res.render("index.ejs", { short: result, originalURL: userURL });
        
    
      }
      catch(error){
        res.status(404).send(error.message);
      }
} )

app.listen(port,()=>{
    console.log(`Server running successfully in ${port}`);
})