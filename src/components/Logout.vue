<template>
  <div>
    <button @click="logout">Log out</button>
  </div>
</template>

<script>
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    setup() {
      const { logout, getAccessTokenSilently } = useAuth0();

      const logoutUser = () => {
        logout({ returnTo: window.location.origin });
      };

      return {
        logout: logoutUser,
      };
    },
  };
</script>
