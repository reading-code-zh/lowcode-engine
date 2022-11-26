import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FusionForm extends PureComponent {
  static displayName = 'FusionForm';

  static defaultProps = {
    name: '张三',
    age: 18,
    friends: ['李四','王五','赵六']
  }

  static propTypes = {
    /**
     * 这是用于描述姓名
     */
    name: PropTypes.string.isRequired,
    /**
     * 这是用于描述年龄
     */
    age: PropTypes.number,
    /**
     * 这是用于描述好友列表
     */
    friends: PropTypes.array
  };

  render() {
    return <div>dumb</div>
  }
}
