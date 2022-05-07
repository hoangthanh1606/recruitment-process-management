import React, { useEffect, useState } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import notification from "@iso/components/Notification";
import "../Create/styles.css";
import { connect } from "react-redux";
import TextEditor from "../Create/TextEditor";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  Row,
  Upload,
  Switch,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  updateCampaignListAction,
  getCampaignDetailAction,
} from "@iso/redux/campaign/actions";
import { useParams, useHistory, Link } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";

const { RangePicker } = DatePicker;
const { Option } = Select;
const rangeConfig = {
  rules: [{ type: "array", required: true, message: "Please select time!" }],
};
const dateFormat = "YYYY-MM-DD";

function Campaign({
  getCampaignDetail,
  campaignDetail,
  updateToCampaign,
  campaignList,
}) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const history = useHistory();

  let data = {};
  if (campaignDetail.data.campaign) {
    data = campaignDetail.data.campaign;
    data.technologies = data.technologies.toString().split(",");
    data.positions = data.positions.toString().split(",");
    data.startDate = data.startDate.toString().split();
    data.endDate = data.endDate.toString().split();
    data.image = data.image.toString().split();
    data.description = parse(data.description);
    data.description = data.description.toString();
  }

  const formImages = data
    ? data?.image?.map((image, index) => ({
        uid: index,
        name: `image-${index + 1}.jpg`,
        type: "image/jpeg",
        thumbUrl: image,
      }))
    : [];

  const initialValues = data
    ? {
        ...data,
        image: formImages,
        rangePicker: [
          moment(data.startDate, dateFormat),
          moment(data.endDate, dateFormat),
        ],
      }
    : {};

  const [status, setStatus] = useState();
  const onChangeStatus = (value) => {
    setStatus(value);
  };

  function disabledDate(current) {
    return current && current < moment().startOf('day');
  }

  const handleUpdateCampaign = () => {
    const values = form.getFieldValue();
    const newImages = values.image.map((file) => file.thumbUrl);
    const rangeValue = values["rangePicker"];
    const newValue = {
      ...values,
      image: newImages,
      rangePicker: [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
    };
    if (data) {
      updateToCampaign({ id: data.id, ...newValue });
      notification("success", "update successfully");
      history.push("/dashboard/campaign");
    }
  };

  useEffect(() => {
    getCampaignDetail({ id });
    form.setFieldsValue(data);
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [data]);

  return (
    <LayoutContent>
      <h2 className="title-campaign">Edit Campaign</h2>
      <Row type="flex" align="center">
        <Col span={20}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 6, offset: 0 }}
            wrapperCol={{ span: 12 }}
            onFinish={handleUpdateCampaign}
            autoComplete="off"
            initialValues={initialValues}
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
              label="Hình ảnh"
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
              label="Technology"
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

            <Form.Item label="Status" name="isActive">
              <Switch
                checked={status}
                onChange={onChangeStatus}
                defaultChecked={data.isActive}
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
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
              <Button className="btn-campaign" type="primary" htmlType="submit">
                Save
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
    updateToCampaign: (params) => dispatch(updateCampaignListAction(params)),
    getCampaignDetail: (params) => dispatch(getCampaignDetailAction(params)),
  };
};
const mapStateToProps = (state) => {
  const { campaignList, campaignDetail } = state.campaignReducer;
  return {
    campaignList,
    campaignDetail,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
