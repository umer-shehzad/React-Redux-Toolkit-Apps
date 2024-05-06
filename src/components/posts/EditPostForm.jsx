import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { deletePost, selectPostById, updatePost } from '../../redux/postsSlice';
import { selectAllUsers } from '../../redux/usersSlice';

import { containerStyle, formStyle, titleStyle, labelStyle, button, inputStyle } from '../../constants/Style';


const EditPostForm = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserID] = useState(post?.userId);
    const [addStatusRequest, setAddStatusRequest] = useState('idle');

    const dispatch = useDispatch();

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const canSave = [title, userId, content].every(Boolean) && addStatusRequest === 'idle';

    const handleSubmit = () => {
        if (canSave) {
            try {
                setAddStatusRequest('pending');
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap();

                setTitle('');
                setContent('');
                setUserID('');
                navigate(`/post/${postId}`);
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

    const onDeletePostClicked = () => {
        try {
            setAddStatusRequest('pending');
            dispatch(deletePost({ id: post.id })).unwrap();

            setTitle('');
            setContent('');
            setUserID('');
            navigate('/post');
        } catch (err) {
            console.err('Faied to delete the post', err);
        } finally {
            setAddStatusRequest('idle');
        }
    }

    return (
        <section style={containerStyle}>
            <h2 style={titleStyle}>Edit Post</h2>
            <form style={{ ...formStyle, gap: '16px'}}>
                <div>
                    <label htmlFor='postTitle' style={labelStyle}>Post Title:</label>
                    <input
                        type='text'
                        id='postTitle'
                        name='postTitle'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ ...inputStyle, marginBottom: 0}}
                    />
                </div>
                <div>
                    <label htmlFor='postAuthor' style={labelStyle}>Author:</label>
                    <select
                        id='postAuthor'
                        defaultValue={userId}
                        onChange={(e) => setUserID(e.target.value)}
                        style={{ ...inputStyle, marginBottom: 0 }}
                    >
                        <option value=""></option>
                        {userOptions}
                    </select>
                </div>
                <div>
                    <label htmlFor='postContent' style={labelStyle}>Post Content:</label>
                    <textarea
                        id='postContent'
                        name='postContent'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ ...inputStyle, height: '100px', marginBottom: 0 }} // Adjust height of textarea
                    />
                </div>
                <button
                    type='button'
                    onClick={handleSubmit}
                    disabled={!canSave}
                    style={{
                        ...button,
                        backgroundColor: canSave ? '#007bff' : '#ccc',
                        cursor: canSave ? 'pointer' : 'not-allowed',
                        pointerEvents: canSave ? 'auto' : 'none',
                    }}
                >
                    Save Post
                </button>
                <button
                    type='button'
                    onClick={onDeletePostClicked}
                    // disabled={!canSave}
                    // style={{
                    //     ...buttonStyle,
                    //     backgroundColor: canSave ? '#007bff' : '#ccc',
                    //     cursor: canSave ? 'pointer' : 'not-allowed',
                    //     pointerEvents: canSave ? 'auto' : 'none',
                    // }}
                    style={button}
                >
                    Delete Post
                </button>
            </form>
        </section>
    )
}

// const inputStyle = {
//     width: '100%',
//     padding: '8px',
//     // marginBottom: '16px', // Add space below inputs
// };

export default EditPostForm
