import React, { useState } from 'react';
import { Link, useHistory, Redirect, useLocation} from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import SignInStyleWrapper from './SignIn.styles';
import authAction from '@iso/redux/auth/actions';
import appAction from '@iso/redux/app/actions';
import { notification } from '@iso/components';
import axios from 'axios'

const { login } = authAction;
const { clearMenu } = appAction;

export default function SignIn() {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const isLoginFail = useSelector((state) => !state.Auth.isSuccess);
  const isLoading = useSelector((state) => state.Auth.isLoading);

  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  React.useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);
  
  React.useEffect(() => {
    if (isLoginFail) {
      notification("error", "Login failed");
    }
  }, [isLoginFail]);

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  function handleLogin(e, token = false) {
    const regEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!(state.email && state.password)) {
      notification("error", "Please fill in email and password");
      return;
    } else if (!regEx.test(state.email)) {
      notification("error", "Email is not valid");
    } else
    dispatch(login({email: state.email, password: state.password}));
    dispatch(clearMenu());
  }

  let { from } = location.state || { from: { pathname: '/dashboard' } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/signin">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">
            <form>
              <div className="isoInputWrapper">
                <label>
                  Email:
                </label>
                <Input
                  name="email"
                  size="large"
                  placeholder="Username"
                  autoComplete="true"
                  value={state.email}
                  onChange={handleChange}
                />
              </div>

              <div className="isoInputWrapper">
                <label>
                  Password:
                </label>
                <Input
                  name="password"
                  size="large"
                  type="password"
                  placeholder="Password"
                  autoComplete="false"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                {/* <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link> */}
                <Button disabled={isLoading} type="primary" onClick={handleLogin}>
                  {isLoading ? 'Login...' : <IntlMessages id="page.signInButton" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
