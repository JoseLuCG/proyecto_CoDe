import { mySqlConn } from "../bdcon/bdcon.js";
import { v4 as uuidV4 } from "uuid";

/**
 * Add a user to the database using a json in the request body.
 * @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
function addNewUser(req, res) {
    const {
        userEmail,
        userLastName,
        userName,
        userPassword,
        userPhone
    } = req.body
    const uuidUser = uuidV4();
    let sql = `CALL createUser("${uuidUser}", "${userName}", "${userLastName}", "${userEmail}", "${userPassword}", "${userPhone}")`;
    
    mySqlConn.query(sql, function (err) {
      if (err) console.log(err);
      else console.log("Correcto");
      res.send();
    });
};

export {
    addNewUser
};
