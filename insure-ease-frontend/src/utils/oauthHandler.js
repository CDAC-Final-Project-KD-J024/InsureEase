import { handleThirdPartyLogin } from '../slices/authSlice';
import store from '../store/store';

const handleOAuthCallback = (token, user) => {
  store.dispatch(handleThirdPartyLogin(token, user));
};

export default handleOAuthCallback;
