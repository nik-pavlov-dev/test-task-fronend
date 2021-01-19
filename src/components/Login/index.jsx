import React, { useCallback } from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Spin,
  message,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './index.module.scss';
import Routes from '../../config/routes';
import { signedUserSelector } from '../../store/auth/selectors';
import { login } from '../../store/auth/actions';

const formWrapperStyle = {
  height: '100vh',
};

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [,, loading] = useSelector(signedUserSelector);

  const onFinish = useCallback(({ email, password }) => {
    dispatch(login(email, password)).then(({ error, data }) => {
      if (error) message.error('Unable to login');
      if (data && !error) history.push(Routes.HOME);
    });
  }, [history]);

  return (
    <div className={styles.container}>
      <Row align='middle' justify='center' style={formWrapperStyle}>
        <Col xs={18} md={16} xl={12} xxl={6}>
          <Form labelCol={{ span: 8 }} name='basic' onFinish={onFinish} layout='vertical'>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  type: 'email',
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' disabled={loading}>
                Log in
              </Button>
              <span style={{ margin: '0px 10px' }}>or</span>
              <Link to={Routes.REGISTER}>Sign up</Link>
              {loading ? (
                <Spin style={{
                  marginLeft: '15px',
                }}
                />
              ) : null}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
