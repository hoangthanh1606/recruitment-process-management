import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import LayoutContent from "@iso/components/utility/layoutContent";
import { Table, Button, Input, Row, Col, Select, Form } from 'antd';
import { connect } from "react-redux";
import { getListProfilebyCampaign } from "@iso/redux/campaign/actions";
import SelectSearchStatus from '@iso/components/ProfileCV/SelectSearchStatus';
import notification from "@iso/components/Notification";
import { useHistory } from 'react-router-dom';
import { changeStatusProfileCV } from "@iso/redux/profileCV/actions";
import { Excel } from 'antd-table-saveas-excel';

const { Option } = Select;

function ListProfileByCampaign({getListProfile, profileListByCampaign, error, changeStatusProfileCV, errorProfile}) {
  const {id} = useParams();

  useEffect(() => {
    getListProfile(id);
  }, [])

  const [form] = Form.useForm();
  const handleSubmit = e => {
    const values = form.getFieldValue();
    getListProfile(id,values);
    if (error) {
      notification("error", "Get list profile by campaign failed");
    } else {
      notification("success", "Get list profile by campaign successfully");
    }
  }

  const handleReset = e => {
    form.resetFields();
    getListProfile(id);
  }

  const history = useHistory();
  const handleViewProfile = (record) => {
    history.push(`/dashboard/campaign/${id}/profiles/${record.id}`);
  }

  let dataTable = [];
  let data = profileListByCampaign.data.data;
  if (data) {
    data.forEach((record) => {
      record.key = record.id;
    });
  }
  dataTable = data;

  const columns = [
    {
      title: 'Full name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (record.status) {
          return (
            <Select 
             className="select-status"
             name="status"
             size="middle"
             defaultValue={record.status}
             onChange={(e) => {
              changeStatusProfileCV(record.id, e);
              if(errorProfile) {
                notification("error", "Change status failed");
              } else {
                notification("success", "Change status success");
              }
             }}
             >
                <Option value="New">New</Option>
                <Option value="Test">Test</Option>
                <Option value="Interview">Interview</Option>
                <Option value="Confirm">Confirm</Option>
                <Option value="Consider">Consider</Option>
                <Option value="Employee">Employee</Option>
            </Select>
          );
        }
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleViewProfile(record)} type="primary"> View </Button>
      )
    },
  ]

  const [checkbox, setCheckbox] = useState([]);

  const rowSelection = {
    onChange: async (selectedRowKeys, selectedRows) => {
      await setCheckbox(selectedRows);
    },
  };

  const columnsExcel = [
    {
      title: 'Full name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Link CV',
      dataIndex: 'link_cv',
      key: 'link_cv',
    },
  ];

  const handleExport = () => {
    const excel = new Excel();
    excel
      .addSheet('data')
      .addColumns(columnsExcel)
      .addDataSource(checkbox)
      .saveAs('profile.xlsx');
  }

  const handleExportAll = () => {
    const excel = new Excel();
    excel
      .addSheet('data')
      .addColumns(columnsExcel)
      .addDataSource(data)
      .saveAs('profile.xlsx');
  }

  return (
    <LayoutContent>
      <Form form={form}>
        <Row style = {{ margin: '30px 0 0 0' }}>
          <Col span={5} style = {{ padding: '0 10px 0 10px' }}>
            <label>Email:</label>
          </Col>
          <Col span={5} style = {{ padding: '0 10px 0 10px' }}>
            <label>Phone Number:</label>
          </Col>
          <Col span={5} style = {{ padding: '0 10px 0 10px' }}>
            <label>Full Name:</label>
          </Col>
          <Col span={5} style = {{ padding: '0 10px 0 10px' }}>
            <label>Status:</label>
          </Col>
        </Row>
        <Row style = {{ margin: '0 0 10px 0' }}>
          <Col span={5}  style = {{ padding: '0 10px 0 10px' }}>
            <Form.Item name="email">
              <Input placeholder="Please enter search by email">

              </Input>
            </Form.Item>
          </Col>
          <Col span={5}  style = {{ padding: '0 10px 0 10px' }}>
            <Form.Item name="phone_number">
              <Input placeholder="Please enter search by phone number">

              </Input>
            </Form.Item>
          </Col>
          <Col span={5}  style = {{ padding: '0 10px 0 10px' }}>
            <Form.Item name="full_name">
              <Input placeholder="Please enter search by full name">

              </Input>
            </Form.Item>
          </Col>
          <Col span={5}  style = {{ padding: '0 10px 0 10px' }}>
            <Form.Item name="status">
              <SelectSearchStatus>

              </SelectSearchStatus>
            </Form.Item>
          </Col>
          <Col span={4} style = {{ padding: '0 10px 0 10px' }}>
              <Button onClick={handleSubmit} type="primary" style = {{ margin: '0 10px 0 10px' }}>Search</Button>
              <Button onClick={handleReset} >Reset</Button>
          </Col>
        </Row>
      </Form>
      <Button 
        onClick={handleExport}
        style = {{ margin: '10px 10px 10px 10px' }}
        type="primary"
      >
        Export
      </Button>

      <Button 
        onClick={handleExportAll}
        style = {{ margin: '10px 10px 10px 10px' }}
        type="primary"
      >
        Export all
      </Button>

      <Table 
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }} 
        dataSource={dataTable} 
        columns={columns} 
      />
    </LayoutContent>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListProfile: (id, query) => dispatch(getListProfilebyCampaign(id, query)),
    changeStatusProfileCV: (id, status) => dispatch(changeStatusProfileCV(id, status)),
  };
};
const mapStateToProps = (state) => {
  const { profileListByCampaign, error } = state.campaignReducer;
  const { errorProfile } = state.profileCVReducer;
  return {
    profileListByCampaign,
    error,
    errorProfile,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListProfileByCampaign);
