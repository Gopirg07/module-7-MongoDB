import express from "express"
import { createUser, generateHashedPassword, getUserByName } from "../services/user.services.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//Signup 
router.post("/signup", async function (request, response) {
    const { username, password } = request.body;

    const userFromDB = await getUserByName(username);
    console.log(userFromDB);

    if (userFromDB) {
        response.status(400).send({ message: "Username already exists" })
    }
    else if (password.length < 8) {
        response.status(400).send({ message: "password must be at least 8 chars" })
    }
    else {
        const hashedPassword = await generateHashedPassword(password)
        const result = await createUser({ username: username, password: hashedPassword })
        response.send(result);
    }
});


//Login 
router.post("/login", async function (request, response) {

    const { username, password } = request.body;

    const userFromDB = await getUserByName(username);
    console.log(userFromDB);

    if (!userFromDB) {
        response.status(401).send({ message: "Invalid Credentials" })
    }
    else {
        const storedDBPassword = userFromDB.password;
        const isPasswordCheck = await bcrypt.compare(password, storedDBPassword)
        console.log(isPasswordCheck);

        if (isPasswordCheck) {
            const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY)
            response.send({ message: "Successfully Logged In!!", token: token, roleId: userFromDB.roleId });
        }
        else {
            response.status(401).send({ message: "Invalid Credentials" })
        }
    }
});
export default router;
