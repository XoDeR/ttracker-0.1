import * as React from 'react';

interface PageProps {
  children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  );
};