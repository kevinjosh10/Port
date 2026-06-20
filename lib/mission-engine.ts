export interface MissionData {
  currentDay: number;
  totalDays: number;
  percentageComplete: number;
  weeksCompleted: number;
  remainingDays: number;
  startDate: string;
  endDate: string;
}

export function getMissionData(): MissionData {
  const startDateStr = "2026-03-02T00:00:00Z";
  const totalDays = 1000;
  
  const startDate = new Date(startDateStr);
  const now = new Date();
  
  const diffTime = now.getTime() - startDate.getTime();
  let currentDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  if (currentDay < 1) currentDay = 1;
  if (currentDay > totalDays) currentDay = totalDays;
  
  const percentageComplete = parseFloat(((currentDay / totalDays) * 100).toFixed(1));
  const weeksCompleted = Math.floor(currentDay / 7);
  const remainingDays = totalDays - currentDay;
  
  const endDateObj = new Date(startDate);
  endDateObj.setDate(endDateObj.getDate() + totalDays);
  
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedEndDate = endDateObj.toLocaleDateString('en-US', options);
  const formattedStartDate = startDate.toLocaleDateString('en-US', options);

  return {
    currentDay,
    totalDays,
    percentageComplete,
    weeksCompleted,
    remainingDays,
    startDate: formattedStartDate,
    endDate: formattedEndDate
  };
}
