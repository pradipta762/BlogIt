const routes = {
  root: "/",
  dashboard: "/dashboard",
  posts: {
    create: "/posts/create",
    show: "/posts/:slug/show",
  },
  auth: {
    signup: "/signup",
    login: "/login",
  },
};

export default routes;
