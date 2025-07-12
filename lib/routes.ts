// Define all application routes here for consistency
export const routes = {
  // Auth routes
  login: "/login",
  register: "/register",

  // Dashboard routes
  dashboard: {
    student: "/dashboard/student",
    faculty: "/dashboard/faculty",
    head: "/dashboard/head",
    admin: "/dashboard/admin",
  },

  // Events routes
  events: {
    all: "/events/all",
    myEvents: "/events/my-events",
    submit: "/events/submit",
    view: (id: string) => `/events/view/${id}`,
    review: (id: string) => `/events/review/${id}`,
    register: (id: string) => `/events/register/${id}`,
    approve: "/events/approve",
  },

  // IRA routes
  ira: {
    assign: "/ira/assign",
    review: (id: string) => `/ira/review/${id}`,
    results: "/ira/results",
    manage: "/ira/manage",
    register: "/ira/register",
    certificate: (id: string) => `/ira/certificate/${id}`,
  },

  // Slots routes
  slots: {
    allocate: "/slots/allocate",
  },

  // Users routes
  users: {
    manage: "/users/manage",
    create: "/users/create",
    edit: (id: string) => `/users/edit/${id}`,
  },

  // Reports routes
  reports: "/reports",

  // Profile route
  profile: "/profile",

  // Home route
  home: "/",
}
