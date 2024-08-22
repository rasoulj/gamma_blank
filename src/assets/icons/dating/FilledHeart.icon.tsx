import {Box} from "native-base"
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { getColor } from "~/utils/helper/theme.methods";

export function FilledHeartIcon({ color = getColor({color: 'error.500'}), size = 41, rotation = 0, style = {} }): JSX.Element {

    return <Box style={[style, { transform: [{ rotate: `${rotation}deg` }] }]}><Svg width={size} height={size} viewBox="0 0 51 51" fill="none">
        <G clip-path="url(#clip0_14404_85128)">
            <Path d="M42.0259 16.9163C41.3586 15.7509 40.4674 14.7289 39.4037 13.9091C38.3401 13.0893 37.1248 12.4878 35.8279 12.1392C33.3742 11.4822 30.7632 11.7704 28.5119 12.9469C27.1507 10.8022 25.0336 9.24696 22.5799 8.58942C21.2808 8.24278 19.926 8.15647 18.5935 8.33545C17.2609 8.51443 15.9769 8.95517 14.8153 9.6323C9.8653 12.5042 8.22531 18.6314 11.0823 23.5774L21.0414 40.8271L38.2911 30.868C43.2384 28.0131 44.8817 21.8868 42.0259 16.9163Z" fill={color} />
        </G>
        <Defs>
            <ClipPath id="clip0_14404_85128">
                <Rect width="41.1872" height="41.1872" fill="white" transform="rotate(10.6602)" />
            </ClipPath>
        </Defs>
    </Svg>
    </Box>
}
