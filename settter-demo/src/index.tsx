import * as React from 'react';
import { Switch } from '@alifd/next';
import './style.less';

class LowcodeSetterSettterDemo extends React.Component<{
  onChange: (any) => void,
  value: boolean,
  defaultValue: boolean,
}> {
  static displayName = 'LowcodeSetterSettterDemo';

  render() {
    const { onChange, value, defaultValue } = this.props;
    const props: any = {
      defaultChecked: defaultValue,
      onChange,
    };
    if (typeof value !== 'undefined') {
      props.checked = value;
    }
    return <Switch {...props} className="lowcode-setter-settter-demo" />;
  }
}

export default LowcodeSetterSettterDemo;
