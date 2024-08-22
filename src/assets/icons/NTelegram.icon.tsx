import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

const TelegramIcon = (props: SvgProps) => {
  const color = props.color || getColor({color: 'primary.400'}) || '#32e8b7';
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16.674}
      height={15.23}
      {...props}>
      <Path
        data-name="Path 32785"
        d="M16.117.359a1.553 1.553 0 0 0-1.575-.246L.959 5.597a1.548 1.548 0 0 0 .079 2.894l2.747.956 1.532 5.064a.744.744 0 0 0 .089.191l.02.025a.742.742 0 0 0 .16.163c.017.014.035.026.053.038a.743.743 0 0 0 .236.1h.009a.809.809 0 0 0 .154.016s.009 0 .014 0a.752.752 0 0 0 .228-.039c.017-.006.032-.016.049-.023a.761.761 0 0 0 .155-.086l.115-.1 2.048-2.261 3.054 2.366a1.539 1.539 0 0 0 .941.324 1.557 1.557 0 0 0 1.522-1.238l2.473-12.14a1.54 1.54 0 0 0-.525-1.493ZM6.344 9.688a.75.75 0 0 0-.206.383l-.235 1.14-.594-1.965 3.081-1.6Zm6.292 4.02-3.61-2.8a.757.757 0 0 0-1.025.09l-.656.724.232-1.127 5.368-5.368a.757.757 0 0 0-.886-1.207l-7.7 4.011-2.823-1.033 13.626-5.451Z"
        fill={color}
      />
    </Svg>
  );
};

export default TelegramIcon;
