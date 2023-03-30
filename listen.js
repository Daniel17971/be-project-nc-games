const app = require("./api/app.js");

const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`server listening on port ${PORT}`);
});
