import React, { ButtonHTMLAttributes } from 'react';

function CloseIcon(props: any) {
  return (
    <button {...props}>
      <div className="in">
        <div className="close-button-block"></div>
        <div className="close-button-block"></div>
      </div>
      <div className="out">
        <div className="close-button-block"></div>
        <div className="close-button-block"></div>
      </div>
    </button>
  );
}

export default CloseIcon;
