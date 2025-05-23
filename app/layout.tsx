import "./globals.css"

export const metadata = {
  title: 'GitHub Users Dashboard',
  description: 'View GitHub users and their details interactively',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}