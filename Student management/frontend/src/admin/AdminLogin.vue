<template>
  <div class="admin-login-container">
    <div class="admin-login-content">
      <h2>Admin Login</h2>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div v-if="errors.length" class="error-box">
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="loginForm.email" 
            required 
            placeholder="Enter admin email"
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="loginForm.password" 
            required 
            placeholder="Enter password"
          >
        </div>
        <button type="submit" class="btn-login">Login</button>
      </form>
    </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';

export default {
  name: 'AdminLogin',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      errors: [],
      matchAdmin: undefined
    };
  },
  methods: {
    ...mapMutations(['setAdmin']),

    async handleSubmit() {
      this.errors = [];

      // Email validation
      if (!this.loginForm.email) {
        this.errors.push("Entering an email is required");
      } else {
        if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.loginForm.email)) {
          this.errors.push('Email must be valid');
        }
      }

      // Password validation
      if (!this.loginForm.password) {
        this.errors.push('Password is required');
      }

      if (this.errors.length === 0) {
        // Check if the email and password match the expected admin credentials
        if (this.loginForm.email === "admin@school.com" && this.loginForm.password === "admin") {
          // Simulate fetching admin data
          this.matchAdmin = { admin_email: this.loginForm.email, admin_name: "Admin" };
          this.setAdmin(this.matchAdmin);
          this.$router.push("/admin/dashboard");
        } else {
          this.errors.push("Incorrect email or password!");
        }
      }
    }
  }
};
</script>

<style scoped>
.admin-login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  padding: 2rem;
}

.admin-login-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  color: #130f40;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 1.4rem;
  color: #666;
}

input {
  padding: 1rem;
  font-size: 1.4rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  outline: none;
  text-transform: none;
}

input:focus {
  border-color: #27ae60;
}

.btn-login {
  background: #27ae60;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-login:hover {
  background: #219150;
}

.error-box {
  background-color: #fff9fa;
  box-sizing: border-box;
  border: 2px solid rgba(255, 66, 79, .2);
  border-radius: 2px;
  font-size: 12px;
  margin-bottom: 20px;
}

.error-box ul {
  list-style-type: none;
  margin: 0;
  padding: 10px 0px;
}

.error-box ul li {
  padding-left: 10px;
  color: rgb(182, 0, 0);
}
</style> 