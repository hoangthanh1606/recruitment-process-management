import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getCampaign } from "@iso/redux/candidate/actions";
import {useParams} from 'react-router-dom';
import { Layout, Row, Col, Button, Divider, Tag } from 'antd';
import Topbar from '../TopBarUser/TopBar';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import Content from './Content.style'
import {Link} from 'react-router-dom';
import parse from 'html-react-parser'
import todayMinusDate from "@iso/lib/helpers/todayMinusDate";
import datoToString from "@iso/lib/helpers/convertDateToString";

function CampaignDetail({getCampaign, campaign, error }) {
  const {id} = useParams();

  const data = campaign.data;

  useEffect(() => {
    getCampaign(id);
  }, []);

  let title, description;
  if (data) {
    let technology = data.technologies.toString().split(',');
    let position = data.positions.toString().split(',');
    let date = new Date(data.endDate);
    const day = todayMinusDate(date);
    let dataDay;
    if (day) {
      dataDay = (<div >Thời gian ứng tuyển còn: {day} ngày</div>);
    } else {
      dataDay = (<div >Hạn ứng tuyển: {datoToString(data.endDate)}</div>);
    }
    title = (
      <div>
        <h1 style = {{ margin: '20px 10px 20px 30px' }}>{data.name}</h1>
        <Row style = {{ margin: '20px 10px 20px 30px' }}>
          <Col span={8}>
            Số lượng cần tuyển: {data.quantity}
          </Col>
          <Col span={8}>
            {dataDay}
          </Col>
          <Col span={8}>
            Vị trí: {position.map(pos => (
                      <Tag color="blue" key={pos}>
                        {pos}
                      </Tag>
                    ))}
          </Col>
        </Row>
        <Row style = {{ margin: '20px 10px 20px 30px' }}>
          <Col span={8}>
            Công nghệ: {technology.map(tech => (
                      <Tag color="blue" key={tech}>
                        {tech}
                      </Tag>
                    ))}
          </Col>
        </Row>
      </div>
    );
    description = parse(data.description);
    description = (
      <div style = {{ margin: '20px 10px 20px 30px' }}>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    );
    
  }

  const link = `/campaign/${id}/apply`;

  return (
    <Layout>
      <Topbar/>
      <LayoutContentWrapper>
        <Content>
          <Row style = {{ margin: '20px 10px 20px 30px' }}>
            <Col span={20}>
              <h3> Thông tin tuyển dụng</h3>
            </Col>
            <Col span={4} >
              <Button type="primary" style={{align: 'right'}} size="large"> 
                <Link to={link}>
                  Apply now
                </Link>
              </Button>
            </Col>
          </Row>
          <Divider />
          {title}
          <Divider />
          {description}
        </Content>
      </LayoutContentWrapper>
    </Layout>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampaign: (id) => dispatch(getCampaign(id))
  };
};
const mapStateToProps = (state) => {
  const { campaign, error } = state.candidateReducer;
  return { campaign, error };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetail);
