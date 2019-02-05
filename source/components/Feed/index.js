import React, { Component } from 'react';
import moment from 'moment';

import { withProfile } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

@withProfile
export default class Feed extends Component {
	state = {
		posts: [
			{ 
				id: '123', 
				comment: 'Hi, there!', 
				created: 1548705690, 
				likes: [] 
			},
			{ 
				id: '456', 
				comment: 'Hello', 
				created: 1548233434, 
				likes: [] 
			}
		],
		isPostFetching: false,
	};

	_setPostsFetchingState = (state) => {
		this.setState({
			isPostFetching: state,
		})
	};

	_createPost = async (comment) => {
		this.setState({
			isPostFetching: true,
		})

		const post = {
			id: getUniqueID(),
			created: moment.utc(),
			comment,
			likes: [],
		}

		await delay(1200);

		this.setState(({ posts }) => ({
			posts: [post, ...posts],
			isPostFetching: false,
		}));
	}

	_likePost = async (id) => {
	
		const { currentUserFirstName, currentUserLastName } = this.props;

		this._setPostsFetchingState(true);

		await delay(1200);

		const newPosts = this.state.posts.map(post => {
			if (post.id === id) {
				return {
					...post,
					likes: [
						{
							id: getUniqueID(),
							firstName: currentUserFirstName,
							lastName: currentUserLastName,
						}
					]
				}
			}

			return post;
		});

		this.setState({
			posts: newPosts,
			isPostFetching: false,
		});
	}
    

	_deletePost = async (id) => {
		this._setPostsFetchingState(true);
		await delay(1200);

		this.setState(({ posts }) => ({
			posts: posts.filter(postsAfterDelete => postsAfterDelete.id !== id ),
			isPostFetching: false,
		}));

	}

	render () {
		const { posts, isPostFetching } = this.state;

		const postsJSX = posts.map((post) => {
			return <Post key = { post.id } { ...post } _likePost = { this._likePost } _deletePost = { this._deletePost } />;
		});

		return (
			<section className = {Styles.feed}>
				<Spinner isSpinning = {isPostFetching} /> 
				<StatusBar {...this.props} />
				<Composer _createPost = {this._createPost} {...this.props} />
				{postsJSX}
			</section>
		);
	}
}