import React from "react"
import { ChakraProvider, Box } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../components/ColorModeSwitcher"
import theme from "../common/theme"
import Search from "./Search"

export const App = () => {
  /**
   * TODO: implement state in a way that it could be set from
   * the server side, and it will be attached to every request
   * @returns
   */

  /**
   * Implement running actions on lifecycle events
   */

  /**
   * Handle behavioral aspects from the engine
   */

  /**
   * Implement running actions on setTimeout setInterval
   */

  return (
    <ChakraProvider theme={theme}>
      <Box position="absolute" top="2" right="2">
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
      <Box
        w={{ base: "100%", md: "75%", lg: "60%" }}
        pos="relative"
        display="flex"
        alignItems="flex-start"
        margin="auto"
        h="100vh"
        overflow="hidden"
      >
        <Search />
      </Box>
    </ChakraProvider>
  )
}
