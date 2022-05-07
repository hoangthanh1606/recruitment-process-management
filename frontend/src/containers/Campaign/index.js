import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Row, Col, Select, Form, Tag } from 'antd';
import {Link} from 'react-router-dom';
import LayoutContent from "@iso/components/utility/layoutContent";
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { getListCampaignAction } from "@iso/redux/campaign/actions";
import notification from "@iso/components/Notification";
import { useHistory } from 'react-router-dom';
import datoToString from "@iso/lib/helpers/convertDateToString";

const { Option } = Select;

function ListCampaign({ getListCampaign, campaignList, error }) {
  const [dataCP, setDataCP] = useState([]);
  if (campaignList.data.data != dataCP) {
    setDataCP(campaignList.data.data);
  }
  

  useEffect(() => {
    getListCampaign();
  }, []);
  
  const [form] = Form.useForm();
  const handleSubmit = e => {
    const values = form.getFieldValue();
    getListCampaign(values);
    if (error) {
      notification("error", "Get list campaign failed");
    } else {
      notification("success", "Get list campaign successfully");
    }
  }

  const handleReset = e => {
    form.resetFields();
    getListCampaign();
  }

  const history = useHistory();
  const handleViewProfiles = (record) => {
    history.push(`/dashboard/campaign/${record.id}/profiles`);
  }

  let dataTable = [];
  // let data = campaignList.data.data;
  let data = dataCP;
  if (data) {
    data.forEach((campaign) => {
      if (campaign.isActive === true) {
        campaign.isActive = 'Active';
      } else {
        campaign.isActive = 'Expired';
      }
      dataTable = [
        ...dataTable,
        {
          ...campaign,
          technology: campaign.technologies.toString().split(','),
          position: campaign.positions.toString().split(','),
          start_day: datoToString(campaign.startDate),
          end_day: datoToString(campaign.endDate),
          status: campaign.isActive,
        }
      ]
    });
  }

  const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Technology',
      dataIndex: 'technology',
      key: 'technology',
      render: technology => (
        <>
          {technology.map(tech => (
            <Tag color="blue" key={tech}>
              {tech}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: position => (
        <>
          {position.map(pos => (
            <Tag color="blue" key={pos}>
              {pos}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Start day',
      dataIndex: 'start_day',
      key: 'start_day',
    },
    {
      title: 'End day',
      dataIndex: 'end_day',
      key: 'end_day',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: ' Action',
      key: ' action',
      render: (text, record) => (
        <span>
          <Button type="primary" style = {{ margin: '0 10px 0 0' }} onClick={() => handleViewProfiles(record)}> Profiles </Button>
          <Button type="primary" onClick={() => history.push(`/dashboard/campaign/${record.id}/edit`)}> Edit </Button>
        </span>
      )
    },

  ];
  return (
    <LayoutContent>
        <Row>
          <Col span={20}>
            <h2 >Campaign</h2>
          </Col>
          <Col span={4}>
            <Button type="primary" style={{align: 'right'}}> 
              <Link to="/dashboard/campaign/create">
                Create new campaign 
              </Link>
            </Button>
          </Col>
        </Row>
      <Form form={form}>
        <Row style = {{ margin: '30px 0 0 0' }}>
          <Col span={5} style = {{ padding: '0 10px 0 10px' }}>
            <label>Technology:</label>
          </Col>
          <Col span={5} style = {{ padding: '0 10px 0 10px' }}>
            <label>Position:</label>
          </Col>
          <Col span={5} style = {{ padding: '0 10px 0 10px' }}>
            <label>Status:</label>
          </Col>
          <Col span={5} style = {{ padding: '0 10px 0 10px' }}>
            <label>Name:</label>
          </Col>
        </Row>
        <Row style = {{ margin: '0 0 10px 0' }}>
          <Col span={5}  style = {{ padding: '0 10px 0 10px' }}>
            <Form.Item name="technologies">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select Technology"
                name="technologies"
              >
                <Option value="Java">
                  <div className="demo-option-label-item">
                    Java
                  </div>
                </Option>
                <Option value="Vue">
                  <div className="demo-option-label-item">
                    Vue
                  </div>
                </Option>
                <Option value="Dart">
                  <div className="demo-option-label-item">
                    Dart
                  </div>
                </Option>
              </Select>
            </Form.Item>
          </Col >
          <Col span={5} style = {{ padding: '0 10px 0 10px' }}>
            <Form.Item name="position">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select Position"
              >
                <Option value="Intern" label="Intern">
                  <div className="demo-option-label-item">
                    Intern
                  </div>
                </Option>
                <Option value="Fresher" label="Fresher">
                  <div className="demo-option-label-item">
                    Fresher
                  </div>
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={5} style = {{ padding: '0 10px 0 10px' }}>
            <Form.Item name="status">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select status"
              >
                <Option value="Active" label="Active">
                  <div className="demo-option-label-item">
                    Active
                  </div>
                </Option>
                <Option value="Expired" label="Expired">
                  <div className="demo-option-label-item">
                    Expired
                  </div>
                </Option>
              </Select>
            </Form.Item>  
          </Col>
          <Col span={5} style = {{ padding: '0 10px 0 10px' }}>
            <Form.Item name="search">
              <Input placeholder="Please enter search by name">

              </Input>
            </Form.Item>  
          </Col>
          <Col span={4} style = {{ padding: '0 10px 0 10px' }}>
              <Button onClick={handleSubmit} type="primary" style = {{ margin: '0 10px 0 10px' }}>Search</Button>
              <Button onClick={handleReset} >Reset</Button>
          </Col>
        </Row>
      </Form>
      <Table dataSource={dataTable} columns={columns} />
    </LayoutContent>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListCampaign: (query) => dispatch(getListCampaignAction(query)),
  };
};
const mapStateToProps = (state) => {
  const { campaignList, error } = state.campaignReducer;
  return {
    campaignList,
    error
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListCampaign);
