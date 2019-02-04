import React, { Component } from 'react';
import moment from 'moment';
import { func, string, number, array } from 'prop-types';

import Like from 'components/Like';
import {withProfile} from 'components/HOC/withProfile';
import Styles from './styles.m.css';

@withProfile
export default class Post extends Component { 
    static propTypes = {
        _likePost:      func.isRequired,
        _deletePost:    func.isRequired,
        comment:        string.isRequired,
        created:        number.isRequired,
        id:             string.isRequired,
        likes:          array.isRequired,
    };

    _deletePost = () => {
        const { _deletePost, id } = this.props;
        _deletePost(id);
    }

    render () {
        const { comment, created, _likePost, id, likes, avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } 
                        onClick = { this._deletePost }
                        id = {id}></span>
                <img src = {avatar} />
                <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss')}</time>
                <p>{comment}</p>
                <Like 
                    _likePost = {_likePost} 
                    id = {id} 
                    likes = {likes}
                />
            </section>
        );
    }
}