// src/components/ComicPanel.js
import React, { useState } from 'react';

const ComicPanel = ({ panelNumber, onTextChange }) => {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
        onTextChange(panelNumber, e.target.value);
    };

    return (
        <div className="comic-panel">
            <textarea
                placeholder={`Enter text for Panel ${panelNumber}`}
                value={text}
                onChange={handleTextChange}
            />
        </div>
    );
};

export default ComicPanel;
