import express from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import dbmain from "../src/config/db.js"
import employeeRoute from "../src/routes/employee.js"
import adminRoute from  "../src/routes/admin.js"
import devRoute from "../src/routes/dev.js"
import inventoryRoutes from "../src/routes/inventoryRoutes.js"
import partyRoutes from "../src/routes/party.js"
import cors from 'cors'; // Import the cors package
dotenv.config(); 
dbmain().then(()=>{ console.log("db connected");}).catch((e)=>{ console.log(e);console.log("db not connected");})
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/api",devRoute)
app.use("/api",employeeRoute)
app.use("/api",adminRoute)
app.use("/api",inventoryRoutes)
app.use("/api",partyRoutes)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
