import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const Header = (props) => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Menu.Item name='logo' content='Logo' />

            <Menu.Menu position='right'>
                <Menu.Item name='campaigns' content='Campaigns' />
                <Menu.Item name='new-campaign' content='+' />
            </Menu.Menu>
        </Menu>
    )
}

export default Header;