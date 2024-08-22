import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function VideoPlay2IconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      id="video-play-2"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      {...props}
      viewBox="0 0 24 24">
      <Path
        d="M21.3878 2.84375H2.61223C2.27414 2.84375 2 3.14112 2 3.50795V19.7067C2 20.0736 2.27414 20.3709 2.61223 20.3709H21.3878C21.7259 20.3709 22 20.0735 22 19.7067V3.50795C22 3.14112 21.7259 2.84375 21.3878 2.84375ZM5.43196 19.0426H3.22449V14.9714H5.43196V19.0426ZM5.43196 13.6429H3.22449V9.57177H5.43196V13.6429ZM5.43196 8.24337H3.22449V4.1722H5.43196V8.24337ZM17.3435 19.0425H6.65645V4.1722H17.3435V19.0425ZM20.7755 19.0426H18.568V14.9714H20.7755V19.0426ZM20.7755 13.6429H18.568V9.57177H20.7755V13.6429ZM20.7755 8.24337H18.568V4.1722H20.7755V8.24337Z"
        fill={color}
      />
      <Path
        d="M14.7088 11.035L10.7791 8.55935C10.3711 8.30236 9.85938 8.62287 9.85938 9.13375V14.085C9.85938 14.5986 10.3736 14.9149 10.7791 14.6594L14.7088 12.1838C15.1148 11.928 15.1145 11.2906 14.7088 11.035ZM11.0839 12.9313V10.2876L13.1822 11.6094L11.0839 12.9313Z"
        fill={color}
      />
    </Svg>
  );
}
