import { DELAY } from '../const';

export const fakeDelay = async () => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
};
