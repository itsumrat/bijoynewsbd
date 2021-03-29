import React, {useContext, useState} from 'react';

import {Dropdown, Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ProfileOutlined,
    BookOutlined,
    MailOutlined,
    UserOutlined
} from '@ant-design/icons';
import Link from "next/link";
import {ProfileContext} from "../../context/ProfileContext";
import {useRouter} from "next/router";


const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const AdminLayout: React.FC =({children}: { children: React.ReactChildren }) => {
    const [collapsed, setCollapsed] = useState(false);
    const profileCtx = useContext(ProfileContext);
    const router = useRouter();

    const toggle = () => {
        setCollapsed(prevState => !prevState)
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        router.push('/')
    }
    const profileMenu = (
        <Menu>
            <Menu.Item>
                <a className="text-capitalize">
                    {profileCtx.user && profileCtx.user.name}
                </a>
            </Menu.Item>
            <Menu.Item>
                <a className="text-capitalize">
                    {profileCtx.user && profileCtx.user.role}
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={handleLogout}>
                    Logout
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{display: 'flex', flexDirection: 'column'}}>
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
                </Menu>
                <Menu className="mt-auto" theme="dark">
                        <Menu.Item key="notifications" icon={<UserOutlined />}> <Dropdown overlay={profileMenu} placement="topRight" arrow>
                            <a>Profile</a>
                        </Dropdown></Menu.Item>
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
