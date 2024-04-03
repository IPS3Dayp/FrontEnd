// auth.js

import { createAuth0 } from '@auth0/auth0-vue';

export const auth0 = createAuth0({
  domain: "dev-rivnyssike6d26bk.us.auth0.com",
  clientId: "cnypGrBVz3zFVPmg0E2oz8NTQHJdEGlV",
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: "https://localhost:7286/",
  }
});