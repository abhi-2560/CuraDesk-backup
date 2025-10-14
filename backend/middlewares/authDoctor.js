


// first code section is written because original code gave the error as 'cannot set properties of docId'
// similar error was generated when we wrote authUser.js that said 'cannot set properties of userId'
// matching the code with authUser.js, this code was written...






import jwt from 'jsonwebtoken'

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const dtoken = req.headers?.dtoken
        if (!dtoken) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Please login again.' });
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)

        if (!req.body){
            req.body = {};
        } 

        req.body.docId = token_decode?.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authDoctor;

/*
// import jwt from 'jsonwebtoken';
// // user authentication middleware
// const authUser = async (req, res, next) => {
//     try {
//         const token = req.headers?.token;
//         if (!token) {
//             return res.status(401).json({ success: false, message: 'Not Authorized. Please login again.' });
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // Ensure req.body exists before setting userId
//         if (!req.body) req.body = {};
//         req.body.userId = decoded?.id;
//         next();
//     } catch (error) {
//         console.error('Auth middleware error:', error);
//         res.status(401).json({ success: false, message: 'Invalid or expired token' });
//     }
// };*/