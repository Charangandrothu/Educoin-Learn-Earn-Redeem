import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const Redeem = () => {
  const { currentStudent, redemptionOptions, redeemCoins } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [redeemMessage, setRedeemMessage] = useState('');

  if (!currentStudent) return null;

  const handleRedeem = (redemptionId) => {
    const redemption = redemptionOptions.find(r => r.id === redemptionId);
    if (!redemption) return;

    const { Silver, Gold, Platinum } = redemption.cost;

    // Check if student has enough coins
    if (
      currentStudent.Silver < Silver ||
      currentStudent.Gold < Gold ||
      currentStudent.Platinum < Platinum
    ) {
      setRedeemMessage('error');
      setShowConfirmation(redemptionId);
      setTimeout(() => {
        setShowConfirmation(null);
        setRedeemMessage('');
      }, 3000);
      return;
    }

    // Attempt redemption
    if (redeemCoins(redemptionId)) {
      setRedeemMessage('success');
      setShowConfirmation(redemptionId);
      setTimeout(() => {
        setShowConfirmation(null);
        setRedeemMessage('');
      }, 3000);
    }
  };

  const canAfford = (redemption) => {
    return (
      currentStudent.Silver >= redemption.cost.Silver &&
      currentStudent.Gold >= redemption.cost.Gold &&
      currentStudent.Platinum >= redemption.cost.Platinum
    );
  };

  const formatCost = (cost) => {
    const parts = [];
    if (cost.Silver > 0) parts.push(`${cost.Silver} 🪙 Silver`);
    if (cost.Gold > 0) parts.push(`${cost.Gold} 🥇 Gold`);
    if (cost.Platinum > 0) parts.push(`${cost.Platinum} 💎 Platinum`);
    return parts.join(' + ');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Current Balance */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">💰 Redeem Your Coins</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4">
              <p className="text-gray-600 text-sm mb-1">Silver Coins</p>
              <p className="text-3xl font-bold text-gray-800">{currentStudent.Silver}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-4">
              <p className="text-gray-600 text-sm mb-1">Gold Coins</p>
              <p className="text-3xl font-bold text-gray-800">{currentStudent.Gold}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4">
              <p className="text-gray-600 text-sm mb-1">Platinum Coins</p>
              <p className="text-3xl font-bold text-gray-800">{currentStudent.Platinum}</p>
            </div>
          </div>
        </div>

        {/* Redemption Options */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🎁 Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {redemptionOptions.map((redemption) => {
              const affordable = canAfford(redemption);
              const isConfirming = showConfirmation === redemption.id;

              return (
                <div
                  key={redemption.id}
                  className={`border-2 rounded-xl p-5 transition ${
                    affordable
                      ? 'border-green-300 bg-green-50 hover:shadow-lg'
                      : 'border-gray-200 bg-gray-50 opacity-75'
                  }`}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{redemption.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{redemption.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Cost:</p>
                    <p className="text-sm text-gray-600">{formatCost(redemption.cost)}</p>
                  </div>

                  {!affordable && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs mb-3">
                      Insufficient coins
                    </div>
                  )}

                  {isConfirming && redeemMessage === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm mb-3">
                      ✅ Redemption successful!
                    </div>
                  )}

                  {isConfirming && redeemMessage === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm mb-3">
                      ❌ Insufficient coins for this redemption
                    </div>
                  )}

                  <button
                    onClick={() => handleRedeem(redemption.id)}
                    disabled={!affordable || isConfirming}
                    className={`w-full font-medium py-3 px-4 rounded-lg transition ${
                      affordable
                        ? 'bg-school-blue hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isConfirming && redeemMessage === 'success'
                      ? 'Redeemed!'
                      : isConfirming && redeemMessage === 'error'
                      ? 'Insufficient Coins'
                      : 'Redeem Now'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Note:</strong> After redeeming, your coins will be deducted from your account. 
            You can collect your rewards from the school office. Keep this page for reference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Redeem;

