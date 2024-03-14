<template>
    <div>
      <h1>Planned Activities for Today</h1>
      <ul v-if="activities.length > 0">
        <li v-for="activity in activities" :key="activity.id">
          <strong>Activity Name:</strong> {{ activity.activityName }}<br />
          <strong>Start Time:</strong> {{ formatDateTime(activity.startTime) }}<br />
          <strong>End Time:</strong> {{ formatDateTime(activity.endTime) }}<br />
          <hr />
        </li>
      </ul>
      <p v-else>No activities planned for today.</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'PlannedActivities',
    data() {
      return {
        activities: [] as any[],
      };
    },
    async mounted() {
      try {
        const response = await axios.get('https://your-api-url/api/PlannedActivities/currentdatetime');
        this.activities = response.data;
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    },
    methods: {
      formatDateTime(dateTime: string) {
        return new Date(dateTime).toLocaleString();
      },
    },
  });
  </script>