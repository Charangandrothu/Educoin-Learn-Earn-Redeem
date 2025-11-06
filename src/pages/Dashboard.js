import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TaskModal from '../components/TaskModal';

const Dashboard = () => {
  const { currentStudent, tasks, completeTask } = useApp();
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  if (!currentStudent) return null;

  const availableTasks = tasks.filter(
    task => !currentStudent.TasksCompleted.includes(task.id)
  );

  const completedTasks = tasks.filter(
    task => currentStudent.TasksCompleted.includes(task.id)
  );

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

  const totalTasksCompleted = currentStudent.TasksCompleted.length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (totalTasksCompleted / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Student Info and Coins */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome, {currentStudent.Name}! 👋
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Silver Coins</p>
                <p className="text-2xl font-bold text-gray-800">{currentStudent.Silver}</p>
              </div>
              <span className="text-4xl">🪙</span>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Gold Coins</p>
                <p className="text-2xl font-bold text-gray-800">{currentStudent.Gold}</p>
              </div>
              <span className="text-4xl">🥇</span>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Platinum Coins</p>
                <p className="text-2xl font-bold text-gray-800">{currentStudent.Platinum}</p>
              </div>
              <span className="text-4xl">💎</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Tasks Completed</span>
              <span className="text-sm font-medium text-gray-700">
                {totalTasksCompleted} / {totalTasks}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-school-blue h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Available Tasks Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Available Tasks</h2>
          {availableTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No available tasks at the moment. Check back later!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableTasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Type: {task.type}</span>
                    <span className="text-sm font-semibold text-school-blue">
                      +{task.rewardAmount} {getCoinIcon(task.rewardType)} {task.rewardType}
                    </span>
                  </div>
                  <button
                    onClick={() => handleStartTask(task)}
                    className="w-full mt-4 bg-school-blue hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    Start Task
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tasks Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">✅ Completed Tasks</h2>
          {completedTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">You haven't completed any tasks yet. Start earning coins!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-green-200 bg-green-50 rounded-xl p-5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                    <span className="text-2xl">✅</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Type: {task.type}</span>
                    <span className="text-sm font-semibold text-green-600">
                      Earned: +{task.rewardAmount} {getCoinIcon(task.rewardType)} {task.rewardType}
                    </span>
                  </div>
                </div>
              ))}
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

export default Dashboard;

