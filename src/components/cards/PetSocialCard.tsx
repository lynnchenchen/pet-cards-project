import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, HeartHandshake, X } from 'lucide-react';
import { useStore } from '../../store';

const MOCK_NEARBY_PETS = [
  {
    id: '1',
    name: '可可',
    type: '金毛',
    distance: '300m',
    tags: ['温顺亲人', '活泼好动'],
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cute%20golden%20retriever%20avatar%203d&image_size=square',
  },
  {
    id: '2',
    name: '奥利奥',
    type: '柯基',
    distance: '800m',
    tags: ['喜欢追球', '贪吃'],
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cute%20corgi%20avatar%203d&image_size=square',
  },
  {
    id: '3',
    name: '豆豆',
    type: '萨摩耶',
    distance: '1.2km',
    tags: ['会握手', '天使微笑'],
    image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cute%20samoyed%20avatar%203d&image_size=square',
  },
];

const PetSocialCard = () => {
  const { userProfile, locationData } = useStore();
  const [showNearby, setShowNearby] = useState(false);
  const [matchedPet, setMatchedPet] = useState<string | null>(null);

  // 场景：遛弯局 或 寻伴计划
  // 这里用随机或简单逻辑决定，或者可以做个切换
  const isEstrus = userProfile.inEstrus;

  const handleMatch = (id: string) => {
    setMatchedPet(id);
    setTimeout(() => {
      setMatchedPet(null);
      setShowNearby(false);
    }, 3000);
  };

  return (
    <div className="w-full h-full relative bg-emerald-50 flex flex-col items-center justify-center overflow-hidden">
      {/* 抖音右侧互动栏占位 */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-40">
        <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20" />
        <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20" />
        <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20" />
      </div>

      {/* 顶部场景信息 */}
      <div className="absolute top-24 left-4 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm z-10 text-emerald-800">
        <MapPin size={16} />
        <span className="text-sm font-bold">{locationData.city} · 附近狗狗</span>
      </div>

      {/* 主视觉 */}
      <motion.div 
        className="relative z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      >
        <img 
          src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cute%20puppy%20holding%20a%20leash%203d%20animation%20style&image_size=portrait_4_3" 
          alt="My Pet" 
          className="w-64 h-80 object-cover rounded-[32px] shadow-2xl border-4 border-white/80"
        />

        {/* 气泡弹窗 */}
        <div className="absolute -top-6 -right-8 bg-white px-4 py-3 rounded-2xl shadow-xl border-2 border-emerald-100 after:content-[''] after:absolute after:bottom-[-10px] after:left-6 after:border-t-[10px] after:border-t-emerald-100 after:border-l-[10px] after:border-l-transparent after:border-r-[10px] after:border-r-transparent">
          <p className="text-sm font-bold text-gray-800 max-w-[140px] leading-tight">
            {isEstrus ? '主人，我到了想找伴的年纪啦😳' : '主人，我好想找小伙伴一起遛弯呀！🦮'}
          </p>
        </div>
      </motion.div>

      {/* 行动按钮 */}
      <div className="absolute bottom-28 w-full px-8 z-20">
        <button 
          onClick={() => setShowNearby(true)}
          className="w-full bg-emerald-500 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-emerald-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <HeartHandshake />
          {isEstrus ? '帮它寻伴' : '找遛弯搭子'}
        </button>
      </div>

      {/* 附近列表浮层 */}
      <AnimatePresence>
        {showNearby && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="absolute bottom-0 w-full bg-white rounded-t-[32px] pt-6 pb-10 shadow-[0_-20px_40px_rgba(0,0,0,0.15)] z-50 flex flex-col"
          >
            <div className="flex justify-between items-center px-6 mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {isEstrus ? '附近适龄小伙伴' : '附近可约遛弯'}
              </h2>
              <button onClick={() => setShowNearby(false)} className="p-2 bg-gray-100 rounded-full active:scale-90">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* 横向滑动列表 */}
            <div className="w-full overflow-x-auto flex gap-4 px-6 pb-4 snap-x hide-scrollbar">
              {MOCK_NEARBY_PETS.map((pet) => (
                <div key={pet.id} className="min-w-[160px] bg-gray-50 rounded-2xl p-4 snap-center border border-gray-100 shadow-sm shrink-0">
                  <div className="relative mb-3">
                    <img src={pet.image} alt={pet.name} className="w-full aspect-square object-cover rounded-xl shadow-inner" />
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium">
                      {pet.distance}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg leading-tight">{pet.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{pet.type}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {pet.tags.map((tag, idx) => (
                      <span key={idx} className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleMatch(pet.id)}
                    className="w-full bg-gray-900 text-white font-bold py-2 rounded-xl text-sm active:scale-95 transition-transform"
                  >
                    {isEstrus ? '打招呼' : '约遛弯'}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 匹配成功弹窗 */}
      <AnimatePresence>
        {matchedPet && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 bg-white p-6 rounded-[32px] shadow-2xl z-[60] text-center border border-gray-100"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartHandshake size={40} className="text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">邀约已发送！</h3>
            <p className="text-gray-500 text-sm">
              已经通过私信给对方主人发送了软萌邀约，稍后注意查看消息哦～
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CSS 隐藏滚动条 */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PetSocialCard;
