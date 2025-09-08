import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { CheckCircle2, Circle, Plus, Trash2, Calendar, Target } from 'lucide-react';
import { mockTodos, mockStats } from '../mock';

const TodoApp = () => {
  const [todos, setTodos] = useState(mockTodos);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, active, completionRate };
  }, [todos]);

  const addTodo = () => {
    if (newTask.trim()) {
      const newTodo = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date(),
        priority: 'medium'
      };
      setTodos([newTodo, ...todos]);
      setNewTask('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            TaskFlow
          </h1>
          <p className="text-slate-600">Stay organized, stay productive</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="text-sm text-slate-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-slate-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Circle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-slate-600">Active</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-slate-600 mb-2">Progress</p>
                <Progress value={stats.completionRate} className="h-2 mb-1" />
                <p className="text-sm font-medium text-slate-800">{stats.completionRate}%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Task */}
        <Card className="mb-8 bg-white shadow-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-slate-300 focus:border-slate-500"
              />
              <Button
                onClick={addTodo}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Task Filters */}
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-800">Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value={filter}>
                <div className="space-y-3">
                  {filteredTodos.length === 0 ? (
                    <div className="text-center py-12">
                      <Circle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500">No tasks found</p>
                    </div>
                  ) : (
                    filteredTodos.map((todo) => (
                      <div
                        key={todo.id}
                        className={`flex items-center space-x-4 p-4 rounded-lg border transition-all hover:shadow-sm ${
                          todo.completed 
                            ? 'bg-slate-50 border-slate-200' 
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className="flex-shrink-0 transition-colors hover:scale-110"
                        >
                          {todo.completed ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                          ) : (
                            <Circle className="h-6 w-6 text-slate-400 hover:text-slate-600" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <p className={`${
                            todo.completed 
                              ? 'line-through text-slate-500' 
                              : 'text-slate-800'
                          } transition-colors`}>
                            {todo.text}
                          </p>
                          <div className="flex items-center space-x-3 mt-1">
                            <Badge variant="outline" className={getPriorityColor(todo.priority)}>
                              {todo.priority}
                            </Badge>
                            <div className="flex items-center text-xs text-slate-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {todo.createdAt.toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="flex-shrink-0 p-2 text-slate-400 hover:text-red-600 transition-colors hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodoApp;