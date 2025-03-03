const ANIMATION_DURATION_DEFAULT = 0.8;
const MOVEMENT_DISTANCE_DEFAULT = 25;
const TIME_LIMIT_HOURS = 4;

export const getAnimationConstants = () => {
  const storedTimestamp = localStorage.getItem("userTimestamp");
  const currentTime = Date.now();

  console.log("Stored Timestamp:", storedTimestamp);
  console.log("Current Time:", currentTime);

  if (storedTimestamp) {
    const timeDifference =
      (currentTime - parseInt(storedTimestamp)) / (1000 * 60 * 60); // Convert ms to hours
    console.log("Time Difference (hrs):", timeDifference);

    if (timeDifference < TIME_LIMIT_HOURS) {
      console.log("Less than 4 hrs has passed - Disabling animation.");
      return { ANIMATION_DURATION: 0.15, MOVEMENT_DISTANCE: 10 };
    }
  } else {
    console.log("First-time visit - Storing timestamp.");
    localStorage.setItem("userTimestamp", currentTime.toString());
  }

  console.log("Animations Enabled.");
  return {
    ANIMATION_DURATION: ANIMATION_DURATION_DEFAULT,
    MOVEMENT_DISTANCE: MOVEMENT_DISTANCE_DEFAULT,
  };
};

// Ensure named exports remain the same
const { ANIMATION_DURATION, MOVEMENT_DISTANCE } = getAnimationConstants();

export { ANIMATION_DURATION, MOVEMENT_DISTANCE };
