export default function Loading() {
  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2.5rem 2rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes barGrow {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes particleFloat {
          0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(-60px) translateX(var(--dx)); opacity: 0; }
        }
        .loading-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #7c3aed;
          animation: particleFloat 3s ease-in infinite;
        }
        .loading-bar-fill {
          height: 100%;
          background: linear-gradient(to right, #4c1d95, #7c3aed, #a78bfa);
          border-radius: 99px;
          animation: barGrow 6s linear infinite;
        }
        .loading-text {
          font-size: 13px;
          color: #7c3aed;
          letter-spacing: 0.12em;
          animation: fadeIn 0.6s ease both, glowPulse 2s ease infinite 0.6s;
        }
      `}</style>

      <div className="loading-particle" style={{ left: "10%", bottom: "30%", ["--dx" as string]: "12px", animationDelay: "0s" }} />
      <div className="loading-particle" style={{ left: "25%", bottom: "25%", ["--dx" as string]: "-8px", animationDelay: "0.6s" }} />
      <div className="loading-particle" style={{ left: "45%", bottom: "20%", ["--dx" as string]: "6px",  animationDelay: "1.2s" }} />
      <div className="loading-particle" style={{ left: "65%", bottom: "28%", ["--dx" as string]: "-10px", animationDelay: "0.3s" }} />
      <div className="loading-particle" style={{ left: "80%", bottom: "22%", ["--dx" as string]: "8px",  animationDelay: "0.9s" }} />
      <div className="loading-particle" style={{ left: "55%", bottom: "35%", ["--dx" as string]: "-6px", animationDelay: "1.8s" }} />
      <div className="loading-particle" style={{ left: "35%", bottom: "40%", ["--dx" as string]: "14px", animationDelay: "2.4s" }} />

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          height: "2px",
          background: "#1a1a2e",
          borderRadius: "99px",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}
      >
        <div className="loading-bar-fill" />
      </div>

      <p className="loading-text">Loading</p>
    </div>
  );
}
