import React from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import "./styles.css";
import LayoutContent from "@iso/components/utility/layoutContent";
import notification from "@iso/components/Notification";
import TextEditor from "./TextEditor";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  Row,
  Upload,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addCampaignAction } from "@iso/redux/campaign/actions";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;
const rangeConfig = {
  rules: [{ type: "array", required: true, message: "Please select time!" }],
};

function Campaign({ addToCampaign, campaignList }) {
  const [form] = Form.useForm();
  const history = useHistory();

  const handleCreateCampaign = () => {
    const values = form.getFieldValue();
    const rangeValue = values["rangePicker"];
    const newImage = values?.image[0]?.thumbUrl;
    const newValues = {
      ...values,
      image: newImage,
      rangePicker: [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
    };
    addToCampaign(newValues);
    notification("success", "Create successfully");
    history.push("/dashboard/campaign");
    form.resetFields();
  };

  function disabledDate(current) {
    return current && current < moment().startOf('day');
  }

  return (
    <LayoutContent>
      <h2 className="title-campaign">Create Campaign</h2>
      <Row type="flex" align="center">
        <Col span={20}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 6, offset: 0 }}
            wrapperCol={{ span: 12 }}
            onFinish={() => handleCreateCampaign()}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item
              valuePropName="fileList"
              label="Image"
              name="image"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) return e;
                return e && e.fileList;
              }}
              validateFirst
              rules={[
                { required: true, message: "Please upload image!" },
                () => ({
                  validator(_, value) {
                    if (!["image/png", "image/jpeg"].includes(value[0].type)) {
                      return Promise.reject(
                        "The file is not in the correct format"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Upload
                maxCount={1}
                listType="picture"
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Date Picker"
              name="rangePicker"
              {...rangeConfig}
              hasFeedback
            >
              <RangePicker style={{ width: "100%" }} disabledDate={disabledDate} />
            </Form.Item>

            <Form.Item
              label="Postion"
              name="positions"
              rules={[
                { required: true, message: "Please input your position!" },
              ]}
              hasFeedback
            >
              <Select mode="multiple">
                <Option value="intern">Intern</Option>
                <Option value="fresher">Fresher</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Technologies"
              name="technologies"
              rules={[
                { required: true, message: "Please input your technology!" },
              ]}
              hasFeedback
            >
              <Select mode="multiple">
                <Option value="java">Java</Option>
                <Option value="vue">Vue</Option>
                <Option value="dart">Dart</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Please input your quantity!" },
              ]}
              hasFeedback
            >
              <InputNumber min={1} size="small" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              hasFeedback
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <TextEditor placeholder="Description" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 12,
                span: 12,
              }}
            >
              <Button className="btn-campaign">
                <Link to="/dashboard/campaign">Cancel</Link>
              </Button>
              <Button type="primary" htmlType="submit" className="btn-campaign">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </LayoutContent>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCampaign: (params) => dispatch(addCampaignAction(params)),
  };
};
const mapStateToProps = (state) => {
  const { campaignList } = state.campaignReducer;
  return {
    campaignList,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
