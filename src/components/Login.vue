<template>
  <div>
    <button @click="login">Log in</button>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { loginWithRedirect } = useAuth0();

    const login = () => {
      loginWithRedirect({
        redirectUri: window.location.origin,
        appState: {
          targetUrl: '/dashboard' // the target route to redirect after login
        },
        audience: 'https://localhost:7286/', // your API audience
        scope: 'openid profile email'
      });
    };

    return {
      login
    };
  }
};
</script>
