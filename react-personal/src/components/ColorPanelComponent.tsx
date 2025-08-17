import { type JSX } from "react";
import styles from "./ColorPanelComponent.module.css";

export interface ColorOption{
  colorStyle: string;
  styleName: string;
}

export type OnStringFunction = (value: string) => void;


export interface ColorPanelProps {
    colors: ColorOption[],
    onColorSelect: OnStringFunction
}

export default function ColorPanel({
    colors,
    onColorSelect
}: ColorPanelProps) {

    function getColorObjects(): JSX.Element[] {
        return colors.map((color: ColorOption) => {
            return (
                <div
                    key={color.styleName}
                    className={styles.colorButton}
                    style={{backgroundColor: color.colorStyle}}
                    onClick={() => onColorSelect(color.styleName)}
                ></div>
            );
        })
    }


    return (
        <div className={styles.colorPanel}>
            {getColorObjects()}
</div>
    )
}