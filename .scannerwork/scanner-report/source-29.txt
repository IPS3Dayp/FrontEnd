<template>
  <div class="sidebar">
    <div class="sidebar-inner">
      <router-link to="/dashboard" class="sidebar-link" :class="{ active: $route.path === '/dashboard' }">Dashboard</router-link>
      <router-link to="/planner" class="sidebar-link" :class="{ active: $route.path === '/planner' }">Planner</router-link>
      <router-link to="/settings" class="sidebar-link" :class="{ active: $route.path === '/settings' }">Settings</router-link>
      
      <!-- Conditionally render logout or login link -->
      <router-link v-if="isAuthenticated" to="/logout" class="sidebar-link logout-link">Logout</router-link>
      <router-link v-else to="/login" class="sidebar-link logout-link">Login</router-link>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: 'Sidebar',
  setup() {
    const { isAuthenticated } = useAuth0();

    return {
      isAuthenticated
    };
  }
}
</script>

<style scoped>
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