import React, { Component } from 'react';

import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';

import Styles from './styles.m.css';

export default class Feed extends Component {
    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        return (
            <section className = {Styles.feed}>
                <StatusBar {...this.props} />
                <Composer {...this.props} />
                <Post {...this.props} />
            </section>
        );
    }
}