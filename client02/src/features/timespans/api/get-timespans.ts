import { TimeSpan } from "@/common/types";

export const getTimeSpans = async (): Promise<TimeSpan[]> => {
  const response = await fetch('http://localhost:3001/timespans'); // Adjust the endpoint as needed
  if (!response.ok) {
    throw new Error('Failed to fetch TimeSpans');
  }
  const data: TimeSpan[] = await response.json();
  return data;
};