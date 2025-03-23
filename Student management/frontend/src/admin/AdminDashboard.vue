<template>
  <div class="admin-dashboard">
    <nav class="admin-navbar" @click="goHome">
      <h1 class="website-name">Admin's Management Page</h1>
    </nav>
    <div class="button-container">
      <router-link to="/register" class="btn-add">Add New Student</router-link>
     
      <button @click="handleLogout" class="btn-logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  methods: {
    handleLogout() {
      this.$store.commit('setAdmin', null);
      this.$router.push('/home');
    },
    goHome() {
      this.$router.push('/'); // Navigate to home page
    }
  }
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background: #f5f5f5;
}

.admin-navbar {
  background: #27ae60; /* Navbar background color */
  padding: 1rem;
  text-align: center;
  cursor: pointer; /* Indicate that it's clickable */
}

.website-name {
  color: white; /* Text color */
  margin: 0; /* Remove default margin */
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: auto;
}

.btn-add, .btn-search, .btn-logout {
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.3s ease;
  text-align: center;
  text-decoration: none;
}

.btn-add {
  background: #27ae60;
  color: white;
}

.btn-add:hover {
  background: #219150;
}

.btn-search {
  background: #3498db;
  color: white;
}

.btn-search:hover {
  background: #2980b9;
}

.btn-logout {
  background: #e74c3c;
  color: white;
}

.btn-logout:hover {
  background: #c0392b;
}
</style> 