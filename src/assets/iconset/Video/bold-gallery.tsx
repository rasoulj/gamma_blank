import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function BoldGalleryIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      {...props}
      id="bold-gallery"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <G id="vuesax/bold/gallery">
        <G id="gallery">
          <Path
            id="Vector"
            d="M2.58078 19.0098L2.56078 19.0298C2.28 18.3964 2.1076 17.7203 2.05078 17.0298C2.1153 17.7148 2.29446 18.3841 2.58078 19.0098Z"
            fill={color}
          />
          <Path
            id="Vector_2"
            d="M11.3811 8.00012C11.3811 8.47084 11.2415 8.93099 10.98 9.32237C10.7185 9.71376 10.3468 10.0188 9.91188 10.199C9.47699 10.3791 8.99845 10.4262 8.53678 10.3344C8.07511 10.2426 7.65103 10.0159 7.31818 9.68303C6.98533 9.35018 6.75866 8.92611 6.66683 8.46443C6.57499 8.00276 6.62212 7.52422 6.80226 7.08933C6.9824 6.65444 7.28745 6.28274 7.67884 6.02122C8.07023 5.7597 8.53038 5.62012 9.00109 5.62012C9.63231 5.62012 10.2377 5.87087 10.684 6.3172C11.1303 6.76354 11.3811 7.3689 11.3811 8.00012Z"
            fill={color}
          />
          <Path
            id="Vector_3"
            d="M16.1917 2H7.81167C4.17167 2 2.00167 4.17 2.00167 7.81V16.19C1.97991 17.1661 2.171 18.1352 2.56167 19.03C3.42167 20.93 5.26167 22 7.81167 22H16.1917C19.8317 22 22.0017 19.83 22.0017 16.19V7.81C22.0017 4.17 19.8317 2 16.1917 2ZM20.3717 12.5C19.9737 12.1749 19.4756 11.9974 18.9617 11.9974C18.4478 11.9974 17.9497 12.1749 17.5517 12.5L13.3917 16.07C12.9937 16.3951 12.4956 16.5726 11.9817 16.5726C11.4678 16.5726 10.9697 16.3951 10.5717 16.07L10.2317 15.79C9.86471 15.4869 9.41008 15.3096 8.93477 15.2844C8.45946 15.2592 7.98863 15.3874 7.59167 15.65L3.85167 18.16C3.61176 17.5313 3.493 16.8629 3.50167 16.19V7.81C3.50167 4.99 4.99167 3.5 7.81167 3.5H16.1917C19.0117 3.5 20.5017 4.99 20.5017 7.81V12.61L20.3717 12.5Z"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
}
