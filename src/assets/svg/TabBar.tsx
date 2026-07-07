import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

export const HomeIcon = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      d="M11.25 15.75V9.75C11.25 9.55109 11.171 9.36032 11.0303 9.21967C10.8897 9.07902 10.6989 9 10.5 9H7.5C7.30109 9 7.11032 9.07902 6.96967 9.21967C6.82902 9.36032 6.75 9.55109 6.75 9.75V15.75"
      stroke={props.stroke || '#64748B'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.25 7.49999C2.24995 7.28179 2.2975 7.06621 2.38934 6.86828C2.48118 6.67035 2.6151 6.49484 2.78175 6.35399L8.03175 1.85399C8.30249 1.62517 8.64552 1.49963 9 1.49963C9.35448 1.49963 9.69751 1.62517 9.96825 1.85399L15.2183 6.35399C15.3849 6.49484 15.5188 6.67035 15.6107 6.86828C15.7025 7.06621 15.7501 7.28179 15.75 7.49999V14.25C15.75 14.6478 15.592 15.0293 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0293 2.25 14.6478 2.25 14.25V7.49999Z"
      stroke={props.stroke || '#64748B'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SearchIcon = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <Circle
      cx={8.25}
      cy={8.25}
      r={5.25}
      stroke={props.stroke || '#64748B'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.75 15.75L12.375 12.375"
      stroke={props.stroke || '#64748B'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const WishlistIcon = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      d="M15.4874 3.5249C15.1045 3.14185 14.6495 2.83711 14.1486 2.62821C13.6477 2.41932 13.1108 2.31055 12.5687 2.31055C12.0265 2.31055 11.4896 2.41932 10.9887 2.62821C10.4878 2.83711 10.0328 3.14185 9.64987 3.5249L8.99987 4.1749L8.34987 3.5249C7.57647 2.7515 6.52441 2.31094 5.42737 2.31094C4.33033 2.31094 3.27827 2.7515 2.50487 3.5249C1.73147 4.2983 1.29092 5.35036 1.29092 6.4474C1.29092 7.54444 1.73147 8.5965 2.50487 9.3699L8.99987 15.8649L15.4949 9.3699C15.8779 8.98694 16.1826 8.53187 16.3916 8.03098C16.6005 7.5301 16.7093 6.99318 16.7093 6.4511C16.7093 5.90902 16.6005 5.3721 16.3916 4.87121C16.1826 4.37033 15.8779 3.91526 15.4949 3.5323L15.4874 3.5249Z"
      stroke={props.stroke || '#64748B'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ProfileIcon = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      d="M14.25 15.75V14.25C14.25 13.4544 13.9339 12.6913 13.3713 12.1287C12.8087 11.5661 12.0456 11.25 11.25 11.25H6.75C5.95435 11.25 5.19129 11.5661 4.62868 12.1287C4.06607 12.6913 3.75 13.4544 3.75 14.25V15.75"
      stroke={props.stroke || '#64748B'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
      stroke={props.stroke || '#64748B'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
