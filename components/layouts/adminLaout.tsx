import React, {useState} from 'react';

import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ProfileOutlined,
    BookOutlined,
    UploadOutlined,
    MailOutlined,
    BellOutlined
} from '@ant-design/icons';
import Link from "next/link";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const AdminLayout: React.FC =({children}: { children: React.ReactChildren }) => {
    const [collapsed, setCollapsed] = useState(false);


    const toggle = () => {
        setCollapsed(prevState => !prevState)
    };
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" >
                    <h2 className="p-1 text-white">Bijoy News</h2>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<ProfileOutlined />}>
                      <Link href="/admin">
                          <a >Categories</a>
                      </Link>
                    </Menu.Item>

                    {/*<Menu.Item key="3" icon={<UploadOutlined />}>*/}
                    {/*    <Link href="/">*/}
                    {/*        <a>Not yet</a>*/}
                    {/*    </Link>*/}
                    {/*</Menu.Item>*/}
                    <SubMenu key="posts" icon={<MailOutlined />} title="Posts">
                        <Menu.Item key="all-posts" icon={<BookOutlined />}>
                            <Link href="/admin/posts">
                                <a>Posts</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="new-story" icon={<BookOutlined />}>
                            <Link href="/admin/new-story">
                                <a>New Post</a>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    {/*<Menu.Item key="notifications" icon={<BellOutlined />}>Notifications</Menu.Item>*/}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 'calc(100vh - 120px)',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}
export default AdminLayout;
