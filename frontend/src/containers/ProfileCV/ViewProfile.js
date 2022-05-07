import React, { useEffect } from "react";
import LayoutContent from "@iso/components/utility/layoutContent";
import "./style.css";
import { Form, Button, Select, Row } from "antd";
import { connect } from "react-redux";
import { getProfileCV, changeStatusProfileCV } from "@iso/redux/profileCV/actions";
import {useParams} from 'react-router-dom';
import { getCampaign } from "@iso/redux/candidate/actions";
import notification from "@iso/components/Notification";

const { Option } = Select;

function ViewProfile({ getCampaign, campaign, getProfileCV, profile, errorProfile, changeStatusProfileCV }) {
  const [form] = Form.useForm();
  const {id_profile, id} = useParams();


  useEffect(() => {
    getProfileCV(id_profile);
    getCampaign(id);
  }, [])
  form.setFieldsValue({'status': profile.status});
  
  let campaignName = campaign.data ? campaign.data.name : '';

  const handleSubmit = () => {
    const values = form.getFieldValue();
    changeStatusProfileCV(id_profile, values.status);
    if(errorProfile) {
      notification("error", "Change status failed");
    } else {
      notification("success", "Change status success");
    }
  }

  const handleReject = () => {
    changeStatusProfileCV(id_profile, 'Reject');
    if(errorProfile) {
      notification("error", "Change status failed");
    } else {
      notification("success", "Change status success");
    }
  }

  return (
    <LayoutContent>
      <h2 className="title-profile">Candidate Profile</h2>
      <Row type="flex" align="center">
        <Form
          className="profile-campaign"
          form={form}
          name="basic"
          labelCol={{ span: 6, offset: 0 }}
          wrapperCol={{ span: 14 }}
          autoComplete="off"
          initialValues={{ status: profile.status }}
        >
          <Form.Item
            className="campaign-title"
            label="Campaign"
            name="campaign"
            hasFeedback
          >
            <label>{campaignName}</label>
          </Form.Item>

          <Form.Item
            label="Full name"
            name="full_name"
            hasFeedback
          >
            <label>{profile.full_name}</label>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            hasFeedback
          >
            <label>{profile.email}</label>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone_number"
            hasFeedback
          >
            <label>{campaignName}</label>
          </Form.Item>

        <Form.Item
            label="Status"
            name="status"
            rules={[{ message: "Please choose status!" }]}
          >
            <Select 
             className="select-status"
             name="status"
             size="middle"
             >
                <Option value="New">New</Option>
                <Option value="Test">Test</Option>
                <Option value="Interview">Interview</Option>
                <Option value="Confirm">Confirm</Option>
                <Option value="Consider">Consider</Option>
                <Option value="Employee">Employee</Option>
            </Select>
          </Form.Item>

          <Button className="btn-submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Button className="btn-reject" onClick={handleReject}>
            Reject
          </Button>

          </Form>

          <Form
            className="cv-campaign"
          >
            <div className="iframe-cv">
                <iframe src={profile.link_cv}></iframe>
            </div>
          </Form>
      </Row>
    </LayoutContent>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileCV: (id) => dispatch(getProfileCV(id)),
    getCampaign: (id) => dispatch(getCampaign(id)),
    changeStatusProfileCV: (id, status) => dispatch(changeStatusProfileCV(id, status)),
  };
};
const mapStateToProps = (state) => {
  const { profile, errorProfile } = state.profileCVReducer;
  const { campaign } = state.candidateReducer;
  return {
    profile,
    errorProfile,
    campaign,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile)
