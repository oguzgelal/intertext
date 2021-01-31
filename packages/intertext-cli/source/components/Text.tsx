import React from 'react';
import { Box, Text as InkText } from 'ink'
import { Intent } from '@intertext/engine';

const Text = (props: {
  children?: any,
  p?: boolean,
  h1?: boolean,
  h2?: boolean,
  h3?: boolean,
  b?: boolean,
  i?: boolean,
  u?: boolean,
  muted?: boolean,
  intent?: Intent,
}) => {

  const isHeading: boolean = !!(props.h1 || props.h2 || props.h3);
  
  let paddingTop = 0;
  if (props.h3) paddingTop = 1;
  if (props.h2) paddingTop = 1;
  if (props.h1) paddingTop = 2;
  if (props.p) paddingTop = 0;
  
  let color;
  if (props.intent === Intent.INFO) {
    color = '#00AAFF'
  }

  return (
    <Box
      paddingTop={paddingTop}
    >
      <InkText
        bold={props.b}
        italic={props.i}
        underline={props.u}
        dimColor={props.muted}
        inverse={isHeading}
        color={color}
      >
        {props.h1 && <InkText {...props} inverse># </InkText>}
        {props.h2 && <InkText {...props} inverse>## </InkText>}
        {props.h3 && <InkText {...props} inverse>### </InkText>}
        {props.children}
      </InkText>
    </Box>
  )	
}

Text.propTypes = {
}

export default Text;