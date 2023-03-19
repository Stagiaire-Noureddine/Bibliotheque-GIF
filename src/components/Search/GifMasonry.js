import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const GifMasonry = ({ children }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3, 1400: 4 }} gutter="16px">
      <Masonry gutter="16px">{children}</Masonry>
    </ResponsiveMasonry>
  );
};

export default GifMasonry;
