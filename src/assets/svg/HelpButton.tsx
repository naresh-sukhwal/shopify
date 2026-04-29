import { wp } from '@/utils/responsive.utils';
import * as React from 'react';
import Svg, { Path, Text, TSpan } from 'react-native-svg';
const HelpButton = props => (
  <Svg
    id="Help_Button"
    data-name="Help Button"
    width={wp('100')}
    height={wp('9')}
    viewBox="0 0 70.747 24.916"
    {...props}
  >
    <Path
      id="Caminho_20248"
      data-name="Caminho 20248"
      d="M8,0H58a8,8,0,0,1,8,8v9.769l4.747,7.147L58,22H8a8,8,0,0,1-8-8V8A8,8,0,0,1,8,0Z"
      fill="#eb0000"
    />
    <Text
      id="NEED_HELP_"
      data-name="NEED HELP?"
      transform="translate(32 15)"
      fill="#fff"
      fontSize={9}
      fontFamily="OpenSans-Bold, Open Sans"
      fontWeight={700}
    >
      <TSpan x={-26} y={0}>
        {'NEED HELP?'}
      </TSpan>
    </Text>
  </Svg>
);
export default HelpButton;
