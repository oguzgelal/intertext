// @ts-nocheck
import React, { FC, useEffect } from "react"
import {
  Box,
  Input,
  Button,
  Text,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react"
import { ArrowForwardIcon, SearchIcon, LinkIcon } from "@chakra-ui/icons"
import useIntertext from "../utils/useIntertext"
import useColorMode from "../utils/colorMode"
import engine from "../common/engine"

type SearchProps = {}

const CenterText = ({ children }: { children: any }) => {
  const mode = useColorMode()
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Text
        display="flex"
        alignItems="center"
        justifyContent="center"
        color={mode("gray.300", "gray.700")}
      >
        {children}
      </Text>
    </Box>
  )
}

const shortcuts = [
  {
    title: "Demo",
    url: "https://intertext-backend-demo.herokuapp.com/demo",
  },
  {
    title: "Demo (local)",
    url: "http://localhost:8008/demo",
  },
  {
    title: "Recipes (local)",
    url: "http://localhost:8008/recipes",
  },
]

const Search: FC<SearchProps> = () => {
  const mode = useColorMode()

  const {
    url,
    urlSet,
    state,
    stateSet,
    request,
    loading,
    packages,
    // TODO
    setInputValue,
  } = useIntertext()

  /**
   * Register state setters
   */
  useEffect(() => {
    /**
     * Register state command
     * if value empty, return current state value
     * otherwise, set the client state
     */
    engine.runner.registerStateCommand(({ props }) => {
      if (!props.state || props.state === "") {
        return state[props.key]
      } else {
        stateSet({
          ...state,
          [props.key]: props.state,
        })
      }
    })
  }, [state, stateSet])

  return (
    <Box
      display="flex"
      flexFlow="column"
      borderLeft="1px"
      borderRight="1px"
      borderColor={mode<string>("gray.200", "gray.700")}
      width="100%"
      height="100%"
    >
      {/** search bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (loading) {
            return
          }
          request({})
        }}
      >
        <Box
          flexShrink={0}
          height="16"
          borderBottom="1px"
          borderColor={mode<string>("gray.200", "gray.700")}
          display="flex"
          alignItems="center"
          pl="4"
          pr="4"
          background={mode<string>("gray.50", "gray.900")}
        >
          <Input
            value={url}
            disabled={loading}
            flexGrow={1}
            placeholder="https://..."
            background={mode<string>("white", "gray.800")}
            onChange={(e) => urlSet(e.target.value)}
          />
          <Button
            type="submit"
            disabled={loading}
            marginLeft="2"
            colorScheme="blue"
            rightIcon={<ArrowForwardIcon />}
          >
            Go
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button marginLeft="2" colorScheme="blue" variant="ghost">
                ?
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverHeader>Demo Links</PopoverHeader>
              <PopoverBody>
                {shortcuts.map((shortcut) => (
                  <Button
                    w="100%"
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    onClick={() =>
                      urlSet(shortcut.url)
                    }
                    rightIcon={<LinkIcon w="3" />}
                  >
                    {shortcut.title}
                  </Button>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </form>

      {/** contents */}
      <Box p="4" flexGrow={1} overflow="auto">
        {loading && (
          <CenterText>
            <Spinner size="xs" marginRight="2" />
            Loading
          </CenterText>
        )}
        {!loading && !packages && (
          <CenterText>
            <SearchIcon size="xs" marginRight="2" />
            Visit a URL to get started
          </CenterText>
        )}
        {!loading && packages && engine.renderer.render({ branch: packages })}
      </Box>
    </Box>
  )
}

export default Search
