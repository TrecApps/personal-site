import { configureStore } from "@reduxjs/toolkit";
import { StylesService } from "@tc/tc-rc-general";
import type { StyleServiceAdjuster } from "@tc/tc-rc-general";

const styleAdjuster: StyleServiceAdjuster = (service: StylesService) => {
    let isDark: boolean = false;
    let savedStyle = localStorage.getItem("tc_style_color")
      
    let savedDarkMode = localStorage.getItem("tc_style_dark");
    isDark = 'true' == savedDarkMode;

    if(savedStyle){
        // ToDo - Add means of validating style here
        service.initialState.style = savedStyle;
    }
    service.initialState.isDark = isDark;
}

let stylesService: StylesService = StylesService.getCustomizedInstance(styleAdjuster);
// stylesService.prepSelection();

export const store = configureStore({
    reducer: {
        styles: stylesService.getReducer()
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;