import React, { useState } from 'react';
import '../css/UrlForm.css';

const UrlForm = ({ onUrlAdded }) => {
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setMessage('Please enter a URL');
      setIsError(true);
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage(null);
      setIsError(false);

      const response = await fetch('/short_urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ full_url: trimmedUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage('URL is not valid');
        setIsError(true);
      } else {
        setMessage(`${trimmedUrl} shorten URL is: ${data.short_code}`);
        setIsError(false);
        setUrl('');

        if (onUrlAdded && typeof onUrlAdded === 'function') {
          onUrlAdded(data);
        }
      }

    } catch (err) {
      setMessage('URL is not valid');
      setIsError(true);
      console.error('Error shortening URL:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="url-form-container">
      <h2>Shorten a URL</h2>
      <form onSubmit={handleSubmit} className="url-form">
        <div className="form-group">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a URL to shorten"
            className="url-input"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Shorten'}
          </button>
        </div>

        {message && (
          <div className={isError ? "error-message" : "success-message"}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default UrlForm;