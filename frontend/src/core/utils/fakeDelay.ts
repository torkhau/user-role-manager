const DELAY = 3000;

export const fakeDelay = async () => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
};
