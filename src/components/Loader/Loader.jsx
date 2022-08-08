import PulseLoader from 'react-spinners/PulseLoader';
const wrapperStyles = {
  margin: 0,
};

const Loader = () => {
  return (
    <div css={wrapperStyles}>
      <PulseLoader margin={4} size={13} color={'#3f51b5'} />
    </div>
  );
};

export default Loader;
