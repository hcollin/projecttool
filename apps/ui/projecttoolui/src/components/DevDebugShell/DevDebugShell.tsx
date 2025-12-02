// IMPORT: General Libraries
import { AppShell, Center, Container, Divider, Title } from "@mantine/core";
// import { Link } from "@tanstack/react-router";
// import { useSnapshot } from "valtio";
import AnchorLink from "../AnchorLink/AnchorLink";

// IMPORT: Custom Components
import MainHeader from "../MainHeader/MainHeader";

// IMPORT: Stores & Actions
// import activeProjectStore from "../../stores/activeproject/activeProjectStore";

// IMPORT: Icons

// IMPORT: Styles
// import "./data-shell.css";''


const DevDebugShell = (props: { children: React.ReactNode; noContainer?: boolean }) => {
    // const aps = useSnapshot(activeProjectStore);

    return (
        <AppShell
            padding={0}
            layout="alt"
            withBorder={true}
            header={{ height: 80 }}
            navbar={{
                width: "300px",
                breakpoint: "sm",
                // collapsed: { mobile: !navOpenMobile, desktop: !navOpenMobile },
            }}
            aside={{
                width: 200,
                collapsed: { mobile: true, desktop: true },
                breakpoint: "lg",
            }}
            className="dev-debug-shell"
        >
            <AppShell.Header>
                <MainHeader />
            </AppShell.Header>

            <AppShell.Navbar className="dev-debug-navbar">
                <AnchorLink to="/" style={{ padding: "0.5rem", marginBottom: "1rem" }}>
                    <Title order={1}>Project Tool</Title>
                </AnchorLink>
                <Divider label="Debug & Dev Tools" labelPosition="center" my="sm" />
            </AppShell.Navbar>

            <AppShell.Main className="main-content">
                {props.noContainer ? props.children : <Container size="xl">{props.children}</Container>}
            </AppShell.Main>

            <AppShell.Footer>
                <Center>
                    <p>&copy; {new Date().getFullYear()} Henrik Collin</p>
                </Center>
            </AppShell.Footer>
        </AppShell>
    );
};

export default DevDebugShell;
