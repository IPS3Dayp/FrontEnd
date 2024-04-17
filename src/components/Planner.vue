<template>
  <div class="planner-container">
    <!-- Include Sidebar component -->
    <Sidebar />

    <h1>Planner</h1>
    <!-- Conditional rendering based on loading and activities state -->
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="activities.length === 0" class="no-activities">No activities found.</div>
    <ul v-else class="activity-list">
      <li v-for="activity in activities" :key="activity.id">
        {{ activity.activityName }} - {{ formatDate(activity.startTime) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Sidebar from './Sidebar.vue';  // Import Sidebar component
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: 'Planner',
  components: {
    Sidebar  // Register Sidebar component
  },
  setup() {
    const { user } = useAuth0();
    const activities = ref([]);
    const loading = ref(true);

    const fetchActivities = async () => {
      try {
        let queryString = ''; // Define queryString outside of the if block

        // Fetch user details using email to get the user ID
        const response = await axios.get(`https://localhost:7286/api/User/email/${user.value.email}`);
        const fetchedUser = response.data;

        if (fetchedUser && fetchedUser.id) {
          // Fetch activity IDs using the user ID
          const activityIdsResponse = await axios.get(`https://localhost:7286/api/User/${fetchedUser.id}/Activities`);
          const activityIds = activityIdsResponse.data;

          if (activityIds && activityIds.length > 0) {
            // Construct queryString
            queryString = activityIds.map(id => `ids=${id}`).join('&');

            // Fetch individual activities using the activity IDs
            try {
              const activityResponse = await axios.get(`https://localhost:7291/api/PlannedActivities/multiple?${queryString}`);
              activities.value.push(...activityResponse.data);
              console.log(activities);
            } catch (error) {
              console.error(`Error fetching activity with IDs ${queryString}:`, error);
            }

          } else {
            console.error('No activities found for the user');
          }
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        loading.value = false;
      }
      console.log(activities.value);
    };


    const formatDate = (dateTime) => {
      const options = {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateTime).toLocaleString('en-US', options).replace(',', '').replace(/\//g, '-');
    };

    onMounted(() => {
      fetchActivities();
    });

    return {
      activities,
      loading,
      formatDate
    };
  }
};
</script>

<style scoped>
.planner-container {
  display: flex;
}

.loading,
.no-activities {
  margin-top: 20px;
  font-size: 1.2em;
}

.activity-list {
  list-style-type: none;
  padding: 0;
}

.activity-list li {
  margin: 10px 0;
  font-size: 1.2em;
}

/* Sidebar styles */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 275px;
  background-color: #15202b;
  color: #ffffff;
  padding-top: 54px;
}

.sidebar-inner {
  padding-top: 20px;
}

.sidebar-link {
  display: block;
  padding: 15px 20px;
  color: #ffffff;
  text-decoration: none;
}

.sidebar-link:hover {
  background-color: #1c2938;
}

.active {
  background-color: #1c2938;
}

/* Logout button styles */
.logout-link {
  display: block;
  padding: 15px 20px;
  color: #ffffff;
  text-decoration: none;
}

.logout-link:hover {
  background-color: #1c2938;
}
</style>
