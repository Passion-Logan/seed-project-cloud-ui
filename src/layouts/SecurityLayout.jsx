import React from 'react';
import { Redirect, connect } from 'umi';
import { getToken } from '@/utils/token';

class SecurityLayout extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/fetchUserInfo',
      });
    }
  }

  render() {
    const { children } = this.props;
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const token = getToken();

    if (!token) {
      return <Redirect to="/user/login" />;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
