import HttpError from '@wasp/core/HttpError.js'

export const getEvents = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Event.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getRewards = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Reward.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getUser = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    include: { rewards: true }
  });

  if (!user) throw new HttpError(404, 'User not found');

  return user;
}