const APIEndpoints = {
  task: {
    create: () => 'tasks',
    update: (id: number) => `tasks/${id}`,
    delete: (id: number) => `tasks/${id}`,
  },
  tasks: {
    getAll: () => 'tasks',
    getCounts: () => 'counts',
  },
};

export default APIEndpoints;
