import * as React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";
import { getColor } from "~/components/elemental";
import theme from "~/theme";

export default function EmptyPictureIcon(props) {
  const color =
    props.color || getColor({ color: "primary.500", theme }) || "#0A8080";
  return (
    <Svg
      width={props?.width}
      height={props?.height}
      viewBox="0 0 91 68"
      fill="none"
    >
      <Path
        d="M86.6119 62.8848H18.8709C17.8405 62.8838 16.8525 62.4739 16.1239 61.7453C15.3952 61.0167 14.9854 60.0287 14.9844 58.9982V22.8426C14.9856 21.8122 15.3954 20.8243 16.1241 20.0957C16.8527 19.3671 17.8405 18.9573 18.8709 18.9561H86.6119C87.6423 18.9573 88.6302 19.3671 89.3588 20.0957C90.0874 20.8243 90.4973 21.8122 90.4985 22.8426V58.9982C90.4973 60.0286 90.0874 61.0165 89.3588 61.7451C88.6302 62.4738 87.6423 62.8836 86.6119 62.8848Z"
        fill="white"
      />
      <Path
        d="M86.6119 62.8848H18.8709C17.8405 62.8838 16.8525 62.4739 16.1239 61.7453C15.3952 61.0167 14.9854 60.0287 14.9844 58.9982V22.8426C14.9856 21.8122 15.3954 20.8243 16.1241 20.0957C16.8527 19.3671 17.8405 18.9573 18.8709 18.9561H86.6119C87.6423 18.9573 88.6302 19.3671 89.3588 20.0957C90.0874 20.8243 90.4973 21.8122 90.4985 22.8426V58.9982C90.4973 60.0286 90.0874 61.0165 89.3588 61.7451C88.6302 62.4738 87.6423 62.8836 86.6119 62.8848ZM18.8732 19.1925C17.9054 19.1937 16.9775 19.5787 16.2931 20.2631C15.6087 20.9475 15.2237 21.8753 15.2225 22.8432V58.9988C15.2237 59.9667 15.6087 60.8946 16.2931 61.5789C16.9775 62.2633 17.9054 62.6483 18.8732 62.6495H86.6142C87.5821 62.6483 88.5099 62.2633 89.1943 61.5789C89.8787 60.8946 90.2637 59.9667 90.2649 58.9988V22.8426C90.2637 21.8748 89.8787 20.9469 89.1943 20.2625C88.5099 19.5781 87.5821 19.1931 86.6142 19.1919L18.8732 19.1925Z"
        fill="#E6E6E6"
      />
      <Path
        d="M86.6133 60.0601H18.8724C18.5914 60.0598 18.322 59.948 18.1233 59.7493C17.9246 59.5506 17.8128 59.2812 17.8125 59.0002V22.844C17.8128 22.563 17.9246 22.2936 18.1233 22.0949C18.322 21.8962 18.5914 21.7845 18.8724 21.7842H86.6133C86.8943 21.7845 87.1637 21.8962 87.3624 22.0949C87.5611 22.2936 87.6729 22.563 87.6732 22.844V58.9996C87.6731 59.2808 87.5614 59.5503 87.3626 59.7491C87.1639 59.9479 86.8944 60.0598 86.6133 60.0601ZM18.8746 22.0206C18.656 22.0208 18.4463 22.1077 18.2917 22.2623C18.1371 22.4169 18.0502 22.6265 18.05 22.8452V59.0008C18.0502 59.2194 18.1371 59.4291 18.2917 59.5837C18.4463 59.7383 18.656 59.8252 18.8746 59.8254H86.6156C86.8343 59.8252 87.0439 59.7383 87.1985 59.5837C87.3531 59.4291 87.44 59.2194 87.4402 59.0008V22.844C87.44 22.6254 87.3531 22.4158 87.1985 22.2611C87.0439 22.1065 86.8343 22.0196 86.6156 22.0195L18.8746 22.0206Z"
        fill="#E6E6E6"
      />
      <Path
        d="M69.3748 60.233L3.89736 42.8766C2.90169 42.6114 2.05187 41.9621 1.53431 41.0711C1.01675 40.1801 0.87371 39.1203 1.13657 38.124L10.3998 3.17372C10.665 2.17805 11.3143 1.32823 12.2053 0.810673C13.0963 0.293114 14.1562 0.150077 15.1525 0.412937L80.631 17.771C81.6267 18.0362 82.4765 18.6855 82.9941 19.5765C83.5116 20.4675 83.6547 21.5274 83.3918 22.5237L74.1286 57.4739C73.8635 58.4696 73.2142 59.3196 72.3232 59.8371C71.4322 60.3547 70.3722 60.4977 69.3759 60.2347L69.3748 60.233Z"
        fill="#E6E6E6"
      />
      <Path
        d="M69.3748 60.233L3.89736 42.8766C2.90169 42.6114 2.05187 41.9621 1.53431 41.0711C1.01675 40.1801 0.87371 39.1203 1.13657 38.124L10.3998 3.17372C10.665 2.17805 11.3143 1.32823 12.2053 0.810673C13.0963 0.293114 14.1562 0.150077 15.1525 0.412937L80.631 17.771C81.6267 18.0362 82.4765 18.6855 82.9941 19.5765C83.5116 20.4675 83.6547 21.5274 83.3918 22.5237L74.1286 57.4739C73.8635 58.4696 73.2142 59.3196 72.3232 59.8371C71.4322 60.3547 70.3722 60.4977 69.3759 60.2347L69.3748 60.233ZM15.0928 0.641397C14.1569 0.394497 13.1612 0.528908 12.3243 1.01515C11.4873 1.50139 10.8774 2.29975 10.6283 3.2351L1.36503 38.1853C1.11813 39.1213 1.25254 40.1169 1.73878 40.9539C2.22502 41.7909 3.02338 42.4008 3.95873 42.6499L69.4362 60.0068C70.3721 60.2537 71.3678 60.1193 72.2047 59.633C73.0417 59.1468 73.6516 58.3484 73.9007 57.4131L83.1639 22.4628C83.4108 21.5269 83.2764 20.5313 82.7902 19.6943C82.3039 18.8573 81.5056 18.2474 80.5702 17.9983L15.0928 0.641397Z"
        fill="#E6E6E6"
      />
      <Path
        d="M70.0937 57.5039L4.61631 40.147C4.3447 40.0747 4.11286 39.8976 3.97168 39.6546C3.83051 39.4116 3.79153 39.1225 3.86331 38.8507L13.1266 3.90048C13.1988 3.62887 13.3759 3.39703 13.6189 3.25586C13.862 3.11468 14.1511 3.07571 14.4228 3.14749L79.9003 20.5044C80.1719 20.5767 80.4037 20.7538 80.5449 20.9968C80.6861 21.2398 80.725 21.5289 80.6533 21.8007L71.39 56.7509C71.3177 57.0225 71.1407 57.2544 70.8976 57.3955C70.6546 57.5367 70.3655 57.5757 70.0937 57.5039ZM14.3632 3.37651C14.1518 3.3207 13.9269 3.35104 13.7379 3.4609C13.5488 3.57075 13.4111 3.75113 13.355 3.96242L4.09177 38.9127C4.03595 39.124 4.06631 39.3489 4.17616 39.538C4.28601 39.727 4.46638 39.8647 4.67768 39.9208L70.1551 57.2777C70.3663 57.3334 70.5909 57.3031 70.7797 57.1935C70.9686 57.0839 71.1063 56.9039 71.1627 56.693L80.4259 21.7427C80.4818 21.5314 80.4515 21.3066 80.3418 21.1176C80.232 20.9286 80.0518 20.7908 79.8406 20.7346L14.3632 3.37651Z"
        fill="white"
      />
      <Path
        d="M72.1275 67.7129H4.38657C3.35616 67.7117 2.36829 67.3019 1.63968 66.5733C0.911066 65.8447 0.501203 64.8568 0.5 63.8264V27.6708C0.501203 26.6403 0.911066 25.6525 1.63968 24.9239C2.36829 24.1952 3.35616 23.7854 4.38657 23.7842H72.1275C73.158 23.7854 74.1458 24.1952 74.8744 24.9239C75.603 25.6525 76.0129 26.6403 76.0141 27.6708V63.8264C76.0129 64.8568 75.603 65.8447 74.8744 66.5733C74.1458 67.3019 73.158 67.7117 72.1275 67.7129Z"
        fill="white"
      />
      <Path
        d="M53.7275 64.6535H9.98398C9.92715 64.6535 9.8743 64.6535 9.82031 64.6495L30.5063 52.9994C31.1333 52.75 31.8191 52.6883 32.4806 52.8215C32.6714 52.8509 32.8562 52.911 33.0278 52.9994L46.9125 60.8186L47.5779 61.1925L53.7275 64.6535Z"
        fill="#E6E6E6"
      />
      <Path
        d="M67.5224 64.6528H29.6875L37.0185 61.1902L37.5459 60.9407L47.0995 56.4285C48.0302 56.1318 49.0271 56.112 49.9689 56.3716C50.0185 56.3894 50.0643 56.4084 50.1064 56.4285L67.5224 64.6528Z"
        fill="#E6E6E6"
      />
      <Path
        d="M4.38511 24.0264C3.41724 24.0276 2.48936 24.4126 1.80498 25.097C1.12059 25.7814 0.735578 26.7092 0.734375 27.6771V63.8333C0.735578 64.8011 1.12059 65.729 1.80498 66.4134C2.48936 67.0978 3.41724 67.4828 4.38511 67.484H72.1261C73.0939 67.4828 74.0218 67.0978 74.7062 66.4134C75.3906 65.729 75.7756 64.8011 75.7768 63.8333V27.6771C75.7756 26.7092 75.3906 25.7814 74.7062 25.097C74.0218 24.4126 73.0939 24.0276 72.1261 24.0264H4.38511Z"
        fill="#27272A"
      />
      <Path
        d="M72.129 64.8882H4.38799C4.10699 64.8879 3.83759 64.7762 3.63889 64.5775C3.44019 64.3788 3.32843 64.1093 3.32812 63.8283V27.6722C3.32843 27.3912 3.44019 27.1218 3.63889 26.9231C3.83759 26.7244 4.10699 26.6126 4.38799 26.6123H72.129C72.41 26.6126 72.6794 26.7244 72.8781 26.9231C73.0768 27.1218 73.1885 27.3912 73.1888 27.6722V63.8278C73.1885 64.1088 73.0768 64.3782 72.8781 64.5769C72.6794 64.7756 72.41 64.8879 72.129 64.8882ZM4.39027 26.8487C4.17162 26.8489 3.96197 26.9358 3.80736 27.0904C3.65275 27.245 3.56582 27.4547 3.56567 27.6733V63.8289C3.56582 64.0476 3.65275 64.2572 3.80736 64.4118C3.96197 64.5664 4.17162 64.6534 4.39027 64.6535H72.1312C72.3499 64.6534 72.5595 64.5664 72.7141 64.4118C72.8688 64.2572 72.9557 64.0476 72.9558 63.8289V27.6722C72.9557 27.4535 72.8688 27.2439 72.7141 27.0893C72.5595 26.9347 72.3499 26.8477 72.1312 26.8476L4.39027 26.8487Z"
        fill="#E6E6E6"
      />
      <Path
        d="M57.0329 33.2327C61.0594 33.2327 64.3235 29.9686 64.3235 25.942C64.3235 21.9155 61.0594 18.6514 57.0329 18.6514C53.0063 18.6514 49.7422 21.9155 49.7422 25.942C49.7422 29.9686 53.0063 33.2327 57.0329 33.2327Z"
        fill="#FF6584"
      />
      <Path
        d="M60.0852 52.4862C65.1849 52.4862 69.3189 47.3115 69.3189 40.9281C69.3189 34.5448 65.1849 29.3701 60.0852 29.3701C54.9856 29.3701 50.8516 34.5448 50.8516 40.9281C50.8516 47.3115 54.9856 52.4862 60.0852 52.4862Z"
        fill="#E6E6E6"
      />
      <Path
        d="M60.1109 38.6045H60.1365L60.5911 64.7831H59.625L60.1109 38.6045Z"
        fill="#E6E6E6"
      />
      <Path
        d="M61.6868 55.9374C61.701 55.9639 61.7097 55.9929 61.7126 56.0228C61.7154 56.0527 61.7123 56.0829 61.7034 56.1116C61.6945 56.1403 61.6801 56.167 61.6609 56.19C61.6416 56.2131 61.618 56.2321 61.5914 56.246L60.2672 56.9433L60.0547 56.5392L61.3788 55.842C61.4053 55.8279 61.4343 55.8192 61.4641 55.8164C61.494 55.8136 61.524 55.8167 61.5527 55.8256C61.5813 55.8345 61.6079 55.8489 61.6309 55.8681C61.6539 55.8873 61.673 55.9109 61.6868 55.9374Z"
        fill="#E6E6E6"
      />
      <Path
        d="M33.5384 52.4862C38.638 52.4862 42.7721 47.3115 42.7721 40.9281C42.7721 34.5448 38.638 29.3701 33.5384 29.3701C28.4387 29.3701 24.3047 34.5448 24.3047 40.9281C24.3047 47.3115 28.4387 52.4862 33.5384 52.4862Z"
        fill="#E6E6E6"
      />
      <Path
        d="M35.1354 56.3683C35.1215 56.3417 35.1025 56.3181 35.0794 56.2988C35.0563 56.2796 35.0297 56.2651 35.001 56.2562C34.9723 56.2474 34.9421 56.2443 34.9122 56.2471C34.8823 56.25 34.8533 56.2587 34.8268 56.2729L33.9022 56.7599L33.5856 38.6045H33.56L33.0781 64.7836H34.0442L33.9129 57.2713L35.041 56.6775C35.0677 56.6636 35.0913 56.6445 35.1105 56.6215C35.1298 56.5984 35.1442 56.5718 35.1531 56.5431C35.162 56.5144 35.1651 56.4842 35.1622 56.4543C35.1594 56.4244 35.1506 56.3954 35.1365 56.3689L35.1354 56.3683Z"
        fill="#E6E6E6"
      />
      <Path
        d="M46.7802 14.292C53.2417 14.292 58.4939 26.4672 58.4939 34.5557C58.4939 42.6443 53.2554 49.2007 46.7938 49.2007C40.3323 49.2007 35.0938 42.6443 35.0938 34.5557C35.0938 26.4672 40.3187 14.292 46.7802 14.292Z"
        fill={color}
      />
      <Path
        d="M48.8166 54.0042C48.7808 53.9364 48.7196 53.8856 48.6464 53.8629C48.5732 53.8402 48.494 53.8475 48.4262 53.8832L47.2549 54.4998L46.8537 31.4951H46.8213L46.2109 64.6666H47.4322L47.2663 55.1476L48.6955 54.3935C48.763 54.3577 48.8136 54.2967 48.8363 54.2238C48.859 54.1509 48.8519 54.0719 48.8166 54.0042Z"
        fill="#27272A"
      />
      <Path
        d="M72.3619 67.4786H4.62095C3.59053 67.4774 2.60267 67.0675 1.87406 66.3389C1.14544 65.6103 0.735578 64.6224 0.734375 63.592V27.4364C0.735578 26.406 1.14544 25.4181 1.87406 24.6895C2.60267 23.9609 3.59053 23.551 4.62095 23.5498H72.3619C73.3924 23.5509 74.3803 23.9607 75.109 24.6893C75.8376 25.418 76.2474 26.4059 76.2485 27.4364V63.592C76.2474 64.6224 75.8376 65.6104 75.109 66.339C74.3803 67.0677 73.3924 67.4775 72.3619 67.4786Z"
        fill="white"
      />
      <Path
        d="M53.9618 64.4191H10.2184C10.1615 64.4191 10.1087 64.4191 10.0547 64.4151L30.7407 52.765C31.3676 52.5157 32.0535 52.4539 32.7149 52.5871C32.9058 52.6165 33.0906 52.6766 33.2622 52.765L47.1469 60.5842L47.8123 60.9581L53.9618 64.4191Z"
        fill="#E6E6E6"
      />
      <Path
        d="M67.7568 64.4185H29.9219L37.2529 60.9558L37.7803 60.7063L47.3339 56.1941C48.2646 55.8974 49.2615 55.8776 50.2032 56.1372C50.2529 56.1551 50.2987 56.174 50.3408 56.1941L67.7568 64.4185Z"
        fill="#E6E6E6"
      />
      <Path
        d="M72.3619 67.4786H4.62095C3.59053 67.4774 2.60267 67.0675 1.87406 66.3389C1.14544 65.6103 0.735578 64.6224 0.734375 63.592V27.4364C0.735578 26.406 1.14544 25.4181 1.87406 24.6895C2.60267 23.9609 3.59053 23.551 4.62095 23.5498H72.3619C73.3924 23.5509 74.3803 23.9607 75.109 24.6893C75.8376 25.418 76.2474 26.4059 76.2485 27.4364V63.592C76.2474 64.6224 75.8376 65.6104 75.109 66.339C74.3803 67.0677 73.3924 67.4775 72.3619 67.4786ZM4.62323 23.7862C3.65536 23.7874 2.72748 24.1724 2.0431 24.8568C1.35871 25.5412 0.973689 26.4691 0.972486 27.437V63.5926C0.973689 64.5604 1.35871 65.4883 2.0431 66.1727C2.72748 66.8571 3.65536 67.2421 4.62323 67.2433H72.3642C73.3321 67.2421 74.2599 66.8571 74.9443 66.1727C75.6287 65.4883 76.0137 64.5604 76.0149 63.5926V27.4364C76.0137 26.4685 75.6287 25.5406 74.9443 24.8563C74.2599 24.1719 73.3321 23.7869 72.3642 23.7857L4.62323 23.7862Z"
        fill="#27272A"
      />
      <Path
        d="M72.3633 64.6538H4.62237C4.34136 64.6535 4.07196 64.5418 3.87326 64.3431C3.67456 64.1444 3.5628 63.875 3.5625 63.594V27.4378C3.5628 27.1568 3.67456 26.8874 3.87326 26.6887C4.07196 26.49 4.34136 26.3782 4.62237 26.3779H72.3633C72.6443 26.3782 72.9137 26.49 73.1124 26.6887C73.3111 26.8874 73.4229 27.1568 73.4232 27.4378V63.5934C73.4231 63.8745 73.3114 64.1441 73.1126 64.3429C72.9139 64.5417 72.6444 64.6535 72.3633 64.6538ZM4.62465 26.6143C4.406 26.6145 4.19634 26.7014 4.04173 26.856C3.88712 27.0106 3.8002 27.2203 3.80005 27.4389V63.5945C3.8002 63.8132 3.88712 64.0229 4.04173 64.1775C4.19634 64.3321 4.406 64.419 4.62465 64.4191H72.3656C72.5843 64.419 72.7939 64.3321 72.9485 64.1775C73.1031 64.0229 73.19 63.8132 73.1902 63.5945V27.4378C73.19 27.2191 73.1031 27.0095 72.9485 26.8549C72.7939 26.7003 72.5843 26.6134 72.3656 26.6132L4.62465 26.6143Z"
        fill="#E6E6E6"
      />
      <Path
        d="M57.2672 32.9983C61.2938 32.9983 64.5579 29.7342 64.5579 25.7077C64.5579 21.6811 61.2938 18.417 57.2672 18.417C53.2407 18.417 49.9766 21.6811 49.9766 25.7077C49.9766 29.7342 53.2407 32.9983 57.2672 32.9983Z"
        fill="#FF6584"
      />
      <Path
        d="M60.3196 52.2518C65.4192 52.2518 69.5533 47.0771 69.5533 40.6938C69.5533 34.3104 65.4192 29.1357 60.3196 29.1357C55.22 29.1357 51.0859 34.3104 51.0859 40.6938C51.0859 47.0771 55.22 52.2518 60.3196 52.2518Z"
        fill="#E6E6E6"
      />
      <Path
        d="M60.3453 38.3701H60.3708L60.8255 64.5487H59.8594L60.3453 38.3701Z"
        fill="#E6E6E6"
      />
      <Path
        d="M61.9212 55.6952C61.9354 55.7217 61.9441 55.7508 61.947 55.7807C61.9498 55.8106 61.9467 55.8407 61.9378 55.8694C61.9289 55.8981 61.9145 55.9248 61.8952 55.9478C61.876 55.9709 61.8524 55.9899 61.8257 56.0038L60.5016 56.7011L60.2891 56.2971L61.6132 55.5998C61.6397 55.5857 61.6687 55.577 61.6985 55.5742C61.7283 55.5714 61.7584 55.5746 61.7871 55.5834C61.8157 55.5923 61.8423 55.6067 61.8653 55.6259C61.8883 55.6451 61.9073 55.6687 61.9212 55.6952Z"
        fill="#E6E6E6"
      />
      <Path
        d="M33.7727 52.2518C38.8724 52.2518 43.0064 47.0771 43.0064 40.6938C43.0064 34.3104 38.8724 29.1357 33.7727 29.1357C28.6731 29.1357 24.5391 34.3104 24.5391 40.6938C24.5391 47.0771 28.6731 52.2518 33.7727 52.2518Z"
        fill="#E6E6E6"
      />
      <Path
        d="M35.3697 56.1339C35.3558 56.1073 35.3368 56.0837 35.3138 56.0645C35.2907 56.0452 35.2641 56.0307 35.2354 56.0219C35.2067 56.013 35.1765 56.0099 35.1466 56.0127C35.1167 56.0156 35.0876 56.0243 35.0611 56.0385L34.1365 56.5255L33.82 38.3701H33.7944L33.3125 64.5493H34.2786L34.1473 57.0369L35.2754 56.4431C35.302 56.4291 35.3256 56.41 35.3448 56.3868C35.3639 56.3637 35.3783 56.3369 35.3871 56.3082C35.3959 56.2794 35.3988 56.2492 35.3959 56.2193C35.3929 56.1894 35.384 56.1604 35.3697 56.1339Z"
        fill="#E6E6E6"
      />
      <Path
        d="M47.0146 14.0576C53.4761 14.0576 58.7283 26.2328 58.7283 34.3214C58.7283 42.4099 53.4903 48.9664 47.0282 48.9664C40.5661 48.9664 35.3281 42.4099 35.3281 34.3214C35.3281 26.2328 40.553 14.0576 47.0146 14.0576Z"
        fill={color}
      />
      <Path
        d="M49.0515 53.762C49.0158 53.6942 48.9546 53.6434 48.8814 53.6207C48.8082 53.598 48.7289 53.6053 48.6611 53.641L47.4898 54.2576L47.0886 31.2529H47.0562L46.4453 64.4244H47.6666L47.5006 54.9054L48.9305 54.1513C48.9979 54.1155 49.0485 54.0545 49.0712 53.9816C49.0939 53.9087 49.0868 53.8297 49.0515 53.762Z"
        fill="#27272A"
      />
    </Svg>
  );
}
