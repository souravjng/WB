// app/layout.js
import './globals.css';
import { Providers } from './Providers';

export const metadata = {
  title: 'My E-commerce Site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
