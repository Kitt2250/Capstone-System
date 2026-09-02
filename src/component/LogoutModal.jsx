import React from 'react';

export default function LogoutModal({ onClose, onConfirm }) {
  return (
    <div className="global-logout-overlay" onClick={onClose}>
      <div className="global-logout-modal" onClick={e => e.stopPropagation()}>
        <div className="glm-icon">
          <i className="fas fa-sign-out-alt"></i>
        </div>
        <div className="glm-header">
          <h2>Confirm Logout</h2>
          <p>Are you sure you want to sign out of your account?</p>
        </div>
        <div className="glm-actions">
          <button className="glm-cancel" onClick={onClose}>Cancel</button>
          <button className="glm-confirm" onClick={onConfirm}>
             Logout
          </button>
        </div>
      </div>
    </div>
  );
}
