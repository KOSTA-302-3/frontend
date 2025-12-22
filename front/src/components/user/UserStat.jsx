import React from 'react';
import './UserStat.css';

function UserStat({ label, value }) {
    return (
        <div className="stat-item">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

export default UserStat;