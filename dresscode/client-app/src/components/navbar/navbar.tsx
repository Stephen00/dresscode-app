import React, { Component } from "react";
import { Layout, Menu } from 'antd';
const { Header } = Layout;
import { Link } from 'react-router-dom';

import './navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div>
                <Layout className="layout">
                    <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            <Link to="/latest"><b className="page">Latest</b></Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/discover"><b className="page">Discover</b></Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/people"><b className="page">People</b></Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/more"><b className="page">More</b></Link>
                        </Menu.Item>
                    </Menu>
                    </Header>
                </Layout>
            </div>
        )
    }
}

export default Navbar;