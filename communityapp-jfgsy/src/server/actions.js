import HttpError from '@wasp/core/HttpError.js'

export const createEvent = async (arg, context) => {
  if (!context.user) { throw new HttpError(401) };

  const event = await context.entities.Event.create({
    data: {
      title: arg.title,
      description: arg.description,
      date: arg.date,
      location: arg.location,
      user: { connect: { id: context.user.id } }
    }
  });

  return event;
}

export const createReward = async (arg, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Reward.create({
    data: {
      title: arg.title,
      description: arg.description,
      pointsRequired: arg.pointsRequired,
      userId: context.user.id
    }
  })
}

export const redeemReward = async (arg, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { id } = arg;

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    include: { rewards: true }
  });

  const reward = user.rewards.find((r) => r.id === id);
  if (!reward) { throw new HttpError(404, 'Reward not found') };

  if (user.points < reward.pointsRequired) { throw new HttpError(403, 'Not enough points to redeem reward') };

  // Implement the logic to redeem the reward

  return reward;
}