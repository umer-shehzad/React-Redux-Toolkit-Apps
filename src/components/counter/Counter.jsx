import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount, decrementByAmount } from './counterSlice';

const style = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
}

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
            <div style={style}>
                <button style={buttonStyle} onClick={() => dispatch(increment())}>+</button>
                <button style={buttonStyle} onClick={() => dispatch(decrement())}>-</button>
            </div><br />

            <div>
                <input
                    type='text'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ width: '40%', padding: '8px', fontSize: '16px', borderRadius: '5px' }}
                />
            </div><br />

            <div style={style}>
                <button style={buttonStyle} onClick={() => dispatch(incrementByAmount(value))}>
                    Add Amount
                </button>
                <button style={buttonStyle} onClick={() => dispatch(decrementByAmount(value))}>
                    Subtract Amount
                </button>
                <button style={buttonStyle} onClick={resetAll}>
                    Reset
                </button>
            </div>

        </section>
    )
}

export default Counter
