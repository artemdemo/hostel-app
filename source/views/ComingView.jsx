import React, { Component } from 'react';
import { Page, Toolbar } from 'react-onsenui';

export class ComingView extends Component {
    render() {
        return (
            <Page>
                <Toolbar inline>
                    <div className='center'>
                        When are you coming?
                    </div>
                </Toolbar>
            </Page>
        );
    }
}
