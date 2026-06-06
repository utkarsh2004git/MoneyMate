export const addThousandsSeparator = (num) => {
  return Number(num).toLocaleString("en-IN");
};

export const prepareIncomeLineChartData = (transactions = []) => {
  const grouped = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date || transaction.createdAt);

    if (isNaN(date.getTime())) return;

    const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: dateKey,
        totalAmount: 0,
        items: [],
      };
    }

    grouped[dateKey].totalAmount += Number(transaction.amount || 0);
    grouped[dateKey].items.push(transaction);
  });

  return Object.values(grouped)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => ({
      ...item,
      month: formatDayMonth(item.date),
    }));
};

const formatDayMonth = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month}`;
};