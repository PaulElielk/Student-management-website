// import connection
import db from "../config/database.js";

// Get all students with pagination
export const getAllStudents = (page, limit, result) => {
    const offset = (page - 1) * limit;
    
    db.query(
        "SELECT * FROM students ORDER BY created_at DESC LIMIT ? OFFSET ?", 
        [parseInt(limit), parseInt(offset)], 
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                // Get total count for pagination
                db.query("SELECT COUNT(*) as total FROM students", (err, countResult) => {
                    if (err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result(null, {
                            students: results,
                            total: countResult[0].total,
                            page: parseInt(page),
                            limit: parseInt(limit),
                            totalPages: Math.ceil(countResult[0].total / limit)
                        });
                    }
                });
            }
        }
    );
};

// Get single student by ID
export const getStudentById = (id, result) => {
    db.query("SELECT * FROM students WHERE student_id = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
};

// Get student by student number
export const getStudentByNumber = (studentNumber, result) => {
    db.query("SELECT * FROM students WHERE student_number = ?", [studentNumber], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
};

// Search students
export const searchStudents = (query, result) => {
    const searchQuery = `%${query}%`;
    
    db.query(
        `SELECT * FROM students 
         WHERE student_name LIKE ? 
         OR student_number LIKE ? 
         OR email LIKE ? 
         OR department LIKE ? 
         OR course LIKE ?`,
        [searchQuery, searchQuery, searchQuery, searchQuery, searchQuery],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Insert student
export const insertStudent = (data, result) => {
    db.query("INSERT INTO students SET ?", data, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            getStudentById(results.insertId, (err, student) => {
                if (err) {
                    result(err, null);
                } else {
                    result(null, student);
                }
            });
        }
    });
};

// Update student
export const updateStudentById = (data, id, result) => {
    db.query(
        "UPDATE students SET ? WHERE student_id = ?", 
        [data, id], 
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                getStudentById(id, (err, student) => {
                    if (err) {
                        result(err, null);
                    } else {
                        result(null, student);
                    }
                });
            }
        }
    );
};

// Delete student
export const deleteStudentById = (id, result) => {
    db.query("DELETE FROM students WHERE student_id = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, { id: id, message: "Student deleted successfully" });
        }
    });
};

// Get students by department
export const getStudentsByDepartment = (department, result) => {
    db.query("SELECT * FROM students WHERE department = ?", [department], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// Get students by course
export const getStudentsByCourse = (course, result) => {
    db.query("SELECT * FROM students WHERE course = ?", [course], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// Get students by status
export const getStudentsByStatus = (status, result) => {
    db.query("SELECT * FROM students WHERE status = ?", [status], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// Get students by year level
export const getStudentsByYearLevel = (yearLevel, result) => {
    db.query("SELECT * FROM students WHERE year_level = ?", [yearLevel], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}; 