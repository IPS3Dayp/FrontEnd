<template>
  <div class="planner-container">
    <!-- Include Sidebar component -->
    <Sidebar />

    <h1>Planner</h1>

    <!-- Add Activity Button -->
    <button @click="showAddActivityPopup = true">Add Activity</button>

    <!-- Conditional rendering based on loading and activities state -->
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="activities.length === 0" class="no-activities">No activities found.</div>
    <ul v-else class="activity-list">
      <li v-for="activity in activities" :key="activity.id">
        {{ activity.activityName }} - {{ formatDate(activity.startTime) }}
      </li>
    </ul>

    <!-- Add Activity Popup -->
    <div v-if="showAddActivityPopup" class="add-activity-popup">
      <h2>Add New Activity</h2>
      <input v-model="newActivity.activityName" placeholder="Activity Name" />
      <input type="datetime-local" v-model="newActivity.startTime" placeholder="Start Time" />
      <input type="datetime-local" v-model="newActivity.endTime" placeholder="End Time" />
      <button @click="addActivity">Save</button>
      <button @click="showAddActivityPopup = false">Cancel</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Sidebar from './Sidebar.vue';
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: 'Planner',
  components: {
    Sidebar
  },
  setup() {
    const { user } = useAuth0();
    const activities = ref([]);
    const loading = ref(true);
    const showAddActivityPopup = ref(false);
    const newActivity = ref({
      activityName: '',
      startTime: '',
      endTime: ''
    });

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://localhost:7286/api/User/email/${user.value.email}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    };

    const fetchActivities = async () => {
      try {
        loading.value = true; // Set loading to true before fetching activities

        activities.value = []; // Clear the activities array before fetching again

        const fetchedUser = await fetchUserData();

        let queryString = '';

        if (fetchedUser && fetchedUser.id) {
          const activityIdsResponse = await axios.get(`https://localhost:7286/api/User/${fetchedUser.id}/Activities`);
          const activityIds = activityIdsResponse.data;

          if (activityIds && activityIds.length > 0) {
            queryString = activityIds.map(id => `ids=${id}`).join('&');

            try {
              const activityResponse = await axios.get(`https://localhost:7291/api/PlannedActivities/multiple?${queryString}`);
              activities.value.push(...activityResponse.data);
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
    };


    const addActivity = async () => {
      try {
        const createdActivityResponse = await axios.post('https://localhost:7291/api/PlannedActivities', {
          activityName: newActivity.value.activityName,
          startTime: newActivity.value.startTime,
          endTime: newActivity.value.endTime
        });

        const fetchedUser = await fetchUserData();
        const createdActivity = createdActivityResponse.data;
        console.log(createdActivity.id);

        const addedActivityResponse = await axios.put(`https://localhost:7286/api/User/${fetchedUser.id}?activityID=${parseInt(createdActivity.id, 10)}`, {
        });

        console.log(addedActivityResponse)

        newActivity.value = {
          activityName: '',
          startTime: '',
          endTime: ''
        };
        showAddActivityPopup.value = false;

        fetchActivities();
      } catch (error) {
        console.error('Error adding activity:', error);
      }
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
      formatDate,
      showAddActivityPopup,
      newActivity,
      addActivity
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
