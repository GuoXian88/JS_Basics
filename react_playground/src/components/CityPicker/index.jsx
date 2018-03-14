import React from "react"
import './CityPicker.scss'

import { Tabs, TabList, Tab, TabPannels, TabPannel } from "../Tabs/index.jsx";
// import OutsideClickHandler from "../../../Base/OutsideClickHandler";

const generateTabs = function(nameStr, num) {
    let res = []
    for(let i=0; i<num; i++) {
        res.push(`${nameStr}${i+1}`)
    }
    return res
}

const generateTabPannels = function(nameStr, num, subnum) {
    let res = []
    for(let i=0; i<num; i++) {
        let subres = []
        for(let j=0; j<subnum; j++) {
            subres.push({ key:`${i}-${j}`, value:`${nameStr}${i+1}-${j+1}`})
        }
        res.push(subres)
    }
    return res
}

const TABS = generateTabs('TAB', 7)
const PANNELS = generateTabPannels('PANNEL', 7, 15)
const selectorStyle = { position: 'absolute', left: 0, top: 30 }

class CityPicker extends React.Component {

    render() {
        let tabs = TABS, pannels = PANNELS
        return <div
            className={
                "cflt-city-picker-selector" +
                ( true ? "" : " hide")
            }
            style={selectorStyle}
        >
            <i
                className="cflt-ico-close"
                // onClick={this.handleCityPickerHide}
            >
                &times;
            </i>
        <div className="hint">支持...</div>

        <Tabs className="city-picker-wrapper">
            <TabList
                className="city-picker-tabs"
                tabListType="ul"
            >
                {tabs.map((v, k) => (
                    <Tab
                        key={k}
                        tabType="li"
                        activeClassName="active"
                        // disable
                    >
                        {v}
                    </Tab>
                ))}
            </TabList>
            <TabPannels className="city-picker-body">
                {pannels.map((cv, ck) => (
                    <TabPannel
                        key={ck}
                        tabListType="ul"
                        className="cities"
                        hideClassName="hide"
                    >
                        {cv.map((v, k) => (
                            <li
                                key={k}
                                //onClick={this.selectCity(v)}
                            >
                                {v.value}
                            </li>
                        ))}
                    </TabPannel>
                ))}
            </TabPannels>
        </Tabs>
        </div>
    }
}

export default CityPicker
