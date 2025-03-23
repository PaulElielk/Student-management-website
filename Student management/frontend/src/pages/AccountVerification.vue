<template>
    <div class="account-container">
        <div class="account-content">
            <h2>Student Verification</h2>
            <div class="loading-indicator" v-if="loading">
                <p>Loading student information...</p>
            </div>
            <div class="account-info" v-else-if="user || $route.query.name">
                <div class="info-group">
                    <label>Student ID:</label>
                    <p>{{ $route.params.id }}</p>
                </div>
                <div class="info-group">
                    <label>Name:</label>
                    <p>{{ $route.query.name || (user && user.user_name) || 'Not provided' }}</p>
                </div>
                
                <div class="verification-status">
                    <div class="status-indicator verified">
                        <i class="fas fa-check-circle"></i>
                        <span>Verified Student</span>
                    </div>
                </div>
            </div>
            <div class="no-user" v-else>
                <p>Invalid student ID or student information not found.</p>
                <router-link to="/login" class="btn">Back to Login</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AccountVerification',
    data() {
        return {
            user: null,
            loading: true,
            error: null
        };
    },
    methods: {
        async fetchStudentData() {
            try {
                this.loading = true;
                const userId = this.$route.params.id;
                if (!userId) {
                    this.error = 'No student ID provided';
                    return;
                }
                
                // Only make API request if name is not provided in URL
                if (!this.$route.query.name) {
                    const response = await axios.get(`/api/users/${userId}`);
                    this.user = response.data;
                } else {
                    // If name is in URL, skip API request
                    this.user = { user_id: userId };
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
                this.error = 'Failed to load student information';
            } finally {
                this.loading = false;
            }
        }
    },
    created() {
        this.fetchStudentData();
    }
}
</script>

<style scoped>
.account-container {
    padding: 2rem 9%;
    min-height: 80vh;
}

.account-content {
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

h2 {
    color: #130f40;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
}

.account-info {
    padding: 1rem;
}

.info-group {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
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
}

.no-user {
    text-align: center;
    padding: 2rem;
}

.no-user p {
    font-size: 1.6rem;
    color: #666;
    margin-bottom: 1rem;
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
}

.btn:hover {
    background: #219150;
}

.verification-status {
    margin-top: 2rem;
    text-align: center;
    padding: 1rem;
}

.status-indicator {
    display: inline-flex;
    align-items: center;
    padding: 0.8rem 1.5rem;
    border-radius: 2rem;
    font-size: 1.6rem;
}

.status-indicator i {
    margin-right: 0.5rem;
    font-size: 1.8rem;
}

.verified {
    background-color: rgba(39, 174, 96, 0.1);
    color: #27ae60;
}
</style> 