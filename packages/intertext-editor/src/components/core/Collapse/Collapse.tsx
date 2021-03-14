import React from 'react';
import { LayoutProps, getLayoutProps } from '@intertext/engine'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useMultiStyleConfig
} from '@chakra-ui/react'

const InxCollapse = ({
  children,
  handle,
  ...rest
}: LayoutProps & {
  children: any,
  handle: any,
}) => {

  const styles = useMultiStyleConfig('InxCollapse', {})

  return (
    <Accordion
      allowToggle
      sx={{
        ...styles.base,
        ...getLayoutProps(rest),
      }}
    >
      <AccordionItem>
        <AccordionButton>
          {handle}
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          {children}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )	
}

export default InxCollapse;