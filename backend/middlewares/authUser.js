// import jwt from 'jsonwebtoken'

// // user authentication middleware
// const authUser = async (req, res, next) => {
//     try {
//         const { token } = req.headers
//         if (!token) {
//             return res.json({ success: false, message: 'Not Authorized Login Again' })
//         }
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         req.body.userId = token_decode.id
//         next()
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// export default authUser;


// above is the code which was correct but gave the error -> Cannot set properties of undefined(setting userId)
// so below is the code from copilot

import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
    try {
        const {token } = req.headers;
        if (!token) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again",
            });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // req.body.userId = token_decode.id;
        //refer get-profile in userController
        req.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;