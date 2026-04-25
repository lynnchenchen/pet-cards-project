import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store';

const PetProfileCard = () => {
  const { setUserProfile } = useStore();
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [petImage, setPetImage] = useState('https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cute%20golden%20retriever%20puppy%203d%20animation%20style%20front%20view&image_size=portrait_4_3');
  
  // 模拟小狗动作
  const [animationState, setAnimationState] = useState({
    rotate: 0,
    y: 0,
    scale: 1,
  });

  const handleAction = (action: string) => {
    if (completedActions.includes(action)) return;

    const newCompleted = [...completedActions, action];
    setCompletedActions(newCompleted);

    // 触发不同的动画
    if (action === '坐下') {
      setAnimationState({ ...animationState, y: 30, scale: 0.95 });
    } else if (action === '握手') {
      setAnimationState({ ...animationState, rotate: 15 });
      setTimeout(() => setAnimationState({ ...animationState, rotate: 0 }), 500);
    } else if (action === '转圈') {
      setAnimationState({ ...animationState, rotate: 360 });
    }

    if (newCompleted.length === 3) {
      setTimeout(() => {
        setAnimationState({ rotate: 0, y: -20, scale: 1.1 }); // 欢呼跳跃
        setShowDialog(true);
      }, 800);
    }
  };

  const handleHasPet = (has: boolean) => {
    setShowDialog(false);
    if (has) {
      setShowForm(true);
    } else {
      setUserProfile({ hasPet: false });
      // 云养宠模式，可以加个提示
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setUserProfile({
      hasPet: true,
      petType: formData.get('type') as any,
      petName: formData.get('name') as string,
    });
    setShowForm(false);
    setShowPreview(true);
  };

  return (
    <div className="w-full h-full relative bg-amber-50 flex items-center justify-center overflow-hidden">
      {/* 抖音右侧互动栏占位 */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-40">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30" />
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30" />
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30" />
      </div>

      {/* 萌宠展示区 */}
      <motion.div 
        className="w-64 h-80 rounded-[32px] overflow-hidden shadow-2xl relative border-4 border-white/50"
        animate={animationState}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <img src={petImage} alt="pet" className="w-full h-full object-cover" />
        
        {/* 气泡弹窗 */}
        <AnimatePresence>
          {showDialog && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 bg-white p-4 rounded-2xl shadow-xl after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:border-t-[12px] after:border-t-white after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent"
            >
              <h3 className="font-bold text-gray-800 text-sm mb-3">主人，你家里有和我一样的毛孩子吗？🥰</h3>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleHasPet(true)}
                  className="bg-rose-400 text-white py-2 px-3 rounded-xl text-xs font-medium shadow-md active:scale-95 transition-transform"
                >
                  有！我家毛孩子在等我～
                </button>
                <button 
                  onClick={() => handleHasPet(false)}
                  className="bg-gray-100 text-gray-600 py-2 px-3 rounded-xl text-xs font-medium active:scale-95 transition-transform"
                >
                  暂时没有，但我超喜欢！
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 底部指令区 */}
      {!showDialog && !showForm && !showPreview && (
        <div className="absolute bottom-24 w-full px-8">
          <h2 className="text-center font-bold text-gray-800 mb-4 text-lg">毛孩子指令官</h2>
          <div className="flex justify-between gap-4">
            {['坐下', '握手', '转圈'].map((action) => (
              <button
                key={action}
                onClick={() => handleAction(action)}
                disabled={completedActions.includes(action)}
                className={`flex-1 py-3 rounded-2xl font-bold transition-all duration-300 ${
                  completedActions.includes(action) 
                    ? 'bg-emerald-400 text-white shadow-inner scale-95' 
                    : 'bg-white text-gray-700 shadow-lg active:scale-90 hover:shadow-xl'
                }`}
              >
                {completedActions.includes(action) ? '✓ ' + action : action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 填写档案表单 */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="absolute bottom-0 w-full bg-white rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50"
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
            <h2 className="text-xl font-bold text-gray-800 mb-6">建立专属档案</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">是个什么小可爱？</label>
                <div className="flex gap-4">
                  <label className="flex-1">
                    <input type="radio" name="type" value="dog" className="peer hidden" defaultChecked />
                    <div className="peer-checked:bg-rose-100 peer-checked:text-rose-600 peer-checked:border-rose-300 border-2 border-gray-100 py-3 rounded-xl text-center font-medium text-gray-500 transition-all">
                      🐶 修勾
                    </div>
                  </label>
                  <label className="flex-1">
                    <input type="radio" name="type" value="cat" className="peer hidden" />
                    <div className="peer-checked:bg-rose-100 peer-checked:text-rose-600 peer-checked:border-rose-300 border-2 border-gray-100 py-3 rounded-xl text-center font-medium text-gray-500 transition-all">
                      🐱 小猫
                    </div>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">它叫什么名字？</label>
                <input 
                  name="name" 
                  required
                  placeholder="输入宝贝昵称..." 
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-rose-400 outline-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-rose-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-rose-200 mt-4 active:scale-95 transition-transform"
              >
                生成专属卡片
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 专属卡片预览 */}
      <AnimatePresence>
        {showPreview && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowPreview(false)}
          >
            <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="h-48 bg-gradient-to-br from-rose-200 to-amber-100 relative">
                <img 
                  src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cute%20puppy%20avatar%203d%20render%20soft%20lighting&image_size=square" 
                  alt="avatar"
                  className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-1/2 -translate-x-1/2 object-cover shadow-lg"
                />
              </div>
              <div className="pt-16 pb-8 px-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">认证成功！</h3>
                <p className="text-gray-500 mb-6">专属毛孩子卡片已生成，快去频道里玩耍吧～</p>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl active:scale-95 transition-transform"
                >
                  继续刷抖音
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetProfileCard;
