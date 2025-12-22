import React from 'react';
import './ProfileButton.css';

/**
 * btnType: point(색O) / default(색X)
 */
function ProfileButton({ btnType="default", onClick, children }) {
    return (
        <button className={`profile-btn ${btnType}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default ProfileButton;