import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectAllUsers } from '../../redux/usersSlice';
import { addNewPost } from '../../redux/postsSlice';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserID] = useState('');
    const [addStatusRequest, setAddStatusRequest] = useState('idle');

    const users = useSelector(selectAllUsers);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const canSave = [title, userId, content].every(Boolean) && addStatusRequest === 'idle';

    const handleSubmit = () => {
        if (canSave) {
            try {
                setAddStatusRequest('pending');
                dispatch(addNewPost({ title, body: content, userId })).unwrap();

                setTitle('');
                setContent('');
                setUserID('');
                navigate('/post');
            } catch (err) {
                console.error('Failed to save the post', err);
            } finally {
                setAddStatusRequest('idle');
            }
        }
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id} >
            {user.name}
        </option>
    ));

    return (
        <section style={containerStyle}>
            <h2 style={titleStyle}>Add a New Post</h2>
            {/* <form onSubmit={handleSubmit} style={formStyle}> */}
            <form style={formStyle}>
                <label htmlFor='postTitle' style={labelStyle}>Post Title:</label>
                <input
                    type='text'
                    id='postTitle'
                    name='postTitle'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                />
                <label htmlFor='postAuthor' style={labelStyle}>Author:</label>
                <select
                    id='postAuthor'
                    value={userId}
                    onChange={(e) => setUserID(e.target.value)}
                    style={inputStyle}
                >
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor='postContent' style={labelStyle}>Post Content:</label>
                <textarea
                    id='postContent'
                    name='postContent'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ ...inputStyle, height: '100px' }} // Adjust height of textarea
                />
                <button
                    type='button'
                    onClick={handleSubmit}
                    disabled={!canSave}
                    style={{
                        ...buttonStyle,
                        backgroundColor: canSave ? '#007bff' : '#ccc',
                        cursor: canSave ? 'pointer' : 'not-allowed',
                        pointerEvents: canSave ? 'auto' : 'none',
                    }}
                >
                    Save Post
                </button>
            </form>
        </section>
    )
}

const containerStyle = {
    textAlign: 'center',
    maxWidth: '400px',
    margin: 'auto', // Center the section horizontally
};

const titleStyle = {
    marginBottom: '20px', // Add space below the title
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
};

const labelStyle = {
    marginBottom: '8px', // Add space below labels
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '16px', // Add space below inputs
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.3s',
};

export default AddPostForm
