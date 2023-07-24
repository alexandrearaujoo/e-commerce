import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return <section className="mx-auto max-w-7xl">{children}</section>;
};

export default Container;
