// i stole this tbh :') cuz i wanted something creative on the web not just adding a normal pic

export default function Cube() {
  return (
    <div className="h-48 flex items-center justify-center mb-8">
      <style>{`
        @keyframes rotateCube {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
        .cube {
          animation: rotateCube 8s infinite linear;
          transform-style: preserve-3d;
        }
        .cube-face {
          position: absolute;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.9;
          border: 2px solid rgba(0,0,0,0.1);
        }
        .face-1 { background: #2d7a8f; transform: translateZ(50px); }
        .face-2 { background: #5fa3b8; transform: rotateY(90deg) translateZ(50px); }
        .face-3 { background: #2d7a8f; transform: rotateY(180deg) translateZ(50px); }
        .face-4 { background: #5fa3b8; transform: rotateY(270deg) translateZ(50px); }
        .face-5 { background: #7eb8c8; transform: rotateX(90deg) translateZ(50px); }
        .face-6 { background: #9cc9d4; transform: rotateX(-90deg) translateZ(50px); }
      `}</style>
      <div className="cube" style={{ width: '100px', height: '100px', position: 'relative', margin: '20px' }}>
        <div className="cube-face face-1"></div>
        <div className="cube-face face-2"></div>
        <div className="cube-face face-3"></div>
        <div className="cube-face face-4"></div>
        <div className="cube-face face-5"></div>
        <div className="cube-face face-6"></div>
      </div>
    </div>
  );
}