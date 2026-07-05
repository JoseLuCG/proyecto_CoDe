import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";
import { mySqlConn } from "../bdcon/bdcon.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const JWT_EXPIRES_IN = "30d";

function addNewUser(req, res) {
    const {
        userName,
        userLastName,
        userEmail,
        userPhone,
        userPassword
    } = req.body;

    if (!userName || !userLastName || !userEmail || !userPhone || !userPassword) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        return res.status(400).json({ error: "Formato de email inválido" });
    }

    if (userPassword.length < 6) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(userPhone)) {
        return res.status(400).json({ error: "El teléfono debe tener 9 dígitos" });
    }

    const uuidUser = uuidV4();

    bcrypt.hash(userPassword, 12, (err, hashedPassword) => {
        if (err) {
            console.error("Bcrypt error:", err);
            return res.sendStatus(500);
        }

        const sql = `INSERT INTO user (uuid_user, name_user, last_name_user, email, phone_number, user_password)
                     VALUES (?, ?, ?, ?, ?, ?)`;

        mySqlConn.query(sql, [uuidUser, userName, userLastName, userEmail, userPhone, hashedPassword], (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ error: "El email o teléfono ya está registrado" });
                }
                console.error("DB error:", err);
                return res.sendStatus(500);
            }
            res.status(201).json({ uuidUser });
        });
    });
}

function checkLogin(req, res) {
    const { userLoginData, userPassword } = req.body;

    if (!userLoginData || !userPassword) {
        return res.status(400).json({ error: "Email/teléfono y contraseña son obligatorios" });
    }

    const sql = `SELECT uuid_user, name_user, last_name_user, email, phone_number, user_password
                 FROM user
                 WHERE email = ? OR phone_number = ?`;

    mySqlConn.query(sql, [userLoginData, userLoginData], (err, data) => {
        if (err) {
            console.error("DB error:", err);
            return res.sendStatus(500);
        }

        if (data.length === 0) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const user = data[0];

        bcrypt.compare(userPassword, user.user_password, (err, match) => {
            if (err) {
                console.error("Bcrypt error:", err);
                return res.sendStatus(500);
            }

            if (!match) {
                return res.status(401).json({ error: "Credenciales inválidas" });
            }

            const tokenPayload = {
                uuidUser: user.uuid_user,
                email: user.email
            };

            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

            res.json({
                token,
                user: {
                    uuidUser: user.uuid_user,
                    nameUser: user.name_user,
                    lastName: user.last_name_user,
                    email: user.email,
                    phoneNumber: user.phone_number
                }
            });
        });
    });
}

export {
    addNewUser,
    checkLogin
};
