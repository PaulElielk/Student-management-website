-- Create Admin Table
CREATE TABLE IF NOT EXISTS admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_name VARCHAR(100) NOT NULL,
    admin_email VARCHAR(100) NOT NULL UNIQUE,
    admin_password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Students Table
CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_number VARCHAR(20) NOT NULL UNIQUE,
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    department VARCHAR(100),
    course VARCHAR(100),
    year_level INT,
    status ENUM('Active', 'Inactive', 'Graduated', 'On Leave') DEFAULT 'Active',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES admin(admin_id) ON DELETE SET NULL
);

-- Insert Default Admin Account
INSERT INTO admin (admin_name, admin_email, admin_password, role) 
VALUES ('Admin', 'admin@school.com', '$2b$10$YourNewHashHere', 'super_admin');
-- Note: The password hash above is for 'admin' - you should change this in production

-- Create Index for Better Performance
CREATE INDEX idx_student_number ON students(student_number);
CREATE INDEX idx_student_name ON students(student_name);
CREATE INDEX idx_student_email ON students(email);
CREATE INDEX idx_student_department ON students(department);
CREATE INDEX idx_student_status ON students(status); 