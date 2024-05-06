import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateFeedback, deleteFeedback } from './feedbackSlice';
import { button, buttonDiv } from '../../constants/Style';

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

        <div style={buttonDiv}>
          <button style={button} onClick={() => dispatch(updateFeedback(feedbackContent))}>Update</button>
          <button style={button} onClick={() => dispatch(deleteFeedback())}>Delete</button>
        </div>
      </div>

      <p style={{ textAlign: 'justify', marginLeft: '266px' }}>
        Your Feedback: {feedbackMsg}
      </p>
    </section>
  )
}

export default Feedback
