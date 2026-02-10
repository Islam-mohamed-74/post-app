import { ReactNode } from "react";
import mountainBg from "@/assets/mountain-bg.jpg";

interface AppLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

const AppLayout = ({ children, showHeader = true }: AppLayoutProps) => {
  return (
    <div
      className="flex min-h-screen flex-col items-center bg-cover bg-center bg-fixed px-[20px] lg:px-[120px] py-4 gap-6"
      style={{ backgroundImage: `url(${mountainBg})` }}
    >
      {showHeader && (
        <header 
          className="flex w-full max-w-[1200px] h-[67px] flex-row justify-between items-center rounded-[16px] bg-white/50 backdrop-blur-[16px] pt-[16px] pb-[16px] pr-[24px] pl-[24px] border border-white/20 shadow-sm"
        >
          {/* Logo/Brand */}
          <span className="text-xl font-bold text-white tracking-tight">
            ELEVATE
          </span>

          {/* Task Title */}
          <span className="text-[18px] md:text-[22px] font-semibold text-white">
            Frontend Advanced Bootcamp Task
          </span>

          {/* Placeholder for balance */}
          <div className="hidden md:block w-[70px]" />
        </header>
      )}

      <main className="flex w-full max-w-[1200px] flex-1 flex-col">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;