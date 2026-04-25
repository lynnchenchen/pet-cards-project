import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Utensils, Tag } from 'lucide-react';
import { useStore } from '../../store';

const PetTakeoutCard = () => {
  const { timeContext } = useStore();
  const [showOptions, setShowOptions] = useState(false);
  const [responseType, setResponseType] = useState<'eaten' | 'not_eaten' | null>(null);
  const [showCoupon, setShowCoupon] = useState(false);

  // 获取当前小时数
  const hour = timeContext.getHours();
  // 是否在晚间外卖时段 (18:00 - 22:00) - 这里为了演示强制设为有效时间
  const isDinnerTime = true; // 实际逻辑可以是 hour >= 18 && hour <= 22;

  useEffect(() => {
    // 模拟卡片加载时的延迟出现
    const timer = setTimeout(() => setShowOptions(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEaten = () => {
    setResponseType('eaten');
  };

  const handleNotEaten = () => {
    setResponseType('not_eaten');
    setTimeout(() => {
      setShowCoupon(true);
    }, 1000);
  };

  return (
    <div className="w-full h-full relative bg-indigo-950 flex flex-col items-center justify-end overflow-hidden pb-32">
      {/* 抖音右侧互动栏占位 */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-40">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20" />
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20" />
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20" />
      </div>

      {/* 顶部场景信息 */}
      <div className="absolute top-24 left-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm z-10 text-indigo-200 border border-white/5">
        <Clock size={16} />
        <span className="text-sm font-medium">{hour}:00 · 晚餐时间</span>
      </div>

      {/* 主视觉：狗狗 */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 12 }}
      >
        {/* 动态文案气泡 */}
        <AnimatePresence mode="wait">
          {!responseType && (
            <motion.div 
              key="ask"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="bg-white/90 backdrop-blur-xl px-5 py-4 rounded-[24px] shadow-2xl border border-white/40 mb-6 relative max-w-[260px] text-center"
            >
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white/90 rotate-45 border-r border-b border-white/40" />
              <p className="text-base font-bold text-indigo-950 leading-relaxed relative z-10">
                主人主人👻，现在都<span className="text-orange-500 mx-1">{hour}点</span>啦，你是不是还没吃饭呀？我都替你饿啦！
              </p>
            </motion.div>
          )}
          
          {responseType === 'eaten' && (
            <motion.div 
              key="eaten"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 px-5 py-4 rounded-[24px] shadow-2xl border border-emerald-200 mb-6 relative max-w-[260px] text-center"
            >
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-emerald-50 rotate-45 border-r border-b border-emerald-200" />
              <p className="text-base font-bold text-emerald-800 leading-relaxed relative z-10">
                主人真棒！😋 记得也给我喂饭哦～
              </p>
            </motion.div>
          )}

          {responseType === 'not_eaten' && (
            <motion.div 
              key="not_eaten"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-orange-50 px-5 py-4 rounded-[24px] shadow-2xl border border-orange-200 mb-6 relative max-w-[260px] text-center"
            >
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-orange-50 rotate-45 border-r border-b border-orange-200" />
              <p className="text-base font-bold text-orange-800 leading-relaxed relative z-10">
                没关系！我帮主人找了外卖券，吃饱饱才有力气陪我玩呀～ 🥰
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 狗狗图片 (可以根据状态改变图片或动效) */}
        <motion.div
          animate={
            responseType === 'eaten' ? { rotate: [-5, 5, -5, 5, 0], y: -20 } :
            responseType === 'not_eaten' ? { scale: [1, 0.95, 1], y: 10 } :
            { y: [0, -8, 0] }
          }
          transition={{ duration: responseType ? 0.5 : 2, repeat: responseType ? 0 : Infinity }}
        >
          <img 
            src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cute%20hungry%20dog%20looking%20up%203d%20animation%20style&image_size=square" 
            alt="Hungry Pet" 
            className="w-56 h-56 object-cover rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)] border-4 border-indigo-800/50"
          />
        </motion.div>
      </motion.div>

      {/* 选项按钮 */}
      <AnimatePresence>
        {showOptions && !responseType && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="absolute bottom-28 w-full px-8 flex gap-4 z-20"
          >
            <button 
              onClick={handleEaten}
              className="flex-1 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold py-3.5 rounded-2xl active:scale-95 transition-transform"
            >
              已经吃啦 😋
            </button>
            <button 
              onClick={handleNotEaten}
              className="flex-1 bg-orange-500 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-orange-500/30 active:scale-95 transition-transform"
            >
              还没有呢 😔
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 外卖券浮层 */}
      <AnimatePresence>
        {showCoupon && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-0 w-full bg-gradient-to-b from-orange-50 to-white rounded-t-[40px] p-6 shadow-[0_-20px_60px_rgba(0,0,0,0.3)] z-50 flex flex-col items-center"
          >
            <div className="w-16 h-1.5 bg-orange-200 rounded-full mb-6" />
            
            {/* 券面设计 */}
            <div className="w-full bg-white rounded-3xl p-1 shadow-xl border border-orange-100 relative overflow-hidden mb-6">
              {/* 装饰元素 */}
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-100/50 to-transparent pointer-events-none" />
              
              <div className="flex bg-gradient-to-r from-orange-500 to-rose-500 rounded-[20px] text-white overflow-hidden relative">
                {/* 锯齿边缘模拟 */}
                <div className="absolute left-1/3 top-0 bottom-0 w-px border-l-2 border-dashed border-white/30" />
                
                <div className="w-1/3 p-4 flex flex-col items-center justify-center border-r border-dashed border-white/30 relative">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full" />
                  <span className="text-3xl font-black tracking-tighter">
                    <span className="text-sm mr-1">¥</span>12
                  </span>
                  <span className="text-[10px] opacity-80 mt-1">满50可用</span>
                </div>
                
                <div className="w-2/3 p-4 pl-6 flex flex-col justify-center relative">
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full" />
                  <div className="flex items-center gap-1 mb-1">
                    <Tag size={12} className="opacity-80" />
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                      毛孩子专属
                    </span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight mb-1">
                    抖音外卖夜宵红包
                  </h3>
                  <p className="text-xs opacity-70">
                    有效期至今日 23:59
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2">
              <Utensils size={20} />
              立即去点餐
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetTakeoutCard;
