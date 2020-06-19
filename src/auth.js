import { UserManager, WebStorageStateStore } from "oidc-client";
import store from "./store";

let authenticating = false;

function getClientSettings() {
  return {
    userStore: new WebStorageStateStore({}),
    authority: "https://keycloak.ruche-labs.net/auth/realms/Test",
    client_id: "test-front",
    redirect_uri:
      window.location.origin + "/#/authenticated?client_id=test-front",
    post_logout_redirect_uri: "http://localhost:8080/",
    response_type: "id_token token",
    scope: "openid profile",
    filterProtocolClaims: true,
    loadUserInfo: true
  };
}
const manager = new UserManager(getClientSettings());

export const startAuthentication = () => {
  console.log("start authent");
  if (authenticating === true) {
    return;
  }
  authenticating = true;
  return manager.signinRedirect();
};

export const completeAuthentication = () => {
  return manager.signinRedirectCallback().then(async user => {
    console.log("user profile", user.profile);
    console.log("id token", user.id_token);
    await store.dispatch("setUser", user.profile);
  });
};
