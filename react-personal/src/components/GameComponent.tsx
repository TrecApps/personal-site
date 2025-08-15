import { Container } from "react-bootstrap";
import React from "react";
import type { JSX } from "react";
import TrooperMatchComponent from "./games/TrooperMatchComponent";
import { TabComponent, type TabOption } from "@tc/tc-rc-general";

export default function GameComponent(){

    const [activeTab, setActiveTab] = React.useState<string>("tm");

    const [tabs, setTabs] = React.useState<TabOption[]>([
        {
        showTitle: "Trooper Match",
        actTitle: "tm"
        }
    ]);

    function getGame() : JSX.Element {
        if(activeTab == "tm") return <TrooperMatchComponent/>
        
        return <></>;
    }

    return (
        <Container>
            <TabComponent 
                tabs={tabs} 
                onTabSelectSet={setTabs} 
                onTabSelectStr={setActiveTab}
            >
                {getGame()}
            </TabComponent>
        </Container>
    )
}