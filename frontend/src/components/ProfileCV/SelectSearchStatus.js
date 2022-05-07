import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function SelectSearchStatus() {
  return(
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select status"
      name="status"
    >
      <Option value="NEW">
        <div className="demo-option-label-item">
          NEW
        </div>
      </Option>
      <Option value="TEST">
        <div className="demo-option-label-item">
          TEST
        </div>
      </Option>
      <Option value="INTERVIEW">
        <div className="demo-option-label-item">
          INTERVIEW
        </div>
      </Option>
      <Option value="CONFIRM">
        <div className="demo-option-label-item">
          CONFIRM
        </div>
      </Option>
      <Option value="CONSIDER">
        <div className="demo-option-label-item">
          CONSIDER
        </div>
      </Option>
      <Option value="EMPLOYEE">
        <div className="demo-option-label-item">
          EMPLOYEE
        </div>
      </Option>
      <Option value="REJECT">
        <div className="demo-option-label-item">
          REJECT
        </div>
      </Option>
    </Select>
  )
}