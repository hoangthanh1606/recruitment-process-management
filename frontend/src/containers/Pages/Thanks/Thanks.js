import React from 'react';
import ThanksStyleWrapper from './Thanks.style';
import { Button } from 'antd';
import {Link} from 'react-router-dom';

function Thanks() {
  return (
    <ThanksStyleWrapper>
      <div className="content">
        <div>
          Thanks for your submission
        </div>
        <Button 
          type="primary"
          size="large"
        >
          <Link to="/">
            BACK
          </Link>
        </Button>
      </div>
      
    </ThanksStyleWrapper>
  );
}

export default Thanks;
