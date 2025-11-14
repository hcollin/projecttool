// IMPORT: General Libraries
import { AppShell, Divider, NavLink } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useSnapshot } from "valtio";

// IMPORT: Custom Components
import MainHeader from "../MainHeader/MainHeader";
import NavLinkConfirm from "../NavLinkConfirm/NavLinkConfirm";

// IMPORT: Stores & Actions
import activeProjectStore from "../../stores/activeproject/activeProjectStore";
import { actionSaveActiveProject } from "../../stores/activeproject/activeProjectActions";

// IMPORT: Icons
import { IconDeviceFloppy, IconOctagonPlus } from "@tabler/icons-react";

// IMPORT: Styles
import "./project-shell.css";
import { actionCreateNewProject } from "../../stores/generalActions";

const ProjectShell = (props: { children: React.ReactNode }) => {
    const aps = useSnapshot(activeProjectStore);

    return (
        <AppShell
            padding={0}
            layout="default"
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
            className="project-shell"
        >
            <AppShell.Header>
                <MainHeader />
            </AppShell.Header>

            <AppShell.Navbar className="project-navbar">
                <NavLinkConfirm
                    label="New Project"
                    confirmMessage="Are you sure you want to create a new project?"
                    skipConfirmation={aps.unsavedChanges === false}
                    onClick={() => {
                        actionCreateNewProject();
                    }}
                    leftSection={<IconOctagonPlus />}
                />

                <NavLink
                    label={`Save Project${aps.project ? ": " + aps.project.codename : ""}`}
                    disabled={!aps.unsavedChanges}
                    leftSection={<IconDeviceFloppy />}
                    onClick={() => {
                        actionSaveActiveProject();
                    }}
                />

                <Divider
                    label={aps.project ? aps.project.codename : "No Active Project"}
                    labelPosition="center"
                    my="sm"
                />
                <NavLink label="Home" component={Link} to="/project/dashboard" disabled={!aps.project} />
                <NavLink label="Settings" component={Link} to="/project/settings" disabled={!aps.project} />

                <Divider label="Project Management" labelPosition="center" my="sm" />
                <NavLink label="Phases" component={Link} to="/project/phases" disabled={!aps.project} />
                <NavLink label="Pricing" component={Link} to="/project/pricing" disabled={!aps.project} />
                <NavLink label="Resources" component={Link} to="/project/resources" disabled={!aps.project} />

                <Divider label="Solution" labelPosition="center" my="sm" />
                <NavLink label="Technologies" component={Link} to="/project/technology" disabled={!aps.project} />
            </AppShell.Navbar>

            <AppShell.Main className="main-content">{props.children}</AppShell.Main>

            <AppShell.Footer>
                <p>&copy; {new Date().getFullYear()} Henrik Collin</p>
            </AppShell.Footer>
        </AppShell>
    );
};

export default ProjectShell;
