const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="main-entry-point w-full h-screen flex flex-col items-center relative overflow-clip 
                 bg-gradient-to-b from-black via-[#402283] via-50% to-[#9f64da]"
    >
      {/* Noise Overlay */}
      <div
        className="absolute z-10 inset-0 pointer-events-none opacity-50 mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/noise-overlay.png')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      ></div>

      {/* Wrapper for Page Content */}
      <div className="wrapper w-full flex flex-col max-w-[1490px]  px-4 md:px-6 lg:px-[42px] z-50">
        {children}
      </div>
    </div>
  );
};

export default Layout;
