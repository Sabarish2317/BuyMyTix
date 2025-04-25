export const dateFormatter = (data: string) => {
  const formattedDate = new Date(data).toLocaleString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
  return formattedDate;
};
