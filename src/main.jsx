import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './redux/store.jsx';
import App from './App.jsx';
import { fetchUsers } from './redux/usersSlice.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchPosts } from './redux/postsSlice.jsx';

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
)
