import React, { Component } from 'react';
import { Page } from 'react-onsenui';
import { Link } from 'react-router';

import './main-view.less';

export class MainView extends Component {
    render() {
        return (
            <Page>
                <div className='page-inner-content
                                page-inner-content_main-view'>
                    <div className='main-view__title'>
                        Hostel App
                    </div>
                    <div className='main-view__book-room'>
                        <Link to='/coming'
                              className='button
                                         button--large
                                         button_theme'>
                            Book room
                        </Link>
                    </div>
                </div>
            </Page>
        );
    }
}
