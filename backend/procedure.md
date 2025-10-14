- First we created frontend and backend folders

# BACKEND

1. NPM INIT

2.  npm install express mongoose multer bcrypt cloudinary cors dotenv jsonwebtoken nodemon validator

3. RUN THE SERVER USING NODEMON TO CHECK WHETHER RUNNING

4. CREATE BACKEND STRUCTURE BY CREATING SEVERAL FOLDERS:    
    - CONFIG(STORES MONGODB CONFIG ETC)
    - CONTROLLERS(LOGIC FOR API)
    - MIDDLEWARE(CUSTOM MW FOR USER AUTH)
    - MODELS(FOR MONGOOSE MODELS TO STORE DATA IN FORMATTED STRUCTURE)
    - ROUTES(ROUTES FOR API LIKE USER LOGIN AND APPOINTMENT BOOKING ETC)
    - ENV

5. edit config/mongodb.js
    - create mongodb.js
play from 4:47:30 to 4:50:16 to setup mongodb atlas

    - in mongodb.js, setup mongodb uri as mongodb+srv://abhi:<db_password>@cluster0.v9eumlj.mongodb.net

    - the code for mongodb.js connects it with .env


6. Try to run this to check whether working.

7. edit config/cloudinary.js
    - go to cloudinary website -> api keys -> generate new api key
    - copy CLOUD NAME, API KEY, API SECRET and store it in .env file


8. Now we need to create models -> doctorModel and userModel
- refer models/doctorModel.js and models/userModel.js and export it.
<br>
- These models explain the structure in which data for doctor and user is stored.
- Mongoose provides such capabilities

9. Now, using these models we will create multiple apis
- play from 5:13:13
- create adminController.js and doctorController.js
    - in adminController.js, we needed to pass data as form data so we neede multer middleware -> middleware/multer.js

- we created controllers/adminController.js and it exports {addDoctor} function

- create middleware/multer.js
    * it converts data into form-data

- to create route using multer/upload middleware:
    - go to route/adminRoute.js 
    - it imports {addDoctor} func from controllers/adminController
    - it imports upload func from middleware/multer.js

- routes/adminRoutes.js exports adminRouter function

<br>

10. in server.js, import adminrouter from routes/adminRoutes.js

    - use app.use() func in server.js to call api and api controller function will be executed that we have mounted in route/adminRoute.js

11. ThunderClient extension or postman tests api
    - open tc/postman and use body->formdata and then enter details like name,degree,experience. Match it with details in doctor model. if address give and issue, use json formatter
    - send a post request
    - we'll see message in vscode terminal
  
<img src="D:\project backup\first post request.png">

12. Now make another post request and you will see changes in database for added doctor



13. ADMIN_EMAIL AND ADMIN_PASSWORD and ** JWT_SECRET** are added in .env file



13. Now open adminController.js and make changes like validating email and password, hashing of password, api for admin login, etc (refer adminController.js)
    - In adminController.js, we've made api for admin login to confirm whether admin is logging in or someone else
    - refer //API for admin login section in adminController.js
    - jwt is used for this validation
  

- send a post request at http://localhost:4000/api/admin/login

{
    "email":"admin@curadesk.com",
    "password":"abhi123"
}

since these are ADMIN_EMAIL AND ADMIN_PASSWORD, it will be success, otherwise failure


14. Creation of authAdmin.js as middleware
- Looks for an atoken
- If the caller didn’t send a token, the request is rejected.
- jwt.verify checks that the token’s signature is valid using the server-side secret JWT_SECRET.
- If the signature check fails or the token is expired, an error is thrown and caught by the catch block.
- Any error (bad token, wrong secret, etc.) is caught and returned as JSON: res.json({ success: false, message: error.message });


15. Another post request made: make a post request at api/admin/login, on success, copy generated token and paste it at header section on new api call at api/admin/add-doctor as name atoken and paste the atoken in its value section
    - play after 6:01:00 something


16. Now on success of 15, changes are visible in mongodb atlas

17. creation of admin folder in main external folder -> project

18. we set different ports for frontend: 5173 and admin: 5174
    - under src -> components, context and pages folder
    - context -> adminContext, appContext, doctorContext
    - copied adminAsset folder to src/assets

19. write contents in adminContext, appContext, doctorContext
    - mount this in main.jsx(refer it once) and enclose "APP" in it

20. create pages/login.jsx(refer it once)

21. changes are made in adminContext.jsx
    - regarding usestate hook of 'atoken'
    - in .env, VITE_BACKEND_URL is created to connect with db
    - a const called backendUrl is made = VITE_BACKEND_URL
    - then a value object is made containing atoken, setAtoken and backendUrl
    - onsubmithandler is created containing try-catch block
    - this handler uses axios.post method




# react toastify is used to show notification