import React from 'react';
import { connect } from 'dva';
import { Input, Divider, Checkbox, Button, Row, Col } from 'antd';
import styles from './IndexPage.css';

const CheckboxGroup = Checkbox.Group;


class IndexPage extends React.Component {
  state = {
    inputValue: '',
    checkedValues: [],
    randomNumber: null,
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
  onGetNewRandomData = () => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          const num = Math.floor(Math.random() * 100);
          resolve(num);
        }, 500);
      } catch (e) {
        reject(e);
      }
    });
  };
  async onClick() {
    const num = await this.onGetNewRandomData();
    this.setState({
      randomNumber: num,
    }, () => {
      if (num % 2 !== 0) {
        this.onClick();
      }
    });
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
    const { inputValue, checkedValues, randomNumber } = this.state;
    const { tags } = this.props.example;
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
