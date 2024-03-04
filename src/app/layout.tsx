import React from 'react';
import { Container, Footer, Header } from '@/components';
import './globals.scss';

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const metadata = {
  title: {
    default: "Harry's Code and Bugs",
    template: "%s | Harry's Code and Bugs",
  },
};

function RootLayout({ children }: LayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
export default RootLayout;
