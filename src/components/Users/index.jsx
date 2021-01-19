import React, { useEffect, useMemo, useCallback } from 'react';
import {
  Table, message, Button, Popconfirm,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import usePagination from '../../utils/hooks/usePagination';
import { usersSelector } from '../../store/users/selectors';
import { fetchUsers, deleteUser } from '../../store/users/actions';

const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
  },
  {
    title: 'Updated At',
    dataIndex: 'updated_at',
  },
  {
    title: 'Actions',
    render: (v, record) => (
      <Popconfirm title='Sure to delete?' onConfirm={() => record.handleDelete(record.id)}>
        <Button type='link' danger icon={<DeleteOutlined />}>
          Delete
        </Button>
      </Popconfirm>
    ),
  },
];

const Users = () => {
  const dispatch = useDispatch();
  const [users, total, loading] = useSelector(usersSelector);
  const [pagination, paginationOptions] = usePagination();

  const fetchData = useCallback(() => {
    dispatch(fetchUsers({
      ...pagination,
    }));
  }, [dispatch, pagination]);

  const handleDelete = useCallback(async (id) => {
    const { data, error } = await dispatch(deleteUser(id));
    if (error) message.error('Unable to delete account');
    else if (data) {
      message.success('Successfully deleted');
      fetchData();
    }
  }, []);

  const dataSource = useMemo(
    () => users.map((account) => ({ ...account, handleDelete })),
    [users, handleDelete],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Table
      columns={COLUMNS}
      loading={loading}
      dataSource={dataSource}
      pagination={{
        total,
        ...paginationOptions,
      }}
    />
  );
};

export default Users;
