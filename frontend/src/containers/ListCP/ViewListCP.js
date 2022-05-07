import React, { useEffect }  from 'react';
import Button from '@iso/components/uielements/button';
import { Card,  Divider, Tag } from 'antd';
import Topbar from '../TopBarUser/TopBar';
import { getCandidateListCampaign } from "@iso/redux/candidate/actions";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import "./style.css";
import datoToString from "@iso/lib/helpers/convertDateToString";
import todayMinusDate from "@iso/lib/helpers/todayMinusDate";

function ViewListCP({ getListCampaign, campaignList, error }) {


  useEffect(() => {
    getListCampaign();
  }, []);
  
  const history = useHistory();
  const handleViewCampaignDetail = (campaign) => {
    history.push(`/campaign/${campaign.id}`);
  }
  
  let card = [];
  let data = campaignList.data.data;
  if (data) {
    data.forEach((campaign) => {
      if (campaign.isActive === true) {
        let date = new Date(campaign.endDate);
        const day = todayMinusDate(date);
        let data;
        if (day) {
          data = (<div className="des-card">Remain: {day} day</div>);
        } else {
          data = (<div className="des-card">End date: {datoToString(campaign.endDate)}</div>);
        }
        let technology = campaign.technologies.toString().split(',');
        let position = campaign.positions.toString().split(',');
        card = [
         ...card,
            (
              <div className="card-section">
                <Card>
                  <div className="card-img">
                    <img src={campaign.image}></img>
                  </div>
                  <p className="title-card">{campaign.name}</p>
                  {data}
                  <div>
                    {technology.map(tech => (
                      <Tag color="blue" key={tech}>
                        {tech}
                      </Tag>
                    ))}
                  </div>
                  <div>
                    {position.map(pos => (
                      <Tag color="blue" key={pos}>
                        {pos}
                      </Tag>
                    ))}
                  </div>
                  <Divider />
                  <Button className="btn-detail" onClick={() => handleViewCampaignDetail(campaign)}>Detail</Button>
                </Card>
              </div>
            ),
        ];
      } 
    });
  }
  return (
    <div>
        <Topbar />
        <div className="container">
            <h2 className="title-list">List Campaign</h2>
            <div className="container-card">
              {card}
            </div>
        </div>
    </div>
    
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    getListCampaign: (query) => dispatch(getCandidateListCampaign(query)),
  };
};
const mapStateToProps = (state) => {
  const { campaignList, error } = state.candidateReducer;
  return {
    campaignList,
    error
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewListCP);