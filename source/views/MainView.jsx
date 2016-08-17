import React, { Component } from 'react';
import { Page } from 'react-onsenui';
import { Link } from 'react-router';

export class MainView extends Component {
    render() {
        return (
            <Page>
                <Link to='/coming' className='button'>Book room</Link>
            </Page>
        );
    }
}
