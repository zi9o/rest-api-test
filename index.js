import express from "express";
import nunjucks from "nunjucks";
import path from "path";

const app = express();

app.set("views", path.join(__dirname, "/front"));
app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "./front"), {
  autoescape: true,
  express: app
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './front/build'), { maxAge: 31536000000 }));

app.use('/api', require("./app/routes/routes")(app));

// When on Production mode, All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './front/build', 'index.html'));
});

app.listen(3001, () => {
  console.log(`Server started ➜ http://localhost:3001`);
});
