## 1. 架构设计
```mermaid
graph TD
    subgraph Frontend["前端层 (React)"]
        A["频道入口容器 (Header)"]
        B["竖版信息流组件 (Swiper)"]
        C["AI卡片渲染引擎"]
        D["场景触发器 (时间/LBS检测)"]
    end
    subgraph Cards["卡片组件库"]
        E["档案引导卡 (交互动画)"]
        F["社交卡 (横滑匹配列表)"]
        G["商业化外卖卡 (时段触发+状态)"]
    end
    subgraph State["状态管理 (Zustand/Context)"]
        H["用户档案 Store"]
        I["位置/时间 Store"]
    end
    
    A --> B
    B --> C
    C --> E
    C --> F
    C --> G
    C --> D
    E --> H
    F --> H
    F --> I
    G --> I
```

## 2. 技术栈说明
- **前端框架**：React@18 + Vite
- **样式方案**：Tailwind CSS@3 + Framer Motion（用于处理复杂的卡片入场及微交互动效）
- **手势与滑动**：Swiper.js 或 react-use-gesture（实现抖音上下滑分页吸附效果）
- **图标与插画**：Lucide React + Webp动画/CSS动画（模拟Q版萌宠）

## 3. 路由定义
| 路由 | 用途 |
|------|------|
| `/` | 抖音主界面模拟（含顶部导航栏，展示「推荐/同城/萌宠」） |
| `/channel/pets` | 萌宠频道页（全屏竖版信息流核心页面） |

## 4. API 定义 (Mock 数据层)
由于本项目重点在前端页面交互与视觉复原，不依赖后端，数据层采用前端 Mock：

```typescript
// 用户档案
interface UserProfile {
  hasPet: boolean;
  petType?: string; // e.g. 'dog', 'cat'
  petName?: string;
  petAge?: number;
  inEstrus?: boolean; // 发情期
}

// 附近宠物
interface NearbyPet {
  id: string;
  name: string;
  type: string;
  distance: string;
  tags: string[]; // e.g. ['温顺亲人', '活泼好动']
  image: string;
}
```

## 5. 组件层级图
```mermaid
graph TD
    A["App (路由与上下文)"] --> B["TikTokLayout (抖音外壳)"]
    B --> C["TopNavigation (顶部频道栏)"]
    B --> D["FeedContainer (全屏滑动容器)"]
    D --> E["CardWrapper (卡片外层/右侧互动按钮)"]
    E --> F["PetProfileCard (初遇计划)"]
    E --> G["PetSocialCard (遛弯局/寻伴)"]
    E --> H["PetTakeoutCard (催饭记)"]
    
    F --> I["ActionButtons (指令按钮)"]
    F --> J["FormModal (档案表单)"]
    
    G --> K["NearbyList (横滑列表)"]
    G --> L["MatchModal (邀约弹窗)"]
    
    H --> M["TimeChecker (时间检测)"]
    H --> N["CouponOverlay (外卖券浮层)"]
```
