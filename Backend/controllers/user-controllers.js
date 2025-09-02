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

/**
 * Log the user in the aplication.
* @param {*} req - Object represents the HTTP request query string. 
 * @param {*} res - The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
function checkLogin(req, res) {
    const { userLoginData, userPassword } = req.body;
    let sql = ` SELECT uuid_user, name_user, last_name_user, email, phone_number
	    FROM Users
		    WHERE (email = ? OR phone_number = ?)
		    AND user_password = ?
    ;`;

    mySqlConn.query(sql, [userLoginData, userLoginData, userPassword], (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(data[0]);
        }
    });
    
}

export {
    addNewUser,
    checkLogin
};
