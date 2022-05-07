import React from 'react';
import { Menu, Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item key="NEW">
      NEW
    </Menu.Item>
    <Menu.Item key="TEST">
      TEST
    </Menu.Item>
    <Menu.Item key="INTERVIEW">
      INTERVIEW
    </Menu.Item>
    <Menu.Item key="CONFIRM">
      CONFIRM
    </Menu.Item>
    <Menu.Item key="CONSIDER">
      CONSIDER
    </Menu.Item>
    <Menu.Item key="EMPLOYEE">
      EMPLOYEE
    </Menu.Item>
    <Menu.Item key="REJECT">
      REJECT
    </Menu.Item>
  </Menu>
);

export default (props) => {
  if (props) {
    return(
      <Dropdown overlay={menu}>
        <Button>
          <Space>
            {props.status}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    );  
  }
}
