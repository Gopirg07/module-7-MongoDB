import jwt from "jsonwebtoken";
//cutom middleware

export const auth = (request, response, next) => {
    try {
        const token = request.header("x-auth-token");
        console.log("Token : ", token);
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    }
    catch(err){
        response.status(401).send({ message: err.message })
    }
}