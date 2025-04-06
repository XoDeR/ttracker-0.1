import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTimeSpans } from '@/features/timespans/api/get-timespans';
import { TimeSpan } from '@/common/types';

export const TimeSpansList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: timeSpans, isLoading, isError, error } = useQuery<TimeSpan[], Error>({
    queryKey: ['timespans'],
    queryFn: getTimeSpans,
  });

  // Utility to generate numeric IDs
  const generateId = (): number => Math.floor(Date.now() / 1_000_000);

  // Mutation for adding a TimeSpan
  const addTimeSpanMutation = useMutation({
    mutationFn: async () => {
      const randomData: TimeSpan = {
        id: generateId(), // Random ID for now
        start: new Date(),
        end: new Date(new Date().getTime() + 3600000), // 1 hour later
        tags: [{ id: generateId(), key: 'random-tag', color: '#00f' }],
        note: 'Random note',
      };
      const response = await fetch('http://localhost:3001/timespans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(randomData),
      });
      if (!response.ok) {
        throw new Error('Failed to add TimeSpan');
      }
      return randomData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timespans'] }); // Refresh the list after adding
    },
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
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => addTimeSpanMutation.mutate()}
      >
        Add Random TimeSpan
      </button>
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