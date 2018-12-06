import { connect } from 'dva';
import { Table, Pagination, Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../constants';

function Users({ dispatch, list: dataSource, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id
    })
  }

  function pageChangeHandle(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page }
    }))
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website'
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <a href=''>Edit</a>
          <Popconfirm title='Confirm to delete?' onConfirm={deleteHandler.bind(null, record.id)}>
            <a href=''>Delete</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  return (
    <div className={styles.normal}>
      <div>
        <Table dataSource={dataSource} columns={columns} rowKey={record => record.id} pagination={false} />
        <Pagination className='ant-table-pagination' total={total} current={current} pageSize={PAGE_SIZE} onChange={pageChangeHandle} />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    list,
    total,
    page
  }
}

export default connect(mapStateToProps)(Users)
