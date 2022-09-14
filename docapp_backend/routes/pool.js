var mysql = require("mysql");
// var pool = mysql.createPool({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "12345",
//   database: "e-consult",
//   connectionLimit: 100,
//   multipleStatements: true,
// });

var pool = mysql.createPool(
  'mysql://luxo2g2zdgaw3qmbecvk:pscale_pw_1p5hQx4HQN2yNpioXzcLCoxZrVuwyQ9tTlyH3oYzixw@ap-south.connect.psdb.cloud/docapp?ssl={"rejectUnauthorized":true}'
);
console.log("Connected to PlanetScale!");

module.exports = pool;
