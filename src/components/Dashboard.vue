<template>
  <div class="dashboard">
    <Sidebar />
    <div class="main-content">
      <h1>Dashboard</h1>
      <div v-if="loading">Loading...</div>
      <ul v-else>
        <li v-for="activity in activities" :key="activity.id">
          <strong>Activity Name:</strong> {{ activity.activityName }}<br />
          <strong>Start Time:</strong> {{ formatDate(activity.startTime) }}<br />
          <strong>End Time:</strong> {{ formatDate(activity.endTime) }}<br />
          <hr />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from './Sidebar.vue';

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
      const userResponse = await axios.get('https://localhost:7286/api/User/email/luukmsn2004@gmail.com');
      const userId = userResponse.data.id; // Assuming the response contains the user's ID

      const userActivitiesResponse = await axios.get(`https://localhost:7286/api/User/${userId}/Activities`);
      const activityIds = userActivitiesResponse.data;

      const currentDateActivitiesResponse = await axios.get('https://localhost:7291/api/PlannedActivities/currentdatetime');
      const currentDateActivities = currentDateActivitiesResponse.data;

      // Filter activities based on user's activity IDs
      const activities = currentDateActivities.filter(activity => activityIds.includes(activity.id));

      this.activities = activities;
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
.dashboard {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0; 
}
</style>
