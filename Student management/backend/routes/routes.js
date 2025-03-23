// import express 
import express from "express";
// import functions from controller 

import {
    showAUser,
    createAccount,
    verifyStudent,
    searchStudents
} from "../controllers/user.js";

// init express router
const router = express.Router();

////////////////////////// USER ////////////////////////////////
// get all user
router.get("/api/users/:email", showAUser);

// create account
router.post("/api/users/", createAccount);

// verify student
router.get("/api/verify-student/:userId", verifyStudent);

// search students
router.get("/api/search-students", searchStudents);

// export default router
export default router;








