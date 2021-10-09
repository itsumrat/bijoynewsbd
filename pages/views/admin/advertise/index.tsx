import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Table, Image, message} from 'antd';
import { FormInstance } from 'antd/lib/form';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import isAuthenticated from 'src/utils/isAuthenticated';
import isAdmin from 'src/utils/isAdmin';
import AdminLayout from 'components/layouts/adminLaout';
import httpClient from 'src/utils/httpClient';
import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { constants } from '../../../../constants';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

  
const AdvertisePage: NextPage<any> = ({ advertises })=>{
  console.log(advertises);
    const formRef = React.createRef<FormInstance>();
    const [adds, setAdds] = useState([]);
    const [file, setFile] = useState(null);
    const router = useRouter()
    const handleDelete = useCallback((id)=>{
      void httpClient.delete(`/admin/advertise/${id}`)
      .then(_res=>{
        setAdds(prevState=>{
          return prevState.filter(ad=>ad.id != id);
          
        })
        void message.error("Successfully deleted");
      }).catch(_err=>{
        void message.error("Couldn't delete");
      })
    },[]);

    const columns = [
      {
        title: 'Note',
        dataIndex: 'note',
        key: 'id',
        // eslint-disable-next-line react/display-name
        render: (note: string) => {
          return <h5>{note}</h5>;
        },
      },
      {
        title: 'Url',
        dataIndex: 'url',
        key: 'id',
        // eslint-disable-next-line react/display-name
        render: (url: string) => {
          return <a href={url}>{url}</a>;
        },
      },
      {
        title: 'Banner',
        dataIndex: 'banner',
        key: 'id',
        // eslint-disable-next-line react/display-name
        render: (banner: string)=> {
          console.log(banner);
          return  <Image height={200} src={banner} />;
        }
      },
      {
        title: 'Action',
        key: 'id',
        // eslint-disable-next-line react/display-name
        render: (add: any)=>{
          return <DeleteOutlined onClick={()=>handleDelete(add.id)} style={{cursor: 'pointer'}} />;
        }
      },
    ];


    useEffect(()=>{
      setAdds(advertises.items);
    },[advertises]);
    const onFinish = (values: any) => {
      const formData = new FormData();
      formData.append('file', file);
      httpClient.post('/admin/image/upload', formData)
      .then(r=>{
        void httpClient.post('/admin/advertise', {
          note: values.note,
          url: values.url,
          banner: r.data.Location,
        }).then(res=>{
          console.log(res);
          setAdds(prevState=>{
            return[
              res.data,
              ...prevState,
            ]
          });
          void message.success('Successfully created');
        }).catch(_err=>{
          void message.error("Couldn't create");
        })
      })
      .catch(er=>{
        console.error(er);
        void message.error("Couldn't create");
      })
    };
  

      
      const props = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onRemove: (_file: any) => {
            setFile(null);
        },
        beforeUpload: (file: any) => {
            setFile(file)
            return false;
        },
    };

    const onChange = (page: any)=>{
      router.push(`${constants.BASE_URL}/admin/advertise?page=${page}&limit=10`)
  }
  const  itemRender =(current: any, type: string, originalElement: any) =>{
      if (type === 'prev') {
          return <Link href={advertises.links.previous || '/admin/advertise'}><a>Prev</a></Link>;
      }
      if (type === 'next') {
          return <Link  href={advertises.links.next || '/admin/advertise'}><a>Next</a></Link>;
      }
      return originalElement;
  }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3>Advertisements</h3>
                    <div className="col-md-12">
                        <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
                            <Form.Item name="note" label="Note" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="url" label="Url" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="banner" label="Advertise banner">
                                <Upload.Dragger {...props} multiple={false} name="file">
                                    <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                </Upload.Dragger>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="col-md-12">
                        <h4>Advertisements banner list</h4>
                        <Table pagination={{
                              current: advertises.meta.currentPage,
                              total: advertises.meta.totalItems,
                              pageSize: advertises.meta.itemsPerPage,
                              itemRender,
                              onChange

                          }} 
                          bordered 
                          columns={columns}
                          dataSource={adds} />
                    </div>
                </div>
            </div>
        </div>
    );
}

if(isAuthenticated() && isAdmin()) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  AdvertisePage.Layout = AdminLayout;
}

export async function getServerSideProps(ctx: NextPageContext) {


  return { props: {
          advertises: JSON.parse(JSON.stringify(ctx.query.advertises))
      } };
}
export default AdvertisePage;