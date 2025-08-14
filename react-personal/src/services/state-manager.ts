import { configureStore } from "@reduxjs/toolkit";
import { StylesService } from "@tc/tc-rc-general";

export const store = configureStore({
    reducer: {
        styles: StylesService.getInstance().getReducer()
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;