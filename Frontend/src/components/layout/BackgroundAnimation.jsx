export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Animated gradient orbs */}
      <div 
        className="absolute w-96 h-96 bg-emerald-500 opacity-20 rounded-full blur-3xl top-20 left-10 animate-pulse"
      ></div>
      <div 
        className="absolute w-96 h-96 bg-teal-500 opacity-20 rounded-full blur-3xl bottom-20 right-10 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div 
        className="absolute w-64 h-64 bg-cyan-500 opacity-10 rounded-full blur-3xl"
        style={{ 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          animationDelay: '2s' 
        }}
      ></div>
      
      {/* Stars effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-30" style={{ top: '10%', left: '20%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-30" style={{ top: '20%', left: '80%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-30" style={{ top: '30%', left: '40%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-30" style={{ top: '40%', left: '60%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-30" style={{ top: '50%', left: '10%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-30" style={{ top: '60%', left: '90%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-30" style={{ top: '70%', left: '30%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-30" style={{ top: '80%', left: '70%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-30" style={{ top: '15%', left: '50%' }}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-30" style={{ top: '85%', left: '45%' }}></div>
      </div>
    </div>
  );
}
