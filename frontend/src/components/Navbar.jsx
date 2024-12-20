import {Container, Flex, HStack, Link, Button, Text} from "@chakra-ui/react";
import {LiaPlusSquare} from "react-icons/lia";
import {useColorMode} from "./ui/color-mode.jsx";

export default function Navbar() {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <Container maxW="1140px" px="2">
            <Flex h={16} alignItems="center" justifyContent="space-between" flexDirection={{base: 'column', md: 'row'}}>
                <Text
                    fontSize={{base: "22", sm: "28" }}
                    fontWeight="bold"
                    textTransform="uppercase"
                    textAlign="center"
                    bgGradient={colorMode === "dark" ? "linear(to-r, gray.600, gray.800)" : "linear(to-r, tomato, pink)"}
                    bgClip="red"
                >
                    <Link to="/">Product Store</Link>
                </Text>
                <HStack spacing={2} alignItems="center" justifyContent="space-between">
                    <Link to="/create">
                        <Button>
                            <LiaPlusSquare />
                        </Button>
                    </Link>

                    <Button onClick={toggleColorMode}>
                        {colorMode === "dark" ? "🌚" : "🌝"}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
}