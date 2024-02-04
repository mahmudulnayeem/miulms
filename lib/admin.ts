export const isAdmin = (userId?: string | null) => {
  if (!userId) return false;
  const admins = [
    "user_2boRIGTOk2hEClw5goDnkaPpgVG",
    "user_2bo6X22IvGdlE218WHmXlgNo3Xk",
  ];
  return admins.includes(userId);
};
