import Head from "next/head";

// Inline style helpers (simple for initial mock-up)
const headingStyle: React.CSSProperties = {
  fontFamily: "\"Playfair Display\", serif",
  fontSize: "3rem",
  margin: 0,
  color: "#3d3c38",
};

const paragraphStyle: React.CSSProperties = {
  maxWidth: "600px",
  textAlign: "center",
  color: "#615e55",
  marginTop: "1rem",
  marginBottom: "2rem",
  lineHeight: 1.6,
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#3d3c38",
  color: "#ffffff",
  padding: "0.75rem 1.5rem",
  borderRadius: "4px",
  textDecoration: "none",
  fontWeight: 600,
};

const outlineButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "transparent",
  color: "#3d3c38",
  border: "2px solid #3d3c38",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Handcrafted Haven</title>
        <meta
          name="description"
          content="Discover unique handmade treasures crafted by talented artisans."
        />
        {/* Google Fonts for Playfair Display & Open Sans */}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main
        style={{
          fontFamily: '"Open Sans", sans-serif',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem 1rem",
          backgroundColor: "#f9f7f4",
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
          <a href="/sell" style={outlineButtonStyle}>
            Become a Seller
          </a>
        </div>
      </main>
    </>
  );
}
