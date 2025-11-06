import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const Admin = () => {
  const { students, tasks, redemptions, addTask, updateTask, deleteTask, addStudent, updateStudent, deleteStudent, getLeaderboard } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    type: 'Reading',
    rewardType: 'Silver',
    rewardAmount: 5
  });

  const [studentForm, setStudentForm] = useState({
    RollNo: '',
    Name: '',
    Password: ''
  });

  const leaderboard = getLeaderboard();

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(editingTask.id, taskForm);
      setEditingTask(null);
    } else {
      addTask(taskForm);
    }
    setTaskForm({
      title: '',
      description: '',
      type: 'Reading',
      rewardType: 'Silver',
      rewardAmount: 5
    });
    setShowTaskForm(false);
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudent(editingStudent.RollNo, studentForm);
      setEditingStudent(null);
    } else {
      addStudent(studentForm);
    }
    setStudentForm({
      RollNo: '',
      Name: '',
      Password: ''
    });
    setShowStudentForm(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      type: task.type,
      rewardType: task.rewardType,
      rewardAmount: task.rewardAmount
    });
    setShowTaskForm(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({
      RollNo: student.RollNo,
      Name: student.Name,
      Password: student.Password
    });
    setShowStudentForm(true);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">👨‍🏫 Admin Panel</h1>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            {['dashboard', 'students', 'tasks', 'redemptions', 'leaderboard'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition ${
                  activeTab === tab
                    ? 'border-b-2 border-school-blue text-school-blue'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Students</h3>
              <p className="text-4xl font-bold text-school-blue">{students.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Tasks</h3>
              <p className="text-4xl font-bold text-school-blue">{tasks.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Redemptions</h3>
              <p className="text-4xl font-bold text-school-blue">{redemptions.length}</p>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Students</h2>
              <button
                onClick={() => {
                  setEditingStudent(null);
                  setStudentForm({ RollNo: '', Name: '', Password: '' });
                  setShowStudentForm(true);
                }}
                className="bg-school-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                + Add Student
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Roll No</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Silver</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Gold</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Platinum</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tasks</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.RollNo} className="border-b border-gray-100">
                      <td className="py-3 px-4">{student.RollNo}</td>
                      <td className="py-3 px-4">{student.Name}</td>
                      <td className="py-3 px-4">🪙 {student.Silver}</td>
                      <td className="py-3 px-4">🥇 {student.Gold}</td>
                      <td className="py-3 px-4">💎 {student.Platinum}</td>
                      <td className="py-3 px-4">{student.TasksCompleted.length}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteStudent(student.RollNo)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
              <button
                onClick={() => {
                  setEditingTask(null);
                  setTaskForm({
                    title: '',
                    description: '',
                    type: 'Reading',
                    rewardType: 'Silver',
                    rewardAmount: 5
                  });
                  setShowTaskForm(true);
                }}
                className="bg-school-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                + Add Task
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <div key={task.id} className="border border-gray-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{task.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-500">{task.type}</span>
                    <span className="text-xs font-semibold text-school-blue">
                      +{task.rewardAmount} {task.rewardType}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="flex-1 bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex-1 bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Redemptions Tab */}
        {activeTab === 'redemptions' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Redemption History</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Roll No</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Reward</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {redemptions.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-500">
                        No redemptions yet
                      </td>
                    </tr>
                  ) : (
                    redemptions.map((redemption) => (
                      <tr key={redemption.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">{redemption.studentName}</td>
                        <td className="py-3 px-4">{redemption.studentRollNo}</td>
                        <td className="py-3 px-4">{redemption.redemptionTitle}</td>
                        <td className="py-3 px-4">
                          {new Date(redemption.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🏆 Top 10 Leaderboard</h2>
            <div className="space-y-4">
              {leaderboard.map((student, index) => (
                <div
                  key={student.RollNo}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-400' :
                      index === 1 ? 'bg-gray-300' :
                      index === 2 ? 'bg-orange-400' :
                      'bg-school-blue'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{student.Name}</p>
                      <p className="text-sm text-gray-500">Roll No: {student.RollNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-school-blue text-lg">
                      {student.totalCoins} Total Coins
                    </p>
                    <p className="text-sm text-gray-600">
                      🪙 {student.Silver} | 🥇 {student.Gold} | 💎 {student.Platinum}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Task Form Modal */}
        {showTaskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h2>
              <form onSubmit={handleTaskSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={taskForm.type}
                    onChange={(e) => setTaskForm({ ...taskForm, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none"
                  >
                    <option value="Reading">Reading</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
                    <select
                      value={taskForm.rewardType}
                      onChange={(e) => setTaskForm({ ...taskForm, rewardType: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none"
                    >
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reward Amount</label>
                    <input
                      type="number"
                      value={taskForm.rewardAmount}
                      onChange={(e) => setTaskForm({ ...taskForm, rewardAmount: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none"
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTaskForm(false);
                      setEditingTask(null);
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-school-blue hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    {editingTask ? 'Update' : 'Add'} Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Student Form Modal */}
        {showStudentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h2>
              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={studentForm.RollNo}
                    onChange={(e) => setStudentForm({ ...studentForm, RollNo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none"
                    required
                    disabled={!!editingStudent}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={studentForm.Name}
                    onChange={(e) => setStudentForm({ ...studentForm, Name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={studentForm.Password}
                    onChange={(e) => setStudentForm({ ...studentForm, Password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-school-blue outline-none"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowStudentForm(false);
                      setEditingStudent(null);
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-school-blue hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    {editingStudent ? 'Update' : 'Add'} Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

