<template>
    <div class="account-container">
        <div class="account-content">
            <h2>My Account</h2>
            <div class="account-info" v-if="user">
                
                <div class="info-group">
                    <label>Student ID:</label>
                    <p>{{ user.user_id }}</p>
                </div>
                <div class="info-group">
                    <label>Name:</label>
                    <p>{{ user.user_name || 'Not provided' }}</p>
                </div>
             

                <!-- QR Code section -->
                <div class="qr-code-section">
                    <h3>Your Student ID Card</h3>
                    <p>Scan this QR code to verify your student identity</p>
                    <div class="qr-code-container">
                        <canvas ref="qrCanvas"></canvas>
                    </div>
                    <router-link to="/user-qrcode" class="qr-link">View Full QR Code Page</router-link>
                </div>
            </div>
            <div class="no-user" v-else>
                <p>Please log in to view your account information.</p>
                <router-link to="/login" class="btn">Login</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import QRCode from 'qrcode';
import axios from 'axios';

export default {
    name: 'Account',
    computed: {
        ...mapState(['user']),
        qrValue() {
            if (!this.user) return '';
            const baseUrl = window.location.origin;
            const userName = encodeURIComponent(this.user.user_name || '');
            return `${baseUrl}/account-verification/${this.user.user_id}?name=${userName}`;
        }
    },
    methods: {
        generateQRCode() {
            if (this.user && this.$refs.qrCanvas) {
                QRCode.toCanvas(this.$refs.qrCanvas, this.qrValue, {
                    width: 200,
                    margin: 1,
                    errorCorrectionLevel: 'H'
                }, (error) => {
                    if (error) console.error('Error generating QR code:', error);
                });
            }
        },
        async fetchUserData() {
            try {
                const response = await axios.get('/api/user'); // Adjust the endpoint as necessary
                console.log('API Response:', response.data); // Log the response to check for photo_url
                this.setUser(response.data); // Ensure photo_url is included in response.data
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    },
    beforeMount() {
        // Redirect to login if not authenticated
        if (!this.user) {
            this.$router.push('/login');
        }
    },
    mounted() {
        console.log('User state:', this.user);
        console.log('Photo URL:', this.user.photo_url);
        this.generateQRCode();
    },
    updated() {
        this.generateQRCode();
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

.actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
}

.btn-update {
    background: #27ae60;
}

.btn-password {
    background: #f38609;
}

.btn-password:hover {
    background: #e67e00;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.modal-content h3 {
    color: #130f40;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    font-size: 1.4rem;
    color: #666;
    margin-bottom: 0.5rem;
}

.form-group input {
    width: 100%;
    padding: 1rem;
    font-size: 1.4rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    outline: none;
}

.form-group input:focus {
    border-color: #27ae60;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
}

.btn-cancel {
    background: #666;
}

.btn-cancel:hover {
    background: #555;
}

.qr-code-section {
    margin-top: 2rem;
    padding: 1.5rem;
    border: 1px solid #eee;
    border-radius: 0.5rem;
    text-align: center;
}

.qr-code-section h3 {
    font-size: 1.8rem;
    color: #130f40;
    margin-bottom: 0.5rem;
}

.qr-code-section p {
    font-size: 1.4rem;
    color: #666;
    margin-bottom: 1rem;
}

.qr-code-container {
    display: flex;
    justify-content: center;
    padding: 1rem;
    background: #fff;
}

.qr-link {
    display: block;
    margin-top: 1rem;
    color: #27ae60;
    text-decoration: none;
}

.qr-link:hover {
    text-decoration: underline;
}

.profile-photo {
    width: 100px; /* Adjust size as needed */
    height: 100px; /* Adjust size as needed */
    border-radius: 50%; /* Make it circular */
    margin-top: 1rem;
}

.photo-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

.student-photo {
    width: 100px; /* Adjust size as needed */
    height: 100px; /* Adjust size as needed */
    border-radius: 50%; /* Make it circular */
}
</style> 