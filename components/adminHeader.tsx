import React, {useState} from 'react';
import { Drawer, Button, Radio, Space } from 'antd';

const AdminHeader: React.FC = ()=>{
    const [visible, setVisible] = useState<boolean>(false);
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false)
    };

    return(
        <div>
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <Drawer
                title="Basic Drawer"
                placement={'left'}
                closable={false}
                onClose={onClose}
                visible={visible}

            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    );
}

export default AdminHeader;
