const routes = {
  root: "/",
  dashboard: "/dashboard",
  posts: {
    create: "/posts/create",
    show: "/posts/:slug/show",
    edit: "/posts/:slug/edit",
    myPost: "/posts/my-post",
    pdf: "/posts/:slug/pdf",
  },
  auth: {
    signup: "/signup",
    login: "/login",
  },
};

export default routes;
