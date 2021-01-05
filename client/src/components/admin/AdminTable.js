import React, { useEffect, useContext, useState, useRef } from 'react';

import { Table, Modal, Form, Space, Button, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
// Handle file img to base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const AdminTable = (params) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // for table
  const [modalLoading, setModalLoading] = useState(false); // for add new blog modal
  const editRecord = useRef({});
  const [newBlog, setNewBlog] = useState({});
  const [visible, setVisible] = useState(false);
  const [isAddBlog, setIsAddBlog] = useState(true);
  const [fileImg, setFileImg] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: []
  });
  const [update, setUpdate] = useContext(UpdateAdminContext);

  // handle upload image
  const handleImgCancel = () => setFileImg({ previewImage: false });
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setFileImg({
      ...fileImg,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleChange = (({ fileList }) => {
    setFileImg({ fileList })
  });
  // end of upload image

  const userColumns = [
    {
      title: 'Ten',
      dataIndex: 'name',
      key: 'name',
      render: text => <span className="name">{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SDT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Thao tac',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <span className="action delete" onClick={(e, id=index+2) => handleDeleteUser(e, id)}>Xoa</span>
        </Space>
      ),
    },
  ];

  const blogColumns = [
    {
      title: 'Tieu de',
      dataIndex: 'title',
      key: 'title',
      render: text => <span className="name">{text}</span>,
    },
    {
      title: 'Noi bat',
      dataIndex: 'heading',
      key: 'heading',
    },
    {
      title: 'Noi dung 1',
      dataIndex: 'content1',
      key: 'content1',
    },
    {
      title: 'Noi dung 2',
      dataIndex: 'content2',
      key: 'content2',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Thao tac',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <span className="action" onClick={(e, id=index+1) => handleEditBlog(e, record, id)}>Sua</span>
          <span className="action delete" onClick={(e, id=index+1) => handleDeleteBlog(e, id)}>Xoa</span>
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
            heading: element[2],
            content1: element[3],
            content2: element[4],
            tag: element[5]
          }
          renderData.push(obj)
        }
      }
      setData(renderData)
      setLoading(false)
    })
    .catch((err) => {
      console.log(err)
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
      console.log(err)
      setLoading(false)
    })
  }

  const handleAddBlog = () => {
    setModalLoading(true);
    axios.post(`http://localhost:8080/admin/blogs/add`,
    {
      ...newBlog,
      image: fileImg.fileList && fileImg.fileList[0] && fileImg.fileList[0].thumbUrl
    },
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      if (res.status === 200) {
        alert(res.data.message)
        setUpdate(!update);
      }
      setModalLoading(false)
      setVisible(false)
    })
    .catch((err) => {
      console.log(err)
      setModalLoading(false)
      setVisible(false)
    })
  }

  const handleEditBlog = (e, record, id) => {
    setIsAddBlog(false);
    editRecord.current = record
    form.setFieldsValue(record)
    setVisible(true);
  }

  const handleUpdateBlog = async () => {
    setModalLoading(true);
    try {
      const res = await axios.post(`http://localhost:8080/admin/blogs/edit/${editRecord.current.key}`, 
      {
        ...newBlog,
        image: fileImg.fileList[0] && fileImg.fileList[0].thumbUrl
      },
      {
        withCredentials: true,
        credentials: 'include'
      })
      if (res.status === 200) {
        alert(res.data.message)
        setUpdate(!update)
      }
      setModalLoading(false)
      setVisible(false)
      setIsAddBlog(true)
    } catch (err) {
      console.log(err)
      setModalLoading(false)
      setVisible(false)
      setIsAddBlog(true)
    }
  }

  const handleDeleteBlog = async (e, id) => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/blogs/delete/${id}`,
      {
        withCredentials: true,
        credentials: 'include'
      })
      if (res.status === 200) {
        alert(res.data.message)
        setUpdate(!update)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const showModal = () => {
    form.setFieldsValue({})
    setIsAddBlog(true);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);  
  };

  const { previewVisible, previewImage, fileList, previewTitle } = fileImg;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const updateValues = (changedValues, allValues) => {
    setNewBlog({...allValues})
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
            Them Blog
          </Button>
          <Table loading={loading} bordered columns={blogColumns} dataSource={data} />
          <Modal
            title={isAddBlog ? "Add new blog" : "Edit Blog"}
            visible={visible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              {...formItemLayout}
              form={form}
              name="add"
              scrollToFirstError
              onValuesChange={updateValues}
            >
              <Form.Item
                name="title"
                label="Tieu de"
                rules={[{ required: true, message: 'Please input title!', whitespace: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="heading"
                label="Noi bat"
                rules={[{ required: true, message: 'Please input heading!'}]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="content1"
                label="Noi dung 1"
                rules={[{ required: true, message: 'Please input content1!'}]}
              >
                <TextArea autoSize={true} />
              </Form.Item>

              <Form.Item
                name="content2"
                label="Noi dung 2"
              >
                <TextArea autoSize={true} />
              </Form.Item>

              <Form.Item
                name="tag"
                label="Tag"
                rules={[{ required: true, message: 'Please input tag!'}]}
              >
                <Input />
              </Form.Item>

              <div className="task-attachment">
                <p className="task-attach-title">Them anh</p>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 2 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleImgCancel}
                >
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>

              <Form.Item {...tailFormItemLayout} style={{marginTop: "1rem"}}>
                <Button 
                  htmlType="button" 
                  onClick={() => handleCancel()}
                > 
                  Huy 
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  style={{marginLeft: "2rem"}}
                  onClick={isAddBlog ? handleAddBlog : handleUpdateBlog}
                  loading={modalLoading}
                >
                  {
                    isAddBlog ? "Them" : "Cap nhat"
                  }
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