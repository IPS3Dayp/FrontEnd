<template>
  <div class="app-container">
    <div class="logo-container">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// Import router-view to display the appropriate component based on the current route
import { RouterView } from 'vue-router';
import axios from 'axios';
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      activities: [],
      loading: true
    };
  },
  async created() {
    try {
      const response = await axios.get('https://localhost:7291/api/PlannedActivities/currentdatetime');
      this.activities = response.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    formatDate(dateTime) {
      const options = {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateTime).toLocaleString('en-US', options).replace(',', '').replace(/\//g, '-');
    }
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: flex-start; /* Align content to the top */
  height: 100vh; /* Full height of the viewport */
}

.logo-container {
  margin-top: 20px; 
}

.logo {
  height: 6em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>