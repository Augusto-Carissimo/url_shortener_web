import React from 'react';
import '../css/UrlList.css';

const UrlList = ({ urls, error }) => {
  if (error || !urls || urls.length === 0) {
    return (
      <div className="url-list-container">
        <h2>Top 100 visited websites</h2>
        <div className="url-empty-state">
          <p>There is no website available</p>
        </div>
      </div>
    );
  }

  const truncateTitle = (title, maxLength = 40) => {
    if (!title || typeof title !== 'string') {
      return 'No title';
    }

    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  const handleLinkClick = (e, url) => {
    e.preventDefault();

    window.open(url.full_url, '_blank', 'noopener,noreferrer');

    fetch('/url-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ full_url: url.full_url }),
    }).catch(error => {
      console.error('Error recording click:', error);
    });
  };

  return (
    <div className="url-list-container">
      <h2>Top 100 visited websites</h2>
      <div className="url-list-header">
        <span className="header-title">Title</span>
        <span className="header-url">Full URL</span>
        <span className="header-clicks">Clicks</span>
        <span className="header-short">Short URL</span>
      </div>
      <ul className="url-list">
        {urls.map((url) => (
          <li key={url.id || `item-${Math.random()}`} className="url-list-item">
            <div className="url-title" title={url.title || 'No title'}>
              {truncateTitle(url.title)}
            </div>
            <div className="url-full">
              {url.full_url ? (
              <a
                  href={url.full_url}
                  onClick={(e) => handleLinkClick(e, url)}
                  className="url-link"
                >
                  {url.full_url}
                </a>
              ) : (
                <span className="url-missing">No URL available</span>
              )}
            </div>
            <div className="url-clicks">{url.click_count || 0}</div>
            <div className="url-short">{url.short_url || 'N/A'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;