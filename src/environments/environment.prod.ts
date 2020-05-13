export const environment = {
  production: true,
  serverURL: (location) => {
    return "http://" + location.host + "/";
  },
};
