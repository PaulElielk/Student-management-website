<template>
  <div class="search-students-container">
    <div class="search-section">
      <h2>Search Students</h2>
      <div class="search-box">
        <input 
          type="text" 
          class="search-input" 
          v-model="searchTerm" 
          placeholder="Search by Student ID or Name..." 
          @input="debounceSearch" 
        />
      </div>
      
      <div class="filter-section" v-if="students.length > 0">
        <p>Found {{ students.length }} student(s)</p>
      </div>
      
      <div class="students-container" v-if="students.length > 0">
        <div v-for="(student, index) in currentPageItems" :key="index" class="student-box">
          <div class="student-content">
            <h3>{{ student.user_name }}</h3>
            <div class="student-info">
              <p>Student ID: {{ student.user_id }}</p>
            </div>
            <router-link :to="`/verify-student/${student.user_id}`" class="btn">View Details</router-link>
          </div>
        </div>
      </div>
      
      <div v-else-if="searched && !loading" class="no-results">
        <div class="no-results-box">
          <div class="content">
            <h1 style="color: #057835fa;">No student found!</h1>
          </div>
          <div class="image">
            <img src="../assets/images/notfound.png" alt="" />
          </div>
        </div>
      </div>
      
      <div v-if="loading" class="loading">
        <p>Searching...</p>
      </div>
      
      <div v-if="students.length > perPage" class="pagination">
        <button v-if="pageNum > 0" @click="previous()" class="action-btn">{{ "<" }}</button>
        <div v-for="(p, i) in calculatePages" :key="i" class="d-inline">
          <span v-if="i == pageNum" class="highlight" @click="set(i)">{{ i + 1 }}</span>
          <span v-else @click="set(i)">{{ i + 1 }}</span>
        </div>
        <button v-if="pageNum < calculatePages - 1" @click="next()" class="action-btn">{{ ">" }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchStudents',
  data() {
    return {
      searchTerm: '',
      students: [],
      loading: false,
      searched: false,
      timeout: null,
      perPage: 6,
      pageNum: 0
    };
  },
  computed: {
    currentPageItems() {
      return this.students.slice(this.pageNum * this.perPage, this.pageNum * this.perPage + this.perPage);
    },
    calculatePages() {
      if (this.students.length % this.perPage != 0) {
        return Math.floor(this.students.length / this.perPage) + 1;
      } else {
        return this.students.length / this.perPage;
      }
    }
  },
  methods: {
    debounceSearch() {
      // Clear any existing timeout
      clearTimeout(this.timeout);
      
      // Set new timeout to delay the search
      this.timeout = setTimeout(() => {
        this.searchStudents();
      }, 300);
    },
    async searchStudents() {
      if (this.searchTerm.trim() === '') {
        this.students = [];
        this.searched = false;
        return;
      }
      
      this.loading = true;
      this.pageNum = 0; // Reset to first page on new search
      
      try {
        const response = await axios.get('/api/search-students', {
          params: { term: this.searchTerm }
        });
        
        if (response.data && response.data.success) {
          this.students = response.data.students;
        } else {
          this.students = [];
        }
        this.searched = true;
      } catch (error) {
        console.error('Error searching students:', error);
        this.students = [];
      } finally {
        this.loading = false;
      }
    },
    set(val) {
      this.pageNum = val;
    },
    next() {
      this.pageNum++;
    },
    previous() {
      this.pageNum--;
    }
  }
};
</script>

<style scoped>
.search-students-container {
  padding: 2rem 9%;
}

.search-section {
  margin-bottom: 2rem;
}

h2 {
  color: #130f40;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.search-box {
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  width: 100%;
  height: 40px;
  padding: 0 1rem;
  font-size: 1.6rem;
  color: white;
  background: #27ae60;
  border: none;
  border-radius: 5px;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

.filter-section {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  color: #666;
}

.students-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.student-box {
  border-radius: 0.5rem;
  position: relative;
  background: #f7f7f7;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.student-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.student-content h3 {
  font-size: 2rem;
  color: #130f40;
  margin-bottom: 1rem;
}

.student-info {
  margin: 1rem 0;
}

.student-info p {
  font-size: 1.6rem;
  color: #666;
  margin: 0.5rem 0;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  font-size: 1.6rem;
  color: #fff;
  background: #27ae60;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background 0.3s ease;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
}

.btn:hover {
  background: #219150;
}

.no-results {
  text-align: center;
}

.no-results-box {
  background: #f7f7f7;
  border-radius: 0.5rem;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 500px;
}

.no-results-box .image img {
  max-width: 200px;
  margin-top: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.6rem;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.pagination span {
  display: inline-block;
  margin: 0 0.5rem;
  cursor: pointer;
  font-size: 1.6rem;
  color: #666;
}

.pagination span.highlight {
  color: #f38609;
  font-weight: bold;
}

.action-btn {
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.5rem;
}

.action-btn:hover {
  background: #219150;
}

@media (max-width: 768px) {
  .students-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 576px) {
  .search-students-container {
    padding: 2rem 5%;
  }
  
  .students-container {
    grid-template-columns: 1fr;
  }
  
  h2 {
    font-size: 2rem;
  }
}
</style> 