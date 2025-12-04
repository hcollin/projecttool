import { Flex, Box, Button, useMantineColorScheme } from "@mantine/core";
import AnchorLink from "../AnchorLink/AnchorLink";
import { IconMoon, IconSun } from "@tabler/icons-react";

const MainHeader = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const linkStyle: React.CSSProperties = {
        margin: "0 15px",
        fontSize: "1.25rem",
    };

    return (
        <Flex align="center" justify="space-between" h="100%" px="md">
            <Box>
                <AnchorLink to="/" style={linkStyle}>
                    Home
                </AnchorLink>
                <AnchorLink to="/project" style={linkStyle}>
                    Projects
                </AnchorLink>
                <AnchorLink to="/data" style={linkStyle}>
                    Data
                </AnchorLink>
                <AnchorLink to="/" style={linkStyle}>
                    User
                </AnchorLink>
                <AnchorLink to="/dev" style={linkStyle}>
                    Debug & Dev
                </AnchorLink>
            </Box>

            <Box>
                <Button variant="outline" size="md" onClick={() => toggleColorScheme()} mr="lg">
                    {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
                </Button>
                <Button variant="outline" size="md">
                    Logout?
                </Button>
            </Box>
        </Flex>
    );
};

export default MainHeader;
