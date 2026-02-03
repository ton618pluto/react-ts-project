import { configureStore } from '@reduxjs/toolkit'
import userInfoStore from './modules/userReducer'
import componentStore from './modules/componentsReducer'
import pageInfoStore from './modules/pageInfoReducer'
import undoable, { excludeAction } from 'redux-undo'
import {
  resetComponents,
  changeSelectedId,
  selectPreComponent,
  selectNextComponent,
} from './modules/componentsReducer'

// console.log(resetComponents.type, changeSelectedId.type)

const store = configureStore({
  reducer: {
    userInfo: userInfoStore,

    // 没有undo
    // components: componentStore,
    // 增加了undo
    components: undoable(componentStore, {
      limit: 20, // 最大撤销20步
      filter: excludeAction([
        // 'components/resetComponents',
        resetComponents.type,
        // 'components/changeSelectedId',
        changeSelectedId.type,
        // 'components/selectPreComponent',
        selectPreComponent.type,
        // 'components/selectNextComponent',
        selectNextComponent.type,
      ]),
    }),

    pageInfo: pageInfoStore,
  },
})

export default store

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
