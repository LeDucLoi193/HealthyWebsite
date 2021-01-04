import React, { useEffect, useContext, useState } from 'react';

import { Table, Modal, Form, Space, Button, Input } from 'antd';
import { UpdateAdminContext } from '../../contexts/update';

const { TextArea } = Input;

const axios = require('axios')

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AdminTable = (params) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // for table
  const [modalLoading, setModalLoading] = useState(false); // for add new blog modal
  const [newBlog, setNewBlog] = useState({});
  const [visible, setVisible] = useState(false);
  const [update, setUpdate] = useContext(UpdateAdminContext);

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <span className="action" onClick={(e, id=index+2) => handleDeleteUser(e, id)}>Delete</span>
        </Space>
      ),
    },
  ];

  const blogColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => <a href="#">{text}</a>,
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      key: 'topic',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <span className="action">Edit</span>
          <span className="action">Delete</span>
        </Space>
      ),
    },
  ];

  useEffect( () => {
    setLoading(true);
    axios.get(`http://localhost:8080/admin/${params.currentKey}`, 
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      let renderData = [];
      if (res.data.message === "users") {
        for (let element of res.data.data) {
          if (element[1] !== "admin") {
            const obj = {
              key: element[0],
              name: element[1],
              email: element[2],
              phone: element[4],
            }
            renderData.push(obj)
          }
        }
      }
      else {
        for (let element of res.data.data) {
          const obj = {
            key: element[0],
            title: element[1],
            topic: element[4],
          }
          renderData.push(obj)
        }
      }
      setData(renderData)
      setLoading(false)
    })
    .catch((err) => {
      alert(err)
      setLoading(false)
    })
  }, [params.currentKey, update])

  const handleDeleteUser = (e, id) => {
    axios.get(`http://localhost:8080/admin/users/delete/${id}`, 
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      if (res.status === 200) {
        setUpdate(!update)
      }
      setLoading(false)
    })
    .catch((err) => {
      alert(err)
      setLoading(false)
    })
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAddBlog = () => {
    setModalLoading(true);
    axios.post(`http://localhost:8080/admin/blogs/add`,
    {
      ...newBlog
    },
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      if (res.status === 200) {
        setUpdate(!update);
      }
      setModalLoading(false)
      setVisible(false)
    })
    .catch((err) => {
      alert(err)
      setModalLoading(false)
      setVisible(false)
    })
  }

  return (
    <div>
      {
        params.currentKey === "users" ?
          <Table loading={loading} bordered columns={userColumns} dataSource={data} />
        :
        <div>
          <Button
            onClick={showModal}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Add new Blog
          </Button>
          <Table loading={loading} bordered columns={blogColumns} dataSource={data} />
          <Modal
            title="Add new blog"
            visible={visible}
            onCancel={() => handleCancel()}
            footer={null}
          >
            <Form
              {...formItemLayout}
              form={form}
              name="add"
              scrollToFirstError
            >
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input title!', whitespace: true }]}
              >
                <Input onChange={(e) => setNewBlog({...newBlog, title: e.target.value})} />
              </Form.Item>
              <Form.Item
                name="heading"
                label="Heading"
                rules={[{ required: true, message: 'Please input heading!'}]}
              >
                <Input onChange={(e) => setNewBlog({...newBlog, heading: e.target.value})} />
              </Form.Item>

              <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true, message: 'Please input content!'}]}
              >
                <TextArea autoSize={true} onChange={(e) => setNewBlog({...newBlog, content: e.target.value})} />
              </Form.Item>

              <Form.Item
                name="topic"
                label="Topic"
                rules={[{ required: true, message: 'Please input topic!'}]}
              >
                <Input onChange={(e) => setNewBlog({...newBlog, topic: e.target.value})} />
              </Form.Item>

              <Form.Item {...tailFormItemLayout} style={{marginTop: "1rem"}}>
                <Button 
                  htmlType="button" 
                  onClick={() => handleCancel()}
                > 
                  Cancel 
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  style={{marginLeft: "2rem"}}
                  onClick={handleAddBlog}
                  loading={modalLoading}
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      }
    </div> 
  );
}

export default AdminTable;