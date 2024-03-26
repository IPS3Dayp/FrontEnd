<template>
  <div>
    <button @click="login">Log in</button>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { loginWithRedirect, user, isAuthenticated } = useAuth0();

    const sendUserData = async (userData) => {
      try {
        const response = await fetch('https://localhost:7286/api/User', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log('User data sent:', data);
      } catch (error) {
        console.error('Error sending user data:', error);
      }
    };

    const handleLogin = async () => {
      await loginWithRedirect();
      if (isAuthenticated.value) {
        const userProfile = await user.value;
        sendUserData(userProfile);
      }
    };

    return {
      login: handleLogin,
      isAuthenticated,
    };
  },
};
</script>
