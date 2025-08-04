import { configureStore } from "@reduxjs/toolkit";
import graphSliceReducer from "./Graphs/graphsSlice";
import tablesSliceReducer from "./Tables/tablesSlice";

export const store = configureStore({
  reducer: {
    graphs: graphSliceReducer,
    tables: tablesSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
