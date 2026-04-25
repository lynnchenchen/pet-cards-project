import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Users, PlusSquare, MessageSquare, User } from 'lucide-react';
import clsx from 'clsx';

const TikTokLayout = () => {
  return (
    <div className="w-full h-[100dvh] bg-black text-white flex flex-col relative overflow-hidden select-none">
      {/* Top Navigation */}
      <div className="absolute top-0 w-full z-50 flex items-center justify-between px-4 pt-12 pb-3 bg-gradient-to-b from-black/60 to-transparent">
        <div className="w-6" /> {/* Placeholder for left icon like Search */}
        <div className="flex gap-6 text-lg font-medium">
          <span className="text-white/60">同城</span>
          <span className="text-white/60">推荐</span>
          <span className="text-white font-bold relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-[2px] after:bg-white after:rounded-full">
            萌宠
          </span>
        </div>
        <div className="w-6" /> {/* Placeholder for right icon */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full relative overflow-hidden">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-black border-t border-white/10 pb-6">
        <div className="flex flex-col items-center gap-1 text-white cursor-pointer hover:opacity-80">
          <Home size={26} strokeWidth={2} />
          <span className="text-[10px] font-medium">首页</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-white/60 cursor-pointer hover:text-white transition-colors">
          <Users size={26} strokeWidth={2} />
          <span className="text-[10px] font-medium">朋友</span>
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:scale-95 transition-transform">
          <div className="w-[42px] h-[30px] bg-white text-black rounded-[8px] flex items-center justify-center font-bold text-xl relative before:absolute before:content-[''] before:w-[4px] before:h-full before:-left-1 before:bg-[#00f2fe] before:rounded-l-[8px] after:absolute after:content-[''] after:w-[4px] after:h-full after:-right-1 after:bg-[#fe0979] after:rounded-r-[8px]">
            +
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 text-white/60 cursor-pointer hover:text-white transition-colors">
          <MessageSquare size={26} strokeWidth={2} />
          <span className="text-[10px] font-medium">消息</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-white/60 cursor-pointer hover:text-white transition-colors">
          <User size={26} strokeWidth={2} />
          <span className="text-[10px] font-medium">我</span>
        </div>
      </div>
    </div>
  );
};

export default TikTokLayout;
