const { app } = require("./server");
const { databaseConnect } = require("./database");
// Import the configured server 
// and run it 

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
	databaseConnect();
});