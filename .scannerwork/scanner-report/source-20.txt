<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';  // Import onMounted from vue
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';

export default {
  setup() {
    const { getAccessTokenSilently, user } = useAuth0();
    const isAuthenticated = ref(false);

    const doSomethingWithToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log("Access Token:", token);

        // Check if the user exists
        let response;
        try {
          response = await axios.get(`https://localhost:7286/api/User/email/${user.value.email}`, {
          });
          console.log('User exists', response.data);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            response = { data: null };  // Set data to null to indicate user doesn't exist
            console.log('User does not exist');
          } else {
            throw error;  // Re-throw other errors
          }
        }

        const data = response.data;

        if (!data) {
          // Create the user
          const createUserResponse = await axios.post('https://localhost:7286/api/User', {
            id: generateHexCode(),
            email: user.value.email,
            activityIds: []
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const createUserResult = createUserResponse.data;

          if (createUserResult.error) {
            console.error(createUserResult.error);
          } else {
            console.log('User created:', createUserResult);
          }
        } else {
          console.log('User already exists:', data);
        }

      } catch (error) {
        console.error("Error in doSomethingWithToken:", error);
      }
    };

    const generateHexCode = () => {
      return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    };

    onMounted(async () => {
      if (user.value && user.value.sub) {
        isAuthenticated.value = true;
        console.log("Authenticated user:", user.value);

        await doSomethingWithToken();
      }
    });

    return {
      isAuthenticated
    };
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
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
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
