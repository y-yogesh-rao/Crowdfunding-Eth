import React from 'react';
import { Link } from '../routes';
import { Menu, Icon } from 'semantic-ui-react';

const Header = (props) => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link route="/">
                <a className='item'> CrowdFundzzz </a>
            </Link>

            <Menu.Menu position='right'>
                <Link route="/">
                    <a className='item'> Campaigns </a>
                </Link>

                <Link route="/campaigns/new">
                    <a className='item'> + </a>
                </Link>
            </Menu.Menu>
        </Menu>
    )
}

export default Header;