import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* This line fixes everything instantly for hackathons */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}