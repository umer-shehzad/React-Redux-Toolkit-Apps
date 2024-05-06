import React from 'react';

import { Routes, Route, Navigate } from "react-router-dom";

import './App.css';
import Layout from './components/navbar/Layout';
import CounterPage from './pages/CounterPage';
import PostsPage from './pages/PostsPage';
import Home from './pages/Home';
import FeedbackPage from './pages/FeedbackPage';
import AddFormPost from '../src/components/posts/AddPostForm';
import SinglePost from './components/posts/SinglePost';
import PostLayout from './components/navbar/PostLayout';
import EditPostForm from './components/posts/EditPostForm';

function App() {

  return (
    <main className='App'>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />

          <Route path='counter-app' >
            <Route index element={<CounterPage />} />
          </Route>

          <Route path='post' element={<PostLayout />} >
            <Route index element={<PostsPage />} />
            <Route path='add' element={<AddFormPost />} />
            <Route path=':postId' element={<SinglePost />} />
            <Route path='edit/:postId' element={<EditPostForm />} />
          </Route>

          <Route path='feedback'>
            <Route index element={<FeedbackPage />} />
          </Route>

          {/* Catch all - replace with 404 component */}
          <Route path='*' element={<Navigate to='/' replace />} />

        </Route>
      </Routes>

    </main>
  )
}

export default App
