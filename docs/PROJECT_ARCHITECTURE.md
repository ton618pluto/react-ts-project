# 问卷调查系统 - 项目架构文档

## 一、项目概述

这是一个**问卷调查/低代码平台**，支持问卷的创建、编辑、发布和统计分析。

## 二、技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | React 19 + TypeScript 4.9 |
| UI组件库 | Ant Design 6 |
| 状态管理 | Redux Toolkit + redux-undo |
| 路由 | React Router DOM 7 (Hash模式) |
| 图表 | recharts |
| 拖拽 | @dnd-kit |
| HTTP | axios |
| 样式 | sass + styled-components |

## 三、目录结构

```
src/
├── components/              # 通用组件
│   ├── questionComponents/  # 问卷组件库（7种）
│   └── DragSortable/        # 拖拽排序组件
├── hooks/                   # 自定义Hooks
├── layouts/                 # 布局组件
│   ├── MainLayout.tsx       # 主布局
│   ├── ManageLayout.tsx     # 管理页布局
│   └── QuestionLayout.tsx   # 编辑页布局
├── pages/                   # 页面组件
│   ├── Home.tsx             # 首页
│   ├── Login.tsx            # 登录
│   ├── Register.tsx         # 注册
│   ├── manage/              # 问卷管理
│   │   ├── list.tsx         # 问卷列表
│   │   ├── Star.tsx         # 星标问卷
│   │   └── Trash.tsx        # 回收站
│   └── question/            # 问卷模块
│       ├── Edit/            # 问卷编辑器
│       └── Stat/            # 问卷统计
├── router/                   # 路由配置
├── services/                 # API服务层
├── store/                    # 状态管理
│   └── modules/
│       ├── userReducer.ts          # 用户信息
│       ├── componentsReducer/     # 问卷组件（支持撤销）
│       └── pageInfoReducer.ts     # 页面信息
├── types/                    # 类型定义
└── utils/                    # 工具函数
```

## 四、核心功能模块

### 1. 用户模块
- 登录 / 注册功能
- 用户信息存储在 Redux

### 2. 问卷管理模块
- 问卷列表展示
- 星标收藏
- 回收站（软删除）

### 3. 问卷编辑器（核心亮点）
- **拖拽排序**：基于 @dnd-kit 实现
- **属性编辑**：选中组件后可修改属性
- **复制/粘贴**：支持组件复制粘贴
- **撤销/重做**：基于 redux-undo，限制20步
- **锁定/解锁**：防止误操作
- **显隐控制**：隐藏但保留组件

### 4. 问卷统计模块
- 图表展示（recharts）
- 二维码生成

## 五、状态管理

```typescript
// store/index.ts
const store = configureStore({
  reducer: {
    userInfo: userInfoStore,           // 用户信息
    components: undoable(componentStore, {
      limit: 20                       // 最大撤销20步
    }),                               // 问卷组件（支持撤销）
    pageInfo: pageInfoStore,          // 页面信息
  },
})
```

### Components Reducer 核心 Actions

| Action | 功能 |
|--------|------|
| `resetComponents` | 重置组件列表 |
| `changeSelectedId` | 切换选中组件 |
| `addComponent` | 添加组件 |
| `changeComponentProp` | 修改组件属性 |
| `deleteComponent` | 删除组件 |
| `changeComponentHidden` | 显隐控制 |
| `changeComponentLock` | 锁定/解锁 |
| `copiedComponent/pasteComponent` | 复制粘贴 |
| `moveComponentPosition` | 拖拽排序 |

## 六、路由设计

```typescript
// 使用 HashRouter 兼容部署
const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          { path: 'list', element: <List /> },
          { path: 'star', element: <Star /> },
          { path: 'trash', element: <Trash /> },
        ],
      },
    ],
  },
  {
    path: '/question',
    element: <QuestionLayout />,
    children: [
      { path: 'edit/:id', element: <Edit /> },
      { path: 'stat/:id', element: <Stat /> },
    ],
  },
])
```

### 路由懒加载
使用 `React.lazy()` + `Suspense` 实现代码分割，优化首屏加载。

## 七、问卷组件库设计

每种问卷组件包含4个文件：

| 文件 | 作用 |
|------|------|
| `index.tsx` | 组件渲染 |
| `default.ts` | 默认属性配置 |
| `PropComponent.tsx` | 属性编辑面板 |
| `StatComponent.tsx` | 统计面板 |

### 支持的组件
- `QuestionInput` - 单行输入
- `QuestionTextarea` - 多行输入
- `QuestionTitle` - 标题
- `QuestionParagraph` - 段落
- `QuestionInfo` - 信息展示
- `QuestionRadio` - 单选
- `QuestionCheckbox` - 多选

## 八、面试亮点总结（详细实现）

### 1. 低代码编辑器设计

**核心实现**：
- 组件注册：每个组件通过 `default.ts` 导出配置对象（ComponentConfType）
- 统一入口：`components/questionComponents/index.ts` 维护所有组件配置数组，提供 `getComponentConfByType(type)` 函数
- 动态渲染：EditCanvas 通过 `getComponentConfByType(type)` 获取组件并渲染

**关键代码**：
```typescript
// components/questionComponents/QuestionTitle/default.ts
const QuestionTitleConf: ComponentConfType = {
  title: '标题',
  type: 'questionTitle',
  Component: QuestionTitleComponent,
  PropComponent: TitlePropComponent,
  defaultProps: QuestionTitleDefault,
}

// components/questionComponents/index.ts - 统一入口
export const getComponentConfByType = (type: string) => {
  return componentConfList.find(item => item.type === type)
}

// pages/question/Edit/EditCanvas.tsx - 动态渲染
const componentConf = getComponentConfByType(type)
return <componentConf.Component {...props} />
```

**面试话术**：
> 问卷编辑器采用"配置化"设计思路。每个问卷组件都导出一个配置对象，包含渲染组件、属性编辑器、默认属性。我在 `questionComponents/index.ts` 维护一个配置数组，通过 `getComponentConfByType` 根据组件 type 动态获取并渲染。这种设计使得新增组件非常方便，只需创建组件文件并在 index.ts 导入即可。

---

### 2. 撤销/重做功能

**核心实现**：
- 使用 redux-undo 包装 componentsReducer
- 配置 `limit: 20` 限制最大撤销步数
- 使用 `excludeAction` 过滤不相关的 action

**关键代码**：
```typescript
// store/index.ts
import undoable, { excludeAction } from 'redux-undo'

const store = configureStore({
  reducer: {
    components: undoable(componentStore, {
      limit: 20,  // 最大撤销20步
      filter: excludeAction([
        resetComponents.type,      // 重置操作不撤销
        changeSelectedId.type,     // 选中状态不撤销
        selectPreComponent.type,   // 导航操作不撤销
        selectNextComponent.type,
      ]),
    }),
  },
})
```

**被过滤的 action**：
| Action | 作用 | 过滤原因 |
|--------|------|----------|
| resetComponents | 重置问卷 | 整体替换，不应纳入撤销 |
| changeSelectedId | 选中组件 | UI状态变化是瞬时的 |
| selectPreComponent | 上一个组件 | 导航操作是瞬时的 |
| selectNextComponent | 下一个组件 | 导航操作是瞬时的 |

**面试话术**：
> 编辑器支持撤销/重做，使用 redux-undo 实现。我用 undoable 包装了 componentsReducer，配置最多撤销20步。同时使用 excludeAction 过滤掉选中状态、导航操作等不相关的 action，只保留实际数据变更（添加/删除/修改组件）到撤销历史中。这样用户编辑问卷时可以放心尝试，随时可以撤销。

---

### 3. 拖拽排序实现

**核心实现**：
- 使用 @dnd-kit 库（SortableContext + useSortable）
- 提供 SortableContainer 和 SortableItem 封装组件
- 拖拽结束后 dispatch moveComponentPosition 更新 Redux

**关键代码**：
```typescript
// components/DragSortable/SortableContainer.tsx
const SortableContainer = ({ items, onDragEnd }) => {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } })
  )

  function handleDragEnd(event: DragEndEvent) {
    const oldIndex = items.findIndex(item => item.fe_id === active.id)
    const newIndex = items.findIndex(item => item.fe_id === over.id)
    onDragEnd(oldIndex, newIndex)
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

// pages/question/Edit/EditCanvas.tsx
function handleDragEnd(oldIndex: number, newIndex: number) {
  dispatch(moveComponentPosition({ oldIndex, newIndex }))
}
```

**面试话术**：
> 拖拽功能使用 @dnd-kit 实现，这是一个现代的 React 拖拽库。我封装了 SortableContainer 和 SortableItem 组件，在编辑器画布和图层面板都集成了拖拽功能。拖拽结束时触发 Redux 的 moveComponentPosition action 更新组件顺序。整个拖拽过程有过渡动画，体验比较流畅。

---

### 4. 组件化设计（可扩展）

**每种组件包含4个文件**：

| 文件 | 作用 |
|------|------|
| `index.tsx` | 画布渲染组件 |
| `default.ts` | 默认属性配置 |
| `PropComponent.tsx` | 属性编辑面板 |
| `StatComponent.tsx` | 统计面板（可选） |

**新增组件步骤**：
1. 在 `components/questionComponents/` 创建组件文件夹
2. 实现上述4个文件
3. 在 `questionComponents/index.ts` 导入配置

**面试话术**：
> 我设计了统一的组件规范，每种问卷组件都遵循相同的目录结构。组件通过 ComponentConfType 配置对象注册到系统，包含渲染组件、属性编辑器、默认属性。要新增一个问卷组件，只需要实现这几个文件并导入即可，不需要修改其他代码。这种设计保证了编辑器和统计页面都能动态渲染任意组件。

---

### 5. 性能优化：路由懒加载

**关键代码**：
```typescript
// router/index.tsx
const Home = React.lazy(() => import(/* webpackChunkName: "home" */ '../pages/Home'))
const Edit = React.lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/question/Edit'))

// 使用 Suspense 包装
<React.Suspense fallback={<div>Loading...</div>}>
  <Home />
</React.Suspense>
```

**面试话术**：
> 项目使用了 React.lazy + Suspense 实现路由懒加载，每个页面独立打包成 chunk。首屏只加载必要的代码，用户访问到对应路由时才加载该页面的 JS。这种代码分割策略可以显著减少首屏加载时间。

---

### 6. TypeScript 类型定义

**核心类型**：
```typescript
// types/questionTypes.ts
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
  StatComponent?: FC<QuestionStatPropsType>
}

export type ComponentInfoType = {
  fe_id: string
  title: string
  type: string
  isHidden: boolean
  isLocked: boolean
  props: ComponentPropsType
}
```

**面试话术**：
> 项目有完整的 TypeScript 类型定义。核心是 ComponentConfType 和 ComponentInfoType，分别描述组件配置信息和画布中的组件实例。props 使用泛型，每种组件有对应的 PropsType 定义。编辑器、组件库、统计页面都共享这些类型定义，保证了开发时的类型安全。

---

*此文档用于面试准备，帮助快速回答项目架构相关问题。*

## 附：面试快速回答模板

### 问题1：请介绍一下你做过的项目

> 我开发的是一个**问卷调查/低代码平台**，支持问卷的创建、编辑、发布和统计分析。核心技术栈是 React 19 + TypeScript + Redux Toolkit + Ant Design。

### 问题2：项目的整体架构是怎么样的？

> 项目采用典型的 React + Redux 架构。目录结构分为 components（组件）、pages（页面）、store（状态）、services（API）等模块。
>
> - **路由层**：Hash 路由 + 懒加载
> - **状态层**：Redux Toolkit 管理用户信息、问卷组件、页面信息，其中问卷组件使用 redux-undo 支持撤销/重做
> - **视图层**：Ant Design 组件库，7种问卷组件采用统一规范设计
>
> 核心亮点是**低代码编辑器**，通过"组件注册 + 动态渲染"的配置化设计，支持拖拽排序、属性编辑、复制粘贴等功能。

### 问题3：你觉得这个项目的亮点是什么？

> 我认为主要有以下几个亮点：
>
> 1. **低代码编辑器设计**：采用配置化思路，每个问卷组件导出配置对象，通过 `getComponentConfByType` 动态渲染。新增组件非常方便。
>
> 2. **撤销/重做功能**：使用 redux-undo 实现，限制20步，并且过滤掉了选中状态、导航操作等不相关的 action，只保留实际数据变更。
>
> 3. **拖拽排序**：使用 @dnd-kit 实现，封装了 SortableContainer 和 SortableItem 组件，在画布和图层面板都支持拖拽。
>
> 4. **性能优化**：路由懒加载，每个页面独立打包成 chunk，减少首屏加载时间。
>
> 5. **TypeScript**：有完整的类型定义，组件配置、props 等都有明确的类型约束。

### 问题4：状态管理是怎么设计的？

> 使用 Redux Toolkit，主要有三个 store 模块：
> - **userInfo**：用户登录信息
> - **components**：问卷组件列表，用 undoable 包装支持撤销/重做
> - **pageInfo**：页面标题、描述等基本信息
>
> components 是核心，包含 addComponent、changeComponentProp、deleteComponent、moveComponentPosition 等 action，支持组件的增删改和拖拽排序。

### 问题5：问卷组件是怎么设计的？

> 每种组件都遵循统一的目录结构，包含4个文件：index.tsx（渲染）、default.ts（默认属性）、PropComponent.tsx（属性编辑）、StatComponent.tsx（统计）。
>
> 所有组件通过 ComponentConfType 配置对象注册到系统，提供 `getComponentConfByType` 函数根据 type 动态获取组件。这种设计使得编辑器、属性面板、统计页面都能复用同一套组件逻辑，新增组件也非常方便。

### 问题6：如何实现撤销/重做的？

> 使用 redux-undo 库。用 undoable 包装 componentsReducer，配置最大撤销20步。同时使用 excludeAction 过滤掉 resetComponents（重置）、changeSelectedId（选中）、selectPreComponent/selectNextComponent（导航）等不相关的 action，这些是瞬时 UI 状态，不需要纳入撤销历史。实际的数据变更（添加/删除/修改组件）都会被记录，用户可以安心尝试各种编辑操作。

