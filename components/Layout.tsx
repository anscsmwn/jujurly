import React from 'react';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <div className="max-w-5xl mx-auto px-5">{children}</div>;
};

export default Layout;
