import React, { useCallback } from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  message, Spin,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './index.module.scss';
import Routes from '../../config/routes';
import { signedUserSelector } from '../../store/auth/selectors';
import { signUp } from '../../store/auth/actions';

const formWrapperStyle = {
  height: '100%',
};

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [,, loading] = useSelector(signedUserSelector);

  const onFinish = useCallback((form) => {
    dispatch(signUp(form)).then(({ data, error }) => {
      if (error) message.error('Unable ro register');
      if (!error && data) {
        message.success('Successfully registered. ');
        setTimeout(() => history.push(Routes.LOGIN), 3000);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <Row align='middle' style={formWrapperStyle} justify='center'>
        <Col xs={18} md={16} xl={12} xxl={6}>
          <Form labelCol={{ span: 8 }} name='basic' onFinish={onFinish} layout='vertical'>
            <Form.Item
              label='Name'
              name='name'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

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
              <Button type='primary' htmlType='submit'>
                {loading ? (
                  <Spin style={{
                    marginLeft: '15px',
                  }}
                  />
                ) : 'Sign Up'}
              </Button>
              <span style={{ margin: '0px 10px' }}>or</span>
              <Link to={Routes.LOGIN}>Sign in</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
