import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount, decrementByAmount } from './counterSlice';
import { button, buttonDiv } from '../../constants/Style';

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(0);

    const value = Number(amount) || 0;

    const resetAll = () => {
        setAmount(0)
        dispatch(reset());
    }

    return (
        <section> 
            <p style={{ fontSize: '24px' }}>Count: {count}</p>
            <div style={buttonDiv}>
                <button style={button} onClick={() => dispatch(increment())}>+</button>
                <button style={button} onClick={() => dispatch(decrement())}>-</button>
            </div><br />

            <div>
                <input
                    type='text'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ width: '40%', padding: '8px', fontSize: '16px', borderRadius: '5px' }}
                />
            </div><br />

            <div style={buttonDiv}>
                <button style={button} onClick={() => dispatch(incrementByAmount(value))}>
                    Add Amount
                </button>
                <button style={button} onClick={() => dispatch(decrementByAmount(value))}>
                    Subtract Amount
                </button>
                <button style={button} onClick={resetAll}>
                    Reset
                </button>
            </div>

        </section>
    )
}

export default Counter
