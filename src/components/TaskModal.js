import React from 'react';

const TaskModal = ({ task, onClose, onComplete }) => {
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

  const handleComplete = () => {
    onComplete(task.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-1">Description</h3>
              <p className="text-gray-700">{task.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Task Type</h3>
                <span className="inline-block bg-school-light-blue text-school-blue px-3 py-1 rounded-full text-sm font-medium">
                  {task.type}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Reward</h3>
                <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  +{task.rewardAmount} {getCoinIcon(task.rewardType)} {task.rewardType} Coins
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800">
                <strong>Instructions:</strong> Complete this task as described above. Once you've finished, click the button below to mark it as completed and earn your coins!
              </p>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 bg-school-blue hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg"
            >
              ✅ Mark as Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

