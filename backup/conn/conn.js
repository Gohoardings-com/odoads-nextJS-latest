const {createPool} = require("mysql");


const db_config = createPool({
  user: "root",
  host: "localhost",
  password: "",
  database: "odoads_tblcompanies",
  dateStrings:true,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 50,

 
});


const executeQuery = (query, arraParms) => {
  return new Promise((resolve, reject) => {
    db_config.getConnection((err, conn) => {
      if (err) {
        // handle error
        reject(err);
      } else if(query){
        conn.changeUser({ database: arraParms });
        conn.query(query, async (err, data) => {
          if (err) {
            // handle error
   
           return reject(err);
          } else {
            // handle success
           return resolve(data);
          }
        });
        conn.release();
      }
    })
  })
}

module.exports = {executeQuery};