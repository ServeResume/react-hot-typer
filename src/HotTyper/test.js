import React from 'react';
import MovingCursor from './index';

const wrapperStyle = {
  fontFamily: 'Comic Sans MS',
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '25px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100%',
  padding: '20px',
  backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  backgroundSize: 'cover',
  boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.25)',
  boxSizing: 'border-box',
  textShadow: '-3px 3px 3px rgba(0,0,0,.7)'
};

class Test extends React.Component {
  render() {
    return (
      <div style={wrapperStyle}>
        <div
          style={{
            maxWidth: '500px',
            display: 'flex',
            justifyContent: 'stretch'
          }}
        >
          <MovingCursor
            style={{ fontSize: 32 }}
            text={[
              'Make your text animated',
              'Make your text elegent',
              'Make your text stylish',
              'Make your text stylish with ZERO effort from you ;).'
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Test;
