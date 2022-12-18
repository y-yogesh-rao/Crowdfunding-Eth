import 'semantic-ui-css/semantic.min.css';

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
                description: <a>View Campaign</a>,
                fluid: true
            }
        });
    }

    render() {
        return <Layout>
            <h1> Running Campaigns </h1>
            <Button floated='right' content='Create Campaign' icon='add' primary />
            <Card.Group items={this.renderCampaigns()} />
        </Layout>   
    }
}

export default CampaignIndex;