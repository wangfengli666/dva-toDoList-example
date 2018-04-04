import React from 'react';
import { connect } from 'dva';
import { Input, Divider, Checkbox, Button, Row, Col } from 'antd';
const CheckboxGroup = Checkbox.Group;
import styles from './IndexPage.css';

class IndexPage extends React.Component {
  state = {
    inputValue: '',
    checkedValues: [],
  };
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  onChange = (checkedValues) => {
    console.log('checkedValues',checkedValues);
    this.setState({ checkedValues, });
  }
  onDelete = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'example/removeMutiTags',
      payload: {
        tags: this.state.checkedValues
      },
    }).then(()=>{
      this.setState({
        checkedValues: [],
      })
    })
  }
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    const { dispatch } = this.props;
    dispatch({
      type: 'example/addNewTag',
      payload: {
        tag: inputValue
      },
    }).then(()=>{
      this.setState({
        inputValue: ''
      })
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { inputValue,checkedValues } = this.state;
    const { tags } = this.props.example;
    return (
      <div className={styles.normal}>
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
            <Button disabled={checkedValues.length > 0 ? false : true} type="primary"
                    onClick={this.onDelete}>删除选中tag</Button>
          </Col>
          }
        </Row>
        <Divider/>
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
