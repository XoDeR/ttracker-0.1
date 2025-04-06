import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTimeSpans } from '@/features/timespans/api/get-timespans';
import { TimeSpan } from '@/common/types';

export const TimeSpansList: React.FC = () => {
  const { data: timeSpans, isLoading, isError, error } = useQuery<TimeSpan[], Error>({
    queryKey: ['timespans'],
    queryFn: getTimeSpans,
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TimeSpans</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Start</th>
              <th className="border border-gray-300 px-4 py-2 text-left">End</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tags</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {timeSpans?.map((timeSpan) => (
              <tr key={timeSpan.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{timeSpan.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(timeSpan.start).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(timeSpan.end).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {timeSpan.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded-full mr-1"
                    >
                      {tag.key}
                    </span>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">{timeSpan.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};