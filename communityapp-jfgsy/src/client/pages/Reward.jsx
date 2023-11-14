import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getRewards from '@wasp/queries/getRewards';
import redeemReward from '@wasp/actions/redeemReward';

export function Reward() {
  const { rewardId } = useParams();
  const { data: rewards, isLoading, error } = useQuery(getRewards);
  const redeemRewardFn = useAction(redeemReward);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const reward = rewards.find((r) => r.id === rewardId);
  if (!reward) return 'Reward not found';

  const handleRedeemReward = () => {
    redeemRewardFn({ id: reward.id });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>{reward.title}</h1>
      <p>{reward.description}</p>
      <p>Points Required: {reward.pointsRequired}</p>
      <button
        onClick={handleRedeemReward}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2'
      >
        Redeem Reward
      </button>
    </div>
  );
}