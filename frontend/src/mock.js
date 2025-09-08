// Mock data for the todo list app
export const mockTodos = [
  {
    id: '1',
    text: 'Design the new landing page',
    completed: false,
    createdAt: new Date('2024-01-15'),
    priority: 'high'
  },
  {
    id: '2',
    text: 'Review code changes for authentication',
    completed: true,
    createdAt: new Date('2024-01-14'),
    priority: 'medium'
  },
  {
    id: '3',
    text: 'Update project documentation',
    completed: false,
    createdAt: new Date('2024-01-13'),
    priority: 'low'
  },
  {
    id: '4',
    text: 'Schedule team meeting for next week',
    completed: true,
    createdAt: new Date('2024-01-12'),
    priority: 'medium'
  },
  {
    id: '5',
    text: 'Implement dark mode toggle',
    completed: false,
    createdAt: new Date('2024-01-11'),
    priority: 'high'
  }
];

export const mockStats = {
  total: 5,
  completed: 2,
  active: 3,
  completionRate: 40
};