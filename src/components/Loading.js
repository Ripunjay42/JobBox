// components/LoadingScreen.js
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50">
      <div className="w-16 h-16 relative">
        <div className="w-16 h-16 rounded-full border-4 border-red-200 animate-pulse"></div>
        <div className="w-16 h-16 rounded-full border-t-4 border-red-500 animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;