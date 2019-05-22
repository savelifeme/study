import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import WeUpload from '@/components/WeUpload';
// import { connect } from 'dva';
import { Form, Input, Card, DatePicker, Select } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;

// @connect(({ experiment, loading }) => ({
//   // experiment: lib.controlPoint,
// }))
@Form.create()
class AddForm extends Component {
  constructor(props) {
    super(props);
    this.form = props.form;
    this.state = {
      volume: '', // 试坑体积
      sampleQuality: '', // 试样质量
      soilQuality: '',// 干土质量
      maxDryDensity: '',// 最大干密度
      moistureContent: '',// 含水率
      wetDensity: '',// 湿密度
      dryDensity: '',// 干密度
      compactness: ''// 压实度      
    }
  }
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'cell/getDivisionTree',
  //     payload: {
  //       type: 6,
  //     },
  //   });
  /** 单元工程 实验人员 监理人员 */
  // }

  onChange = (date, dateString) => {
    console.log(date, dateString, 123456);
  };

  /**
   * 选择实验人员
   */
  onLaboratoryStaffChange = value => {
    console.log(`selected,${value}`, 61234856);
  };
  /**
   * 选择监理人员
   */

  onsupervisorChange = value => {
    console.log(`selected,${value}`, 123456);
  };

  afterUpload = () => {
    console.log(56411);
  }

  componentDidUpdate = (nextProps) => {
    const { volume } = this.state;
    // const {volume,sampleQuality,soilQuality,maxDryDensity}=this.state;
    // const {form}=this.props;
    if (nextProps.volume !== volume) {
      console.log(456);
      // form.setFieldsValue({
      //   volume,
      //   sampleQuality,
      //   soilQuality,
      //   maxDryDensity
      // })
    }
  }

  // 计算数值
  // calculatedValue=()=>{
  //     const {volume,sampleQuality,soilQuality,maxDryDensity}=this.state;
  //     console.log( volume,sampleQuality,soilQuality,maxDryDensity ,123456);
  //     if(volume!==""&& sampleQuality!==""&& soilQuality!=="" && maxDryDensity!==""){
  //       const moistureContent= (sampleQuality-soilQuality )/soilQuality ;// 含水率
  //       const wetDensity= sampleQuality/volume; // 湿密度
  //       const dryDensity= wetDensity/(1+0.01*moistureContent); // 干密度
  //       const compactness= dryDensity/maxDryDensity*100; // 压实度

  //       console.log(moistureContent,wetDensity,dryDensity,compactness,789666 );

  //       this.setState({
  //         moistureContent:moistureContent.toFixed(2), // 含水率
  //         wetDensity:wetDensity.toFixed(2),// 湿密度
  //         dryDensity: dryDensity.toFixed(2),// 干密度
  //         compactness:compactness.toFixed(2)// 压实度
  //       })

  //   }
  // }

  render() {
    const {
      form: { getFieldDecorator },
      projectContent,
      supervisorData,
      laboratoryStaffData,
    } = this.props;
    const {
      volume,
      sampleQuality,
      soilQuality,
      maxDryDensity,
      moistureContent,
      wetDensity,
      dryDensity,
      compactness
    } = this.state;

    return (
      <PageHeaderWrapper className={styles.addHeaderWrapper}>
        <div className={styles.contentWrapper}>
          <p className={styles.add}>新增</p>
          <Card
            bordered={false}
            title="附件资料"
            style={{
              marginBottom: 24,
            }}
          >
            <Form layout="vertical">
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '348px',
                  }}
                >
                  <FormItem label="单元工程">
                    {getFieldDecorator('unitEngineering', {
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(
                      <Select placeholder="请选择">
                        {projectContent
                          ? projectContent.map(item => (
                            <Option key={item.key} value={item.key} title={item.title}>
                              {item.title}
                            </Option>
                          ))
                          : null}
                      </Select>
                    )}
                  </FormItem>
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '348px',
                    margin: '0 262px',
                  }}
                >
                  <FormItem label="试坑编号">
                    {getFieldDecorator('testPitNumber', {
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(<Input placeholder="请输入" />)}
                  </FormItem>
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '348px',
                  }}
                >
                  <FormItem label="试坑时间">
                    {getFieldDecorator('time')(
                      <DatePicker
                        style={{
                          width: '348px',
                        }}
                      />
                    )}
                  </FormItem>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '348px',
                  }}
                >
                  <FormItem label="试坑体积（cm³）">
                    {getFieldDecorator('volume', {
                      rules: [{
                        message: '最多可保留两位小数',
                        pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                      }],
                      initialValue: volume
                    })(
                      <Input placeholder="请输入，可保留两位小数" />
                    )}
                  </FormItem>
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '348px',
                    margin: '0 262px',
                  }}
                >
                  <FormItem label="试样质量（g）">
                    {getFieldDecorator('sampleQuality', {
                      rules: [{
                        message: '最多可保留两位小数',
                        pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                      }],
                      initialValue: sampleQuality
                    })(
                      <Input placeholder="请输入，可保留两位小数" />
                    )}
                  </FormItem>
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '348px',
                  }}
                >
                  <FormItem label="干土质量(g)">
                    {getFieldDecorator('soilQuality',
                      {
                        rules: [{
                          message: '最多可保留两位小数',
                          pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                        }],
                        initialValue: soilQuality
                      })(
                        <Input placeholder="请输入，可保留两位小数" />
                      )}
                  </FormItem>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '348px',
                  }}
                >
                  <FormItem label="最大干密度（g/cm³）">
                    {getFieldDecorator('maxDryDensity', {
                      rules: [{
                        message: '最多可保留两位小数',
                        pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                      }],
                      initialValue: maxDryDensity
                    })(
                      <Input placeholder="请输入，可保留两位小数" />
                    )}
                  </FormItem>
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '348px',
                    margin: '0 262px',
                  }}
                >
                  <FormItem label="含水率（%）">
                    {getFieldDecorator('moistureContent', {
                      initialValue: moistureContent
                    })(
                      <Input placeholder="自动填充，保留两位小数" disabled />
                    )}
                  </FormItem>
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '348px',
                  }}
                >
                  <FormItem label="湿密度（g/cm³）">
                    {getFieldDecorator('wetDensity', {
                      initialValue: wetDensity
                    })(
                      <Input placeholder="自动填充，保留两位小数" disabled />
                    )}
                  </FormItem>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '348px',
                  }}
                >
                  <FormItem label="干密度（g/cm³）">
                    {getFieldDecorator('dryDensity', {
                      initialValue: dryDensity
                    })(
                      <Input placeholder="自动填充，保留两位小数" disabled />
                    )}
                  </FormItem>
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '348px',
                    margin: '0 262px',
                  }}
                >
                  <FormItem label="压实度（%）">
                    {getFieldDecorator('compactness', {
                      initialValue: compactness
                    })(
                      <Input placeholder="自动填充，保留两位小数" disabled />
                    )}
                  </FormItem>
                </div>
              </div>
              <div
                style={{
                  width: '957px',
                }}
              >
                <FormItem label="实验人员">
                  {getFieldDecorator('laboratoryStaff')(
                    <Select
                      style={{
                        width: '100%',
                      }}
                      placeholder="请选择"
                      mode="multiple"
                      onChange={this.onLaboratoryStaffChange}
                    >
                      {laboratoryStaffData !== undefined
                        ? laboratoryStaffData.map(item => (
                          <Option key={item.key} value={item.key}>
                            {item.title}
                          </Option>
                        ))
                        : null}
                    </Select>
                  )}
                </FormItem>
              </div>
              <div
                style={{
                  width: '957px',
                }}
              >
                <FormItem label="监理人员">
                  {getFieldDecorator('supervisor')(
                    <Select
                      style={{
                        width: '100%',
                      }}
                      placeholder="请选择"
                      mode="multiple"
                    >
                      {supervisorData !== undefined
                        ? supervisorData.map(item => (
                          <Option key={item.key} value={item.key}>
                            {item.title}
                          </Option>
                        ))
                        : null}
                    </Select>
                  )}
                </FormItem>
              </div>
            </Form>
          </Card>
          <Card
            bordered={false}
            title="上传照片"
            style={{
              marginBottom: 24,
            }}
          >
            <WeUpload
              action={`${APP_HOST}/admin/Util/upload`}
              accept=".jpg,.png,.jpeg"
              multiple
              fileType="image"
              showUploadList={false}
              listType="pic"
              btnText="上传图片"
              handleChange={this.afterUpload}
              isVisiblePercent={false}
              size="100"
            />
          </Card>

        </div>
      </PageHeaderWrapper>
    );
  }
}
export default AddForm;
