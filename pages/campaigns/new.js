import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import campaignFactory from '../../ethereum/campaignFactory.js';

import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

class CampaignNew extends Component {
    state = {
        loading: false,
        errorMessage: '',
        minimumContribution: ''
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            await campaignFactory.methods
                .createCampaign(this.state.minimumContribution)
                .send({ from: accounts[0] });

            this.setState({ errorMessage: '' });
        } catch(error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ loading: false });
    };

    render() {
        return <Layout>
            <Form onSubmit={this.onSubmit} error={ !!this.state.errorMessage }>
                <h3> Create New Campaign </h3>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input 
                        label='Wei' 
                        placeholder='100' 
                        labelPosition='right'
                        value={ this.state.minimumContribution }
                        onChange={ event => this.setState({ minimumContribution: event.target.value }) }
                    />
                </Form.Field>

                <Message error header="Oops! Something's Wrong" content={ this.state.errorMessage } />
                <Button loading={ this.state.loading } yype='submit' primary>Create Campaign</Button>
            </Form>
        </Layout>
    }
}

export default CampaignNew;