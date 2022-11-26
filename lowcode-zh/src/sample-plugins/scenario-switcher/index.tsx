import React from 'react';
import {
  ILowCodePluginContext,
} from '@alilc/lowcode-engine';
import { Select, Dropdown, Menu } from '@alifd/next';
import scenarios from '../../universal/scenarios.json';
const { Option } = Select;

type Scenario = {
  name: string;
  title: string;
  urls: Array<{
    key: string;
    value: string;
  }>
}

const getCurrentScenarioName = (): string => {
  const list = location.pathname.split('/');
  return list[list.length - 1].replace('.html', '') || 'index';
}

const getCurrentScenarioUrls = () => {
  return scenarios.filter((scenario: Scenario) => scenario.name === getCurrentScenarioName())[0]?.urls;
}

/**
 *
 * @param props
 * @returns
 * @description 头部展示的下拉选择场景的
 */
function Switcher(props: any) {
  const urls = getCurrentScenarioUrls();
  return (<>
    <Select
      id="basic-demo"
      onChange={(val) => location.href = `./${val}.html`}
      defaultValue={getCurrentScenarioName()}
      style={{ width: 220 }}
    >
      {
        scenarios.map((scenario: Scenario) => <Option value={scenario.name}>{scenario.title}</Option>)
      }
    </Select>
    {/* {
      urls && (
        <Dropdown
          trigger={(
            <img
              style={{
                height: '20px',
                position: 'relative',
                top: '5px',
                marginLeft: '2px',
              }}
              src="https://img.alicdn.com/imgextra/i4/O1CN013upU1R1yl5wVezP8k_!!6000000006618-2-tps-512-512.png"
            />
          )}
          triggerType="click"
        >
          <Menu onItemClick={(key, item) => window.open(key, '_blank')}>
            {
              urls.map((url) => <Menu.Item key={url.value}>{url.key}</Menu.Item>)
            }
          </Menu>
        </Dropdown>
      )
    } */}
  </>)
}

export const scenarioSwitcher = (ctx: ILowCodePluginContext) => {
  return {
    name: 'scenarioSwitcher',
    async init() {
      const { skeleton } = ctx;
      skeleton.add({
        name: 'scenarioSwitcher',
      // export declare type IWidgetConfigArea = 'leftArea' | 'left' | 'rightArea' | 'right' | 'topArea' | 'top' | 'toolbar' | 'mainArea' | 'main' | 'center' | 'centerArea' | 'bottomArea' | 'bottom' | 'leftFixedArea' | 'leftFloatArea' | 'stages';
        area: 'topArea',
        type: 'Widget',// 展示类型用于区分插件在设计器内可操作的几种不同界面类型。主要的几种类型为PanelDock、Widget、Dock，另有Panel类型目前不推荐使用。
        props: {
          align: 'right',
          width: 80,
        },
        content: Switcher,
      });
    },
  };
};
scenarioSwitcher.pluginName = 'scenarioSwitcher';
