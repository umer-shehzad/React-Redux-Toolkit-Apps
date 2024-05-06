import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateFeedback, deleteFeedback } from './feedbackSlice';

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
}

const style = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px'
}

const Feedback = () => {
  const feedbackMsg = useSelector((state) => state.feedback.message);
  const dispatch = useDispatch();
  const [feedbackContent, setFeedbackContent] = useState('');

  return (
    <section>

      <div>
        <label >
          Write your feedback:
          <textarea
            name="feedbackContent"
            value={feedbackContent}
            onChange={(e) => setFeedbackContent(e.target.value)}
            rows={6}
            cols={80}
          />
        </label>

        <div style={style}>
          <button style={buttonStyle} onClick={() => dispatch(updateFeedback(feedbackContent))}>Update</button>
          <button style={buttonStyle} onClick={() => dispatch(deleteFeedback())}>Delete</button>
        </div>
      </div>

      <p style={{ textAlign: 'justify', marginLeft: '266px' }}>
        Your Feedback: {feedbackMsg}
      </p>
    </section>
  )
}

export default Feedback
