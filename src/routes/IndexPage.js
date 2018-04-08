import React from 'react';
import { connect } from 'dva';
import { Input, Divider, Checkbox, Button, Row, Col } from 'antd';
import styles from './IndexPage.css';

const CheckboxGroup = Checkbox.Group;


class IndexPage extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    inputValue: '',
    checkedValues: [],
  };
  onChange = (checkedValues) => {
    this.setState({ checkedValues });
  }
  async onDelete() {
    try {
      const result = await this.onRemoveTagsDispatch().then(() => {
      }).finally(() => {
      }).catch(() => {
      });
      if (result === 'success') {
        this.setState({
          checkedValues: [],
        });
      }
    } catch (e) {
      console.log('try catch', e); // 30
    }
  }
  onRemoveTagsDispatch = () => {
    const { dispatch } = this.props;
    return dispatch({
      type: 'example/removeMutiTags',
      payload: {
        tags: this.state.checkedValues,
      },
    });
  }
  async onGetNewRandomData() {
    const { dispatch } = this.props;
    try {
      const num = await dispatch({
        type: 'example/onGetNewRandomData',
        payload: {
        },
      });
      return num;
    } catch (e) {
      console.log('try catch', e);
    }
  }
  onClick() {
    this.generateNum = setInterval(() => {
      this.onGetNewRandomData().then((res) => {
        if (res % 2 === 0) {
          clearInterval(this.generateNum);
        }
      });
    }, 500);
  }
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    const { dispatch } = this.props;
    dispatch({
      type: 'example/addNewTag',
      payload: {
        tag: inputValue,
      },
    }).then(() => {
      this.setState({
        inputValue: '',
      });
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { inputValue, checkedValues } = this.state;
    const { tags, randomNumber } = this.props.example;
    return (
      <div className={styles.normal}>
        <Divider>点击生成偶数随机数</Divider>
        <Row gutter={24}>
          <Col span={12} >
            {randomNumber}
          </Col>
          <Col span={12} >
            <Button
              onClick={this.onClick.bind(this)}
            >获取随机数</Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>{(
            <Input
              ref={this.saveInputRef}
              type="text"
              size="default"
              style={{ width: 118 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}</Col>
          { tags.length > 0 && <Col span={12}>
            <Button
              disabled={!(checkedValues.length > 0)} type="primary"
              onClick={this.onDelete.bind(this)}
            >删除选中tag</Button>
          </Col>
          }
        </Row>
        <Divider />
        <div className={styles.container}>
          <CheckboxGroup options={tags} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
IndexPage.propTypes = {
};
function mapStateToProps(state) {
  const { example, dispatch } = state;
  return {
    example,
    dispatch,
  };
}
export default connect(mapStateToProps)(IndexPage);
