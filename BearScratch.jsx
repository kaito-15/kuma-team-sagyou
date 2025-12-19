import React, { useEffect, useState } from 'react';

const BearScratch = ({ active, onComplete }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (active) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                if (onComplete) onComplete();
            }, 1000); // Animation duration
            return () => clearTimeout(timer);
        }
    }, [active, onComplete]);

    if (!show) return null;

    return (
        <div style={styles.container}>
            <style>
                {`
          @keyframes swipe {
            0% {
              transform: translate(100%, -100%) scale(1.5);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            100% {
              transform: translate(-50%, 50%) scale(1.5);
              opacity: 1;
            }
          }
          @keyframes slash {
            0% {
              stroke-dasharray: 0, 1000;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            100% {
              stroke-dasharray: 1000, 0;
              opacity: 0;
            }
          }
           @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
          }
          .scratch-path {
             animation: slash 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
             filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.8));
          }
          .bear-paw {
            position: absolute;
            top: 0;
            right: 0;
            width: 800px; /* Adjust size as needed */
            height: auto;
            pointer-events: none;
            z-index: 10000;
            animation: swipe 0.4s cubic-bezier(0.1, 0.7, 1.0, 0.1) forwards;
            transform-origin: center;
          }
        `}
            </style>
            <div style={styles.overlay}>
                {/* Bear Paw Image */}
                <img src="./bear_paw.png" className="bear-paw" alt="Bear Paw" />

                <div style={{ ...styles.shakeWrapper, animation: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both', animationDelay: '0.1s' }}>
                    <svg viewBox="0 0 500 500" style={styles.svg}>
                        {/* Left Claw */}
                        <path
                            d="M100,50 Q120,200 80,450"
                            fill="none"
                            stroke="#FF0000"
                            strokeWidth="15"
                            strokeLinecap="round"
                            className="scratch-path"
                            style={{ animationDelay: '150ms' }}
                        />
                        {/* Middle Claw */}
                        <path
                            d="M250,20 Q280,200 240,480"
                            fill="none"
                            stroke="#FF0000"
                            strokeWidth="20"
                            strokeLinecap="round"
                            className="scratch-path"
                            style={{ animationDelay: '200ms' }}
                        />
                        {/* Right Claw */}
                        <path
                            d="M400,50 Q380,200 420,450"
                            fill="none"
                            stroke="#FF0000"
                            strokeWidth="15"
                            strokeLinecap="round"
                            className="scratch-path"
                            style={{ animationDelay: '250ms' }}
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
    },
    overlay: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden', // Keep paw swipe within bounds if needed
    },
    shakeWrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    svg: {
        width: '80%',
        height: '80%',
        overflow: 'visible',
        transform: 'rotate(-15deg)',
    }
};

export default BearScratch;
