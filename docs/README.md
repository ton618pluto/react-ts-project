# 小慕问卷 - 低代码问卷平台

一个类似问卷星的低代码问卷平台前端项目，支持问卷创建、编辑、发布和数据统计。

## 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 状态管理 | Redux Toolkit + redux-undo（撤销/重做） |
| UI 库 | Ant Design 6 |
| 路由 | React Router 7 |
| 拖拽 | @dnd-kit |
| 图表 | Recharts |
| Hooks | ahooks |
| 样式 | Sass + styled-components |
| HTTP | Axios + MockJS |

## 项目结构

```
src/
├── components/               # 公共组件
│   ├── DragSortable/         # 拖拽排序组件
│   └── questionComponents/   # 问卷原子组件
│       ├── QuestionTitle/    # 标题组件
│       ├── QuestionInput/    # 文本输入组件
│       ├── QuestionTextarea/  # 多行文本组件
│       ├── QuestionRadio/     # 单选组件
│       ├── QuestionCheckbox/  # 多选组件
│       ├── QuestionParagraph/ # 段落组件
│       └── QuestionInfo/      # 信息组件
├── hooks/                    # 自定义 Hooks
├── layouts/                  # 布局组件
├── pages/                    # 页面
│   ├── Home.tsx              # 首页
│   ├── Login.tsx             # 登录
│   ├── Register.tsx          # 注册
│   ├── manage/               # 管理模块
│   │   ├── list.tsx          # 问卷列表
│   │   ├── Star.tsx          # 收藏
│   │   └── Trash.tsx          # 回收站
│   └── question/             # 问卷模块
│       ├── Edit/             # 问卷编辑
│       │   ├── EditCanvas.tsx    # 编辑画布
│       │   ├── LeftPanel.tsx     # 左侧组件库
│       │   ├── RightPanel.tsx    # 右侧属性面板
│       │   └── EditHeader.tsx     # 编辑页头部
│       └── Stat/             # 问卷统计
│           ├── ComponentList.tsx  # 组件列表
│           ├── PageStat.tsx       # 页面统计
│           └── ChartStat.tsx      # 图表统计
├── router/                   # 路由配置
├── services/                  # API 服务层
├── store/                     # Redux Store
│   └── modules/
│       ├── componentsReducer.ts   # 组件状态管理
│       ├── pageInfoReducer.ts     # 页面信息管理
│       └── userReducer.ts         # 用户状态管理
├── types/                     # TypeScript 类型定义
└── utils/                     # 工具函数
```

## 问卷组件

平台提供 7 种问卷原子组件，分为三组：

### 文本显示
- **QuestionTitle** - 标题组件（支持 H1/H2/H3 级别）
- **QuestionParagraph** - 段落文本
- **QuestionInfo** - 问卷信息（标题 + 描述）

### 用户输入
- **QuestionInput** - 单行文本输入
- **QuestionTextarea** - 多行文本输入

### 用户选择
- **QuestionRadio** - 单选框
- **QuestionCheckbox** - 多选框

每种组件包含：
- `Component` - 渲染组件
- `PropComponent` - 属性配置面板组件
- `StatComponent` - 统计展示组件
- `defaultProps` - 默认属性

## 核心功能

### 1. 问卷编辑
- 左侧组件库拖拽到画布添加组件
- 画布组件支持拖拽排序
- 点击画布组件选中，显示右侧属性面板
- 快捷键支持（撤销 Ctrl+Z / 重做 Ctrl+Shift+Z）
- 组件锁定/隐藏控制

### 2. 问卷管理
- 问卷列表（创建、编辑、删除、复制、发布）
- 收藏问卷
- 回收站（软删除）

### 3. 数据统计
- 问卷发布状态检查
- 组件级统计（单选/多选图表）
- 页面级统计概览

## 状态管理

采用 Redux Toolkit 管理应用状态：

- **userInfo** - 用户登录信息
- **components** - 问卷组件列表（含 redux-undo 支持撤销/重做）
- **pageInfo** - 问卷页面信息（标题、描述等）

components 使用 `redux-undo` 实现撤销/重做，限制 20 步历史记录，但排除以下操作：
- 重置组件
- 切换选中组件
- 选择上一个/下一个组件

## 路由结构

```
/                       # 首页
/login                  # 登录
/register               # 注册
/manage/list            # 问卷列表
/manage/star            # 收藏
/manage/trash           # 回收站
/question/edit/:id      # 问卷编辑
/question/stat/:id      # 问卷统计
```

所有页面使用 React.lazy + Suspense 实现路由级代码分割。

## API 服务

| 模块 | 功能 |
|------|------|
| user.ts | 登录、注册、获取用户信息 |
| question.ts | 问卷 CRUD、复制、收藏、软删除 |
| stat.ts | 问卷统计数据 |
| ajax.ts | axios 实例封装 |

## 开发命令

```bash
npm start        # 启动开发服务器
npm run build    # 生产构建
npm test         # 运行测试
npm run lint     # ESLint 检查
npm run format   # Prettier 格式化
```

## License

MIT