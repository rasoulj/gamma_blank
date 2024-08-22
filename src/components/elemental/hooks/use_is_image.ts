import {useEffect, useState} from 'react';
import {imageExtensions} from '~/constants/extentions';

export default function useIsImage(url = '') {
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    setIsImage(isUrlImage(url));
  }, [url]);

  return isImage;
}

export function isUrlImage(url = '') {
  return imageExtensions.some(extention =>
    String(url).toLocaleLowerCase().includes(extention),
  );
}
