// Inline style helpers (simple for initial mock-up)
const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
  fontSize: "3rem",
  margin: 0,
  color: "var(--foreground)",
};

const paragraphStyle: React.CSSProperties = {
  maxWidth: "600px",
  textAlign: "center",
  color: "var(--text-secondary)",
  marginTop: "1rem",
  marginBottom: "2rem",
  lineHeight: 1.6,
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "var(--foreground)",
  color: "var(--white)",
  padding: "0.75rem 1.5rem",
  borderRadius: "4px",
  textDecoration: "none",
  fontWeight: 600,
  transition: "all 0.2s ease",
};



export default function Home() {
  return (
    <main
      style={{
        fontFamily: "var(--font-opensans), 'Open Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem 1rem",
        backgroundColor: "var(--background)",
      }}>
      <h1 style={headingStyle}>Handcrafted Haven</h1>
      <p style={paragraphStyle}>
        Discover unique handcrafted items from passionate creators. Support
        sustainable craftsmanship and bring home one-of-a-kind treasures.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <a href="/products" style={buttonStyle}>
          Browse Products
        </a>
      </div>
    </main>
  );
}
