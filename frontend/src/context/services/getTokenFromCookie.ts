const getTokenFromCookie = () => {
  const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];
  return token || null;
};

export default getTokenFromCookie