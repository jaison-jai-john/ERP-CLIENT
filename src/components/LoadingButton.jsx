import React from 'react';

const LoadingButton = ({ enabled, text, loading, onClick }) => {
  return (
    <button
      onClick={onClick ? onClick : () => {}}
      type='submit'
      className={[
        'btn font-bold bg-bgprimary text-bgsecondary border-1 border-bgtertiary hover:bg-bgtertiary hover:text-bgprimary hover:border-bgprimary',
        enabled ? '' : 'btn-disabled',
      ].join(' ')}>
      {loading ? (
        <span className='loading loading-spinner loading-md'></span>
      ) : (
        text
      )}
    </button>
  );
};

export default LoadingButton;
