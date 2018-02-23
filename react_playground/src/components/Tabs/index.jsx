import React from 'react'


const UED = {
    title: {
        margin: '20px 0 0',
        textAlign: 'center'
    },
    tooltipMargin: {
        margin: '30px 10px',
        verticalAlign: 'top',
        textAlign: 'left'
    }
}
/**
 * Tabs组件
 *
没有这个的话不能用...解构 babel-preset-stage-3

使用如下:
import {
    Tabs,
    TabList,
    Tab,
    TabPannels,
    TabPannel
} from '../../common/Tabs'

const __UED = {
    title: {
        margin: '20px 0 0',
        textAlign: 'center'
    },
    tooltipMargin: {
        margin: '30px 10px',
        verticalAlign: 'top',
        textAlign: 'left'
    }
};
<div className="tooltip tooltip-table" style={UED.tooltipMargin}>
    <Tabs>
        <TabList>
            <Tab>去程</Tab>
            <Tab>返程</Tab>
            <Tab>多程</Tab>
        </TabList>
        <TabPannels>
            <TabPannel>
                <p>pannel 1</p>
            </TabPannel>

            <TabPannel>
                <p>pannel 2</p>
            </TabPannel>
            <TabPannel>
                <p>pannel 3</p>
            </TabPannel>
        </TabPannels>
    </Tabs>
</div>

 */


const TabList = ({...props}) => {
    const { activeIndex, className, tabListType } = props
    const children = React.Children.map(props.children, (child,index) => {
        return React.cloneElement(child, {
            isActive: index === activeIndex,
            onActivate: () => {
                props.onActiveTab(index)
            }
        })
    })

    return React.createElement(
        tabListType || 'div',
        { className: className || "tooltip-tab" },
        children
      )
}

const Tab = ({...props}) => {
    // const isDisable = false
    const { isActive, children, tabType, activeClassName, onActivate, className, disable } = props
    return React.createElement(
        tabType || 'a',
        {
            className: isActive ? ((className||'') + ' ' + (activeClassName || "current")) : disable ? ((className||'') + ' ' + "disable") :
            (className || ''),
            onClick: disable ? null : onActivate
        },
        children
      )
}

const TabPannels = ({...props}) => {
    const { activeIndex, className } = props
    const children = props.children
    return <div className={className||''}>{children[activeIndex]}</div>
}

const TabPannel = ({...props}) => {
    const {children, className, tabListType} = props
    return React.createElement(
        tabListType || 'div',
        { className: className||'' },
        children
      )
}

class Tabs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0
        }
    }

    render(){
        const children = React.Children.map(this.props.children, child => {
            if(child.type === TabPannels) {
                return React.cloneElement(child, {
                    activeIndex: this.state.activeIndex
                })
            } else if(child.type === TabList) {
                return React.cloneElement(child, {
                    activeIndex: this.state.activeIndex,
                    onActiveTab: activeIndex => {
                        this.setState({ activeIndex })
                    }
                })
            } else {
                return child
            }
        })
        return <div className={this.props.className || ''}>{children}</div>
    }
}

export {
    Tabs,
    TabList,
    Tab,
    TabPannels,
    TabPannel
}
