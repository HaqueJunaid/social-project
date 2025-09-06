
import app from "./src/app.js";
import connectToDb from "./src/db/db.js";

async function startApp() {
    await connectToDb();
    app.listen(process.env.PORT, () => {
        console.log("Server running at http://localhost:3000/");
    })
}

startApp();