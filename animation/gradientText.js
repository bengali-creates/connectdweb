import "./GradientText.css";

export default function GradientText({
  children,
  className = "",
  colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
  animationSpeed = 8,
  showBorder = false
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div className={`animated-gradient-text `}>
      {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}
      <div className={`text-content ${className}`} style={gradientStyle}>{children}</div>
    </div>
  );
}
