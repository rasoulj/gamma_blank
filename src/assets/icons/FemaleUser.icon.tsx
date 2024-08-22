import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { getColor } from "~/components/elemental";
import theme from "~/theme";

function FemaleIcon(props) {
  const color =
    props.color || getColor({ color: "primary.500", theme }) || "#0A8080";

  return (
    <Svg
      width={97}
      height={97}
      viewBox="0 0 97 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M54.103 70.373l2.285-14.279-15.422-6.283-2.284 21.705 15.421-1.143z"
        fill="#FFB6B6"
      />
      <Path
        d="M69.603 91.476a47.85 47.85 0 01-12.509 4.086 48.84 48.84 0 01-20.277-.633 47.321 47.321 0 01-4.441-1.325l-.465-.166a47.787 47.787 0 01-6.03-2.67 22.38 22.38 0 01-.769-.414 41.74 41.74 0 01-.978-.555 46.955 46.955 0 01-3.186-2.02l-.068-.045-.179-.127c.038-.199.073-.38.106-.542.126-.633.21-.98.21-.98l6.905-14.265 1.924-3.975.938-.386 7.087-2.913h17.321l5.465 2.26.083.303c.545 1.954 3.723 13.05 8.653 23.908l.21.46z"
        fill={color}
      />
      <Path
        d="M50.207 60.684c8.685 0 15.726-7.04 15.726-15.726 0-8.685-7.04-15.726-15.726-15.726S34.48 36.272 34.48 44.958c0 8.685 7.041 15.726 15.727 15.726z"
        fill="#FFB6B6"
      />
      <Path
        d="M30.812 67.323l-.027.136-4.795 22.796-.041.199-.067.314a49.017 49.017 0 01-1.749-.969 47.746 47.746 0 01-3.185-2.02l-.068-.046-.179-.125a48.6 48.6 0 01-2.292-1.705l-.014-.013A48.28 48.28 0 0112.28 80l.11-.462.011-.047.137-.588a13.434 13.434 0 0110.546-10.102l6.907-1.322.82-.156zM79.789 84.81a48.343 48.343 0 01-6.52 4.679 48.3 48.3 0 01-7.71 3.733l-.105-.5-5.415-25.747.701.133 7.026 1.347a13.433 13.433 0 0110.545 10.103l1.344 5.692.134.56z"
        fill={color}
      />
      <Path
        d="M68.317 49.162c-.409 1.523-2.464 8.33-7.728 9.763-1.034.282-3.5.607-2.847 0l.436-.41c5.713-5.37 8.043-8.654 6.979-15.943-.676-4.64-8.373-8.855-12.704-9.274-1.826-.176-4.156.442-5.694 2.033-2.54 2.623-2.121 10.673-3.529 15.402-.378 1.266-.885 2.295-1.614 2.918-.454.388-.744-.106-.958-.916-.456-1.72-.575-4.87-1.223-3.98-1.874 2.58-.089 6 .451 7.32.111.27.225.53.338.776v.003c.066.141.134.282.2.416v.003c1.8 3.671 3.964 4.985 5.87 7.273.75.895 1.458 1.937 2.091 3.33.434.953.747 1.91.961 2.851 1.092 4.716-.204 9.001-.555 10.167-.733 2.426-1.994 6.594-5.694 8.948-4.646 2.956-8.885.35-10.913 3.157a3.453 3.453 0 00-.272.439 47.78 47.78 0 01-6.03-2.67c-.258-.132-.512-.27-.77-.414-.01-.197-.02-.394-.027-.593-.15-3.412.075-7.162.925-10.903.545-2.388 1.085-4.756 1.912-7.039.54-1.487 1.2-2.94 2.07-4.34a19.676 19.676 0 012.527-3.266c2.205-2.302 4.164-3.263 4.474-5.695.444-3.47-3.17-4.514-4.474-9.762-.89-3.589-1.82-8.761-.917-12.247.852-3.294 1.593-6.151 4.067-8.95.596-.672 5.48-5.337 11.14-6.104 2.608-.35 4.933 2.989 8.086 3.708 3.624.824 5.7 1.296 7.727 2.847 3.427 2.618 4.393 6.532 5.289 10.169.7 2.844 1.609 6.524.406 10.983z"
        fill="#2F2E41"
      />
    </Svg>
  );
}

export default FemaleIcon;
