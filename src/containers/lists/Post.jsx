import { Stack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useSelector } from 'react-redux';
import StockName from '../../components/StockName';

const Post = ({posts}) => {
  const loading = useSelector( rootReducer => rootReducer.loading['stock/FETCH_STOCK_LIST']);
  const SkeletonArea = () => {
    return (
      <Stack>
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
      </Stack>
    )
  }
  return (
    <ul>
      {loading && <SkeletonArea />}
      {loading || posts
        .map(item => (
          <StockName key={item.stockCode} {...item} />
        ))}
    </ul>
  );
};

export default Post;