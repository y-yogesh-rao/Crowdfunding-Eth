import React, { Component } from 'react';
import Layout from '../../components/Layout';

class CampaignShow extends Component {
    state = {
        campaignAddress: ''
    };

    static async getInitialProps(props) {
        const campaignAddress = props.query.campaignAddress;
        
        return campaignAddress;
    }

    render() {
        return <Layout>
            
        </Layout>
    }
}

export default CampaignShow;