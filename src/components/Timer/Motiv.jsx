import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "../../parts";

// --- KATALOG 10 UNIKALNYCH SCENARIUSZY ANIMACJI ---
const animations = [
  // 1. Hyper-Warp
  keyframes`0% { transform: perspective(1000px) translateZ(-1500px) rotateY(90deg); opacity: 0; } 100% { transform: perspective(1000px) translateZ(0) rotateY(0); opacity: 1; }`,
  // 2. Laser-Slice
  keyframes`0% { clip-path: inset(0 100% 0 0); transform: translateX(-100px); } 100% { clip-path: inset(0 0 0 0); transform: translateX(0); }`,
  // 3. Glitch-Overload
  keyframes`0% { transform: scale(2) skew(45deg); filter: invert(1) blur(20px); opacity: 0; } 50% { transform: scale(0.8) skew(-20deg); filter: invert(0) blur(5px); } 100% { transform: scale(1) skew(0); opacity: 1; }`,
  // 4. Ghost-In-The-Shell
  keyframes`0% { letter-spacing: -50px; opacity: 0; filter: blur(30px); } 100% { letter-spacing: 10px; opacity: 1; filter: blur(0); }`,
  // 5. Binary-Construct
  keyframes`0% { transform: translateY(100vh) scaleY(10); opacity: 0; } 100% { transform: translateY(0) scaleY(1); opacity: 1; }`,
  // 6. Cyber-Pulse
  keyframes`0% { transform: scale(0.1); box-shadow: 0 0 0 0 rgba(255,255,255,1); opacity: 0; } 100% { transform: scale(1); box-shadow: 0 0 100px 50px rgba(255,255,255,0); opacity: 1; }`,
  // 7. Data-Stream
  keyframes`0% { opacity: 0; transform: scale(1.5); filter: contrast(500%) brightness(5); } 100% { opacity: 1; transform: scale(1); filter: contrast(100%) brightness(1); }`,
  // 8. Matrix-Drop
  keyframes`0% { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); } 100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }`,
  // 9. Neon-Flicker
  keyframes`0%, 10%, 20%, 50%, 100% { opacity: 1; } 5%, 15%, 25% { opacity: 0; transform: scale(1.05); }`,
  // 10. Dimension-Shift
  keyframes`0% { transform: rotateX(90deg) scale(0.5); opacity: 0; } 100% { transform: rotateX(0) scale(1); opacity: 1; }`,
];

// --- HELPER DO GENEROWANIA LOSOWOŚCI (POZA KOMPONENTEM) ---
const generateCyberConfig = (colors) => ({
  animIndex: Math.floor(Math.random() * animations.length),
  color: colors[Math.floor(Math.random() * colors.length)],
  glow: Math.floor(Math.random() * 60 + 20),
  blur: Math.floor(Math.random() * 15 + 5),
  speed: (Math.random() * 0.8 + 0.3).toFixed(2),
  rotation: Math.floor(Math.random() * 10 - 5),
  particles: Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 3 + 1,
    d: Math.random() * 5 + 2,
  })),
});

// --- STYLED COMPONENTS ---

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: radial-gradient(circle at center, #0a0a0c 0%, #000 100%);
  backdrop-filter: blur(${(props) => props.$blur}px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%),
      repeating-linear-gradient(
        90deg,
        rgba(255, 0, 0, 0.03),
        rgba(0, 255, 0, 0.01),
        rgba(0, 0, 255, 0.03) 3px
      );
    background-size: 100% 4px, 3px 100%;
    pointer-events: none;
  }
`;

const Particle = styled.div`
  position: absolute;
  left: ${(props) => props.$x}%;
  top: ${(props) => props.$y}%;
  width: ${(props) => props.$s}px;
  height: ${(props) => props.$s}px;
  background: #fff;
  box-shadow: 0 0 10px #fff;
  border-radius: 50%;
  animation: ${keyframes`0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 1; transform: scale(2); }`}
    ${(props) => props.$d}s infinite;
`;

const Content = styled.div`
  position: relative;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  transform: rotate(${(props) => props.$rotation}deg);
  animation: ${(props) => animations[props.$animIndex]}
    ${(props) => props.$speed}s cubic-bezier(0.19, 1, 0.22, 1) forwards;
`;

const Message = styled.h2`
  color: #fff;
  font-size: clamp(2.5rem, 8vw, 8rem);
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  margin: 0;
  text-shadow: 0 0 ${(props) => props.$glow}px ${(props) => props.$color},
    0 0 ${(props) => props.$glow / 2}px ${(props) => props.$color};
  filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.8));
`;

const CyberButton = styled(Button)`
  margin-top: 50px;
  padding: 25px 60px;
  font-size: 1.5rem;
  font-weight: 900;
  background: transparent;
  border: 4px solid #fff;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 10px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    background: #fff;
    color: #000;
    box-shadow: 0 0 50px #fff;
    transform: scale(1.1) skew(-5deg);
  }
`;

// --- KOMPONENT GŁÓWNY ---

const Motiv = ({ text }) => {
  const [lastText, setLastText] = useState(text);
  const [isClosed, setIsClosed] = useState(false);
  // Inicjalizacja konfiguracji (tylko raz na zmianę tekstu)
  const [config, setConfig] = useState(() =>
    generateCyberConfig(["#ffb703", "#4361ee", "#f72585", "#4cc9f0"])
  );

  // "Adjusting state while rendering" - oficjalny wzorzec Reacta zamiast useEffect
  if (text !== lastText) {
    setLastText(text);
    setIsClosed(false);
    setConfig(
      generateCyberConfig([
        "#ffb703",
        "#4361ee",
        "#f72585",
        "#4cc9f0",
        "#7209b7",
        "#00ff41",
      ])
    );
  }

  const handleClose = () => setIsClosed(true);

  if (isClosed || !text || text.length === 0) return null;

  return (
    <>
      <Overlay $blur={config.blur} onClick={handleClose}>
        {config.particles.map((p) => (
          <Particle key={p.id} $x={p.x} $y={p.y} $s={p.s} $d={p.d} />
        ))}
        <Content
          $animIndex={config.animIndex}
          $speed={config.speed}
          $rotation={config.rotation}
        >
          <Message $color={config.color} $glow={config.glow}>
            {text}
          </Message>
          <CyberButton onClick={handleClose}>Destroy Limits</CyberButton>
        </Content>
      </Overlay>
    </>
  );
};

export default Motiv;
