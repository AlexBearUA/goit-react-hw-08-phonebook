import { RotatingLines } from 'react-loader-spinner';

export const ButtonLoader = () => {
  return (
    <div className="btn-spinner">
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="18"
        visible={true}
      />
    </div>
  );
};
