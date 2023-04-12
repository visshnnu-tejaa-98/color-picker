import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) =>
  res.send(`Server is up and running in port ${PORT}`)
);

app.listen(PORT, () =>
  console.log(`🚀🚀Color Picker server is up and running in ${PORT}🚀🚀`)
);
