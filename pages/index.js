import 'semantic-ui-css/semantic.min.css';

import { Link } from '../routes';
import React, { Component } from 'react';
import Layout from '../components/Layout.js';
import { Card, Button } from 'semantic-ui-react';
import campaignFactoryInstance from '../ethereum/campaignFactory.js';

class CampaignIndex extends Component {

    static async getInitialProps() {
        const campaings = await campaignFactoryInstance.methods.getCampaigns().call();
        console.log(campaings)
        return { campaings };
    }

    renderCampaigns() {
        return this.props.campaings.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            }
        });
    }

    render() {
        return <Layout>
            <h1> Running Campaigns </h1>

            <Link route={'/campaigns/new'}>
                <Button 
                    primary 
                    icon='add' 
                    floated='right' 
                    content='New Campaign'
                />
            </Link>
            <Card.Group items={this.renderCampaigns()} />
        </Layout>   
    }
}

export default CampaignIndex;