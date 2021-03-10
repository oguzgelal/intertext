import { ComponentMultiStyleConfig } from "@chakra-ui/theme";
import { iff } from './../../../common/utils/conditions'
import { Size } from '../../../common/types';

export const InxStack: ComponentMultiStyleConfig = {
  parts: ['base'],
  baseStyle: props => {
    const gap = iff(
      [props.__gap === Size.LARGE, 3],
      [props.__gap === Size.MEDIUM, 2],
      [props.__gap === Size.SMALL, 1],
      [props.__gap === Size.XSMALL, 0.5],
    )(2)

    return {
      base: {
        marginTop: 4,
        marginBottom: 4,
        '& > *': {
          margin: 0,
        },
        columnGap: gap,
        rowGap: gap,
      }
    }
  }
}