import { configureStore } from '@reduxjs/toolkit';
import { ChaptersApi } from './features/Api/ChapterApi';
import { MangaApi } from './features/Api/MangaApi';
import { FileApi } from './features/Api/FaileApi';
import { UserApi } from './features/Api/UserApi';
import { CategoryApi } from './features/Api/CategoryApi';
import { SearchApi } from './features/Api/SearchApi';
import { RateApi } from './features/Api/RateApi';
import { CommentApi } from './features/Api/CommentApi';
import { LikeApi } from './features/Api/LikeApi';


const store = configureStore({
  reducer: {
    [FileApi.reducerPath]: FileApi.reducer,
    [ChaptersApi.reducerPath]: ChaptersApi.reducer,
    [MangaApi.reducerPath]: MangaApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [SearchApi.reducerPath]: SearchApi.reducer,
    [RateApi.reducerPath]: RateApi.reducer,
    [CommentApi.reducerPath]: CommentApi.reducer,
    [LikeApi.reducerPath]: LikeApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(ChaptersApi.middleware)
  .concat(MangaApi.middleware)
  .concat(FileApi.middleware)
  .concat(UserApi.middleware)
  .concat(CategoryApi.middleware)
  .concat(SearchApi.middleware)
  .concat(RateApi.middleware)
  .concat(CommentApi.middleware)
  .concat(LikeApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
