// Create a helper function to check the user input
export const isEmpty = (string: string) => {
  if (string && string.trim() === "") return true;
  return false;
};