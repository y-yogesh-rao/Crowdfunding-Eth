import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
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
        return <div>
            <Card.Group items={this.renderCampaigns()} />
            <Button content='Create Campaign' icon='add' secondary />
        </div>
    }
}

export default CampaignIndex;