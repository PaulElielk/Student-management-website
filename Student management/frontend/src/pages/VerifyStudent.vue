<template>
  <div class="verify-container">
    <div class="verify-content">
      <h2>Student Verification</h2>
      <div v-if="loading" class="loading">
        <p>Verifying student information...</p>
      </div>
      <div v-else-if="error" class="error">
        <h3>Verification Error</h3>
        <p>{{ error }}</p>
      </div>
      <div v-else-if="student" class="student-verified">
        <h3>Student Verified ✓</h3>
        <div class="info-group">
          <label>Student ID:</label>
          <p>{{ student.user_id }}</p>
        </div>
        <div class="info-group">
          <label>Name:</label>
          <p>{{ student.user_name || 'Not provided' }}</p>
        </div>
        <div class="verification-message">
          <p>This student is registered in our database.</p>
        </div>
      </div>
      <div v-else class="student-not-found">
        <h3>Student Not Found ✗</h3>
        <p>The student ID could not be verified. This may indicate a fraudulent ID.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VerifyStudent',
  data() {
    return {
      student: null,
      loading: true,
      error: null
    };
  },
  mounted() {
    this.verifyStudent();
  },
  methods: {
    async verifyStudent() {
      const userId = this.$route.params.userId;
      
      try {
        this.loading = true;
        // Replace with your API endpoint to verify a student
        const response = await axios.get(`/api/verify-student/${userId}`);
        
        if (response.data && response.data.success) {
          this.student = response.data.student;
        } else {
          this.student = null; // Student not found
        }
      } catch (error) {
        console.error('Error verifying student:', error);
        this.error = 'An error occurred while verifying the student. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.verify-container {
  padding: 2rem 9%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.verify-content {
  max-width: 600px;
  width: 100%;
  background: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  color: #130f40;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

h3 {
  color: #130f40;
  font-size: 1.8rem;
  margin: 1rem 0;
}

.loading p, .error p {
  font-size: 1.6rem;
  color: #666;
}

.student-verified h3 {
  color: #27ae60;
}

.student-not-found h3 {
  color: #e74c3c;
}

.student-not-found p {
  font-size: 1.6rem;
  color: #666;
}

.info-group {
  margin: 1.5rem 0;
  padding: 0.5rem 0;
}

.info-group label {
  font-size: 1.4rem;
  color: #666;
  display: block;
  margin-bottom: 0.5rem;
}

.info-group p {
  font-size: 1.6rem;
  color: #130f40;
  font-weight: bold;
}

.verification-message {
  margin-top: 2rem;
  padding: 1rem;
  background: #f0f8f1;
  border-radius: 0.5rem;
}

.verification-message p {
  font-size: 1.6rem;
  color: #27ae60;
}

.error {
  color: #e74c3c;
  padding: 1rem;
}
</style> 