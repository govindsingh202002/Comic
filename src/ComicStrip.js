// src/components/ComicStrip.js
// src/components/ComicStrip.js
import './ComicStrip.css';
// ...

import React, { useState } from 'react';
import ComicPanel from './ComicPanel';

const ComicStrip = () => {
    const [panels, setPanels] = useState(Array(10).fill(''));

    // const [panels, setPanels] = useState(Array(10).fill(''));
    const [comicImages, setComicImages] = useState(Array(10).fill(null)); // Initialize with null
    const handleTextChange = (panelNumber, text) => {
        const updatedPanels = [...panels];
        updatedPanels[panelNumber - 1] = text;
        setPanels(updatedPanels);
    };
    const generateComic = async () => {
        try {
            const apiEndpoint = 'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud';
            const headers = {
                'Accept': 'image/png',
                'Authorization': 'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
                'Content-Type': 'application/json',
            };

            const responsePromises = panels.map((text) =>
                fetch(apiEndpoint, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ inputs: text }),
                })
            );

            const responses = await Promise.all(responsePromises);
            const imageBlobs = await Promise.all(responses.map((res) => res.blob()));

            // const imageBlobs = await Promise.all(responses.map((res) => res.blob()));
            const imageUrls = imageBlobs.map((blob) => URL.createObjectURL(blob));

            setComicImages(imageUrls); 
        } catch (error) {
            console.error('Error generating comic:', error);
            // Handle error (display a message to the user)
            <alert>{error}</alert>

        }
    };

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-8">
                {panels.map((_, index) => (
                    <ComicPanel
                        key={index}
                        panelNumber={index + 1}
                        onTextChange={handleTextChange}
                    />
                ))}
                <button className="btn btn-primary" onClick={generateComic}>
                    Generate Comic
                </button>
            </div>
            <div className="col-md-4">
                {/* Display the comic images */}
                <div className="comic-images">
                    {comicImages.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`Comic Panel ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
};

export default ComicStrip;
