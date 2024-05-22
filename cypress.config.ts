import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    email: 'luukmsn2004@gmail.com',
    password: 'Leavy999!'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
