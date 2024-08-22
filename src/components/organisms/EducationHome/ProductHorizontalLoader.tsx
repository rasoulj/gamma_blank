import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {View} from 'react-native';
import styles from './styles';
import {getColor} from '~/components/elemental';
import EducationHorizontalItem from '~/components/molecules/EducationHorizontalItem';

export default function ProductHorizontalItemLoader() {
  return (
    <View>
      <ContentLoader
        height={210}
        backgroundColor={getColor({color: 'gray.400'})}>
        <Rect x="11" y="8" rx="8" ry="8" width="206" height="112" />
        <Rect x="11" y="128" rx="4" ry="4" width="206" height="10" />
        <Rect x="11" y="142" rx="4" ry="4" width="165" height="10" />

        <Rect x="11" y="172" rx="4" ry="4" width="90" height="25" />
        <Rect x="110" y="172" rx="4" ry="4" width="108" height="25" />
      </ContentLoader>
    </View>
  );
}
