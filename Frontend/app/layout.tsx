// Frontend/app/layout.tsx

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <h1>Layout Básico</h1>
        <div style={{ border: '2px solid red', padding: '1rem' }}>
          {children}
        </div>
      </body>
    </html>
  );
}