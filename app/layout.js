import './globals.css';

export const metadata = {
  title: 'AI Chatbot',
  description: 'Next.js AI chatbot with MongoDB-backed chat history'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
