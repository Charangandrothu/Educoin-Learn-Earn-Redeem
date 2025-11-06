import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TaskModal from '../components/TaskModal';

const Tasks = () => {
  const { currentStudent, tasks, completeTask } = useApp();
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all'); // all, available, completed

  if (!currentStudent) return null;

  const availableTasks = tasks.filter(
    task => !currentStudent.TasksCompleted.includes(task.id)
  );

  const completedTasks = tasks.filter(
    task => currentStudent.TasksCompleted.includes(task.id)
  );

  const filteredTasks = filter === 'available' 
    ? availableTasks 
    : filter === 'completed' 
    ? completedTasks 
    : tasks;

  const handleStartTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCompleteTask = (taskId) => {
    if (completeTask(taskId)) {
      setShowModal(false);
      setSelectedTask(null);
    }
  };

  const getCoinIcon = (type) => {
    switch (type) {
      case 'Silver':
        return '🪙';
      case 'Gold':
        return '🥇';
      case 'Platinum':
        return '💎';
      default:
        return '🪙';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">📚 All Tasks</h1>
          
          {/* Filter Buttons */}
          <div className="flex space-x-3 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'all'
                  ? 'bg-school-blue text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'available'
                  ? 'bg-school-blue text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Available ({availableTasks.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'completed'
                  ? 'bg-school-blue text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Completed ({completedTasks.length})
            </button>
          </div>

          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {filter === 'available' 
                ? 'No available tasks at the moment.' 
                : filter === 'completed'
                ? 'You haven\'t completed any tasks yet.'
                : 'No tasks available.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => {
                const isCompleted = currentStudent.TasksCompleted.includes(task.id);
                return (
                  <div
                    key={task.id}
                    className={`border rounded-xl p-5 transition ${
                      isCompleted
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                      {isCompleted && <span className="text-2xl">✅</span>}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Type: {task.type}</span>
                      <span className="text-sm font-semibold text-school-blue">
                        +{task.rewardAmount} {getCoinIcon(task.rewardType)} {task.rewardType}
                      </span>
                    </div>
                    {!isCompleted && (
                      <button
                        onClick={() => handleStartTask(task)}
                        className="w-full bg-school-blue hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
                      >
                        Start Task
                      </button>
                    )}
                    {isCompleted && (
                      <div className="w-full bg-green-200 text-green-800 font-medium py-2 px-4 rounded-lg text-center">
                        Completed ✅
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showModal && selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setShowModal(false);
            setSelectedTask(null);
          }}
          onComplete={handleCompleteTask}
        />
      )}
    </div>
  );
};

export default Tasks;

