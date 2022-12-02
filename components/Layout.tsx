import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}
const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title} · Jujurly</title>
      </Head>
      <div className="max-w-5xl mx-auto px-5">{children}</div>;
    </>
  );
};

export default Layout;
