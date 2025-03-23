// import connection
import db from "../config/database.js";

// Get all admins
export const getAllAdmins = (result) => {
    db.query("SELECT admin_id, admin_name, admin_email, role, created_at FROM admin", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// Get single admin by ID
export const getAdminById = (id, result) => {
    db.query("SELECT admin_id, admin_name, admin_email, role, created_at FROM admin WHERE admin_id = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
};

// Get admin by email
export const getAdminByEmail = (email, result) => {
    db.query("SELECT * FROM admin WHERE admin_email = ?", [email], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
};

// Insert admin
export const insertAdmin = (data, result) => {
    db.query("INSERT INTO admin SET ?", data, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// Update admin
export const updateAdminById = (data, id, result) => {
    db.query("UPDATE admin SET admin_name = ?, admin_email = ?, role = ? WHERE admin_id = ?", 
        [data.admin_name, data.admin_email, data.role, id], 
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

// Update admin password
export const updateAdminPassword = (data, id, result) => {
    db.query("UPDATE admin SET admin_password = ? WHERE admin_id = ?", 
        [data.admin_password, id], 
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

// Delete admin
export const deleteAdminById = (id, result) => {
    db.query("DELETE FROM admin WHERE admin_id = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}; 