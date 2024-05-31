import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, type, onClose }) => {
  const typeStyles = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
  };

  return (
    <div className={`border-l-4 p-4 ${typeStyles[type]} rounded shadow-md`}>
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button onClick={onClose} className="ml-4 text-lg font-bold text-gray-700 hover:text-gray-900">&times;</button>
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
