import express from "express"
import routes from "./Routes";

const app = express();
app.use(express.json());
app.use(routes);

app.get("/", (req,res)=>{
    res.json({message: "Server runnig successfully!"})
})

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Server runnig at http://localhost:${PORT}`)
})