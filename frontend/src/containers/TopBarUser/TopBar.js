import React from 'react';
import { Layout } from 'antd';
import {Link} from 'react-router-dom';
import "./style.css"

const { Header } = Layout;

function Topbar() {

  return (
    <Layout>
        <Header>
            <div className="topbar-user">
                <h1>BumbleBee</h1>
                <Link to="/signin">
                    <span>Log in</span>
                </Link>
            </div>
        </Header>
  </Layout>
  );
}

export default (Topbar);
