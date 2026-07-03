export const metadata = {
  title: "Kronos",
  description: "AI content generation system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
