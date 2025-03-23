// import functions from User model

import {
    getAllUser,
    getUserByEmail,
    insertUser
} from "../models/UserModel.js";

// Import your database connection
import db from '../config/database.js';

// get all Users
export const allUsers=(req,res)=>{
    getAllUser((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single user
export const showAUser = (req,res)=>{
    getUserByEmail(req.params.email,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create user
export const createAccount=(req,res)=>{
    const data = req.body;
    insertUser(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// Verify a student by ID
export const verifyStudent = (req, res) => {
    const userId = req.params.userId;
    
    // SQL query to check if student exists
    const query = "SELECT user_id, user_name FROM users WHERE user_id = ?";
    
    // Execute the query
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error verifying student:', err);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while verifying the student'
            });
        }
        
        // Check if student exists
        if (results.length > 0) {
            return res.json({
                success: true,
                student: results[0]
            });
        } else {
            return res.json({
                success: false,
                message: 'Student not found'
            });
        }
    });
};

// Search students
export const searchStudents = (req, res) => {
    const searchTerm = req.query.term || '';
    
    // SQL query to search students by ID or name
    const query = `
        SELECT user_id, user_name 
        FROM users 
        WHERE user_id LIKE ? OR user_name LIKE ?
    `;
    
    const searchPattern = `%${searchTerm}%`;
    
    // Execute the query
    db.query(query, [searchPattern, searchPattern], (err, results) => {
        if (err) {
            console.error('Error searching students:', err);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while searching for students'
            });
        }
        
        return res.json({
            success: true,
            students: results
        });
    });
};




