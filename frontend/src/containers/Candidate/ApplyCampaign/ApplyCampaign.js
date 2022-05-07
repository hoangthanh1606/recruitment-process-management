import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCampaign, candidateApplyCampaign } from "@iso/redux/candidate/actions";
import { useParams, useHistory } from "react-router-dom";
import { Layout, Button, Form, Input, Upload } from "antd";
import Topbar from "../../TopBarUser/TopBar";
import Content from "../Content.style";
import {
  file2Base64,
} from "@pankod/refine-core";
import notification from "@iso/components/Notification";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";

import { UploadOutlined } from "@ant-design/icons";

function ApplyCampaign({ getCampaign, candidateApplyCampaign, campaign, error }) {
  const { id } = useParams();
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    getCampaign(id);
  }, []);

  let nameCampaign;
  if (campaign) {
    if (campaign.data) {
      nameCampaign = (
        <h1
          style={{
            fontWeight: "bold",
            fontSize: '28px',
            textAlign: 'center',
            marginBottom: '20px',
            color: '#40a9ff'
          }}
        >
          {campaign.data.name}
        </h1>
      );
    }
  }

  const handleApply = async () => {
    const values = form.getFieldValue();
    const formData = new FormData();
    formData.append("file", values.cv[0].originFileObj);
    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("phone_number", values.phone);
    formData.append("campaignId", id);
    candidateApplyCampaign(formData);
    if (error) {
      notification("error", "Apply failed");
    } else {
      history.push("/thanks");
    }
  }

  return (
    <Layout>
      <Topbar />
      <LayoutContentWrapper>
        <Content>
          {nameCampaign}
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 10,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            size="large"
            onFinish={() => handleApply()}
          >
            <Form.Item
              label="Your Name"
              name="full_name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Your Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Your phone"
              name="phone"
              rules={[
                {
                  pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                  message: "The input is not valid phone number",
                },
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              valuePropName="fileList"
              label="Your CV"
              name="cv"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) return e;
                return e && e.fileList;
              }}
              validateFirst
              rules={[{ required: true, message: "Please upload cv!" }]}
            >
              <Upload
                maxCount={1}
                listType="text"
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />} size="large">
                  Click to upload
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Apply Now
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </LayoutContentWrapper>
    </Layout>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampaign: (id) => dispatch(getCampaign(id)),
    candidateApplyCampaign: (data) => dispatch(candidateApplyCampaign(data)),
  };
};
const mapStateToProps = (state) => {
  const { campaign, error } = state.candidateReducer;
  return { campaign, error };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyCampaign);
