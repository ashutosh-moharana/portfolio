import React, { useState } from 'react';

const ProgressiveImage = ({ src, alt, className, wrapperClassName = "", ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Skeleton / Placeholder */}
      <div 
        className={`absolute inset-0 bg-muted/60 animate-pulse transition-opacity duration-700 ease-in-out ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />
      
      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-700 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default ProgressiveImage;
