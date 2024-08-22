import {useState} from 'react';
import {createThumbnail} from 'react-native-create-thumbnail';

export const createThumbnailVideo = async (url: string, timeStamp = 1000) => {
  try {
    const thumbPath = await createThumbnail({
      url: url,
      timeStamp,
    });
    console.log(thumbPath?.path);
    return thumbPath?.path;
  } catch (error) {
    return undefined;
  }
};
