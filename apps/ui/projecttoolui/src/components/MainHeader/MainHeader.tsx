import { Flex, Box, Button } from "@mantine/core";
import AnchorLink from "../AnchorLink/AnchorLink";

const MainHeader = () => {
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
                <Button variant="outline" size="md">
                    Logout?
                </Button>
            </Box>
        </Flex>
    );
};

export default MainHeader;
