import { useState } from 'react';

export default function InteractiveCounter() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>Interactive Counter Demo</h3>
            <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: 'var(--color-accent)'
            }}>
                {count}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button
                    onClick={() => setCount(count - 1)}
                    style={{
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg)',
                        color: 'var(--color-text)',
                    }}
                >
                    Decrement
                </button>
                <button
                    onClick={() => setCount(0)}
                    style={{
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg)',
                        color: 'var(--color-text)',
                    }}
                >
                    Reset
                </button>
                <button
                    onClick={() => setCount(count + 1)}
                    style={{
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-accent)',
                        color: 'white',
                    }}
                >
                    Increment
                </button>
            </div>
        </div>
    );
}
