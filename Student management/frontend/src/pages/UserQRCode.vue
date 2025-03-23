<template>
  <div class="qrcode-page">
    <div class="qrcode-container">
      <h1>Student ID QR Code</h1>
      <div class="user-info">
        <p><strong>Name:</strong> {{ user ? user.user_name : 'Not available' }}</p>
        <p><strong>ID:</strong> {{ user ? user.user_id : 'Not available' }}</p>
      </div>
      <div class="qr-display" v-if="user">
        <canvas ref="qrCodeCanvas" width="300" height="300"></canvas>
      </div>
      <div class="actions">
        <button @click="downloadQRCode" class="btn btn-primary">Download QR Code</button>
        <router-link to="/account" class="btn btn-secondary">Back to Account</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QRCode from 'qrcode';

export default {
  name: 'UserQRCode',
  computed: {
    ...mapState(['user']),
    qrValue() {
      if (!this.user) return '';
      return JSON.stringify({
        id: this.user.user_id,
        name: this.user.user_name || 'Not provided'
      });
    }
  },
  methods: {
    generateQRCode() {
      if (this.user && this.$refs.qrCodeCanvas) {
        QRCode.toCanvas(this.$refs.qrCodeCanvas, this.qrValue, {
          width: 300,
          margin: 2,
          errorCorrectionLevel: 'H',
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        }, (error) => {
          if (error) console.error('Error generating QR code:', error);
        });
      }
    },
    downloadQRCode() {
      const canvas = this.$refs.qrCodeCanvas;
      if (canvas) {
        const link = document.createElement('a');
        link.download = `${this.user.user_name}-student-id.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
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
    this.generateQRCode();
  },
  updated() {
    this.generateQRCode();
  }
}
</script>

<style scoped>
.qrcode-page {
  padding: 2rem 9%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.qrcode-container {
  max-width: 600px;
  width: 100%;
  background: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #130f40;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.user-info {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  background: #f9f9f9;
}

.user-info p {
  font-size: 1.6rem;
  margin: 0.5rem 0;
  color: #333;
}

.qr-display {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  font-size: 1.6rem;
  color: #fff;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #27ae60;
}

.btn-primary:hover {
  background: #219150;
}

.btn-secondary {
  background: #f38609;
}

.btn-secondary:hover {
  background: #e67e00;
}
</style> 