import React from 'react';
import {ReelsItem, useRoute} from '~/components';
const ReelsDetail = ({item}) => {
  const postDtoItem = item ?? useRoute().params?.item;
  return <ReelsItem item={postDtoItem} index={0} type="detail" />;
};
export default ReelsDetail;
