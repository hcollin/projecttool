import { Button, Card, Flex, Modal, NavLink, NavLinkProps, Text } from "@mantine/core";
import { useState } from "react";

interface INavLinkConfirmProps extends NavLinkProps {
    confirmMessage: string;
    skipConfirmation?: boolean;
}

const NavLinkConfirm = (props: INavLinkConfirmProps) => {
    const { confirmMessage, onClick, skipConfirmation, ...navLinkProps } = props;
    const [modelOpen, setModelOpen] = useState<boolean>(false);

    return (
        <>
            <Modal opened={modelOpen} onClose={() => setModelOpen(false)} withCloseButton={false}>
                <Card>
                    <Text>{confirmMessage}</Text>

                    <Flex justify="flex-end" gap="md" mt="md">
                        <Button variant="outline" onClick={() => setModelOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={(e) => {
                                setModelOpen(false);
                                if (onClick) {
                                    onClick(e);
                                }
                            }}
                        >
                            Confirm
                        </Button>
                    </Flex>
                </Card>
            </Modal>
            <NavLink
                {...navLinkProps}
                onClick={(e) => {
                    if (skipConfirmation === true) {
                        if (onClick) {
                            onClick(e);
                        }
                        return;
                    }
                    e.preventDefault();
                    setModelOpen(true);
                }}
            />
        </>
    );
};

export default NavLinkConfirm;
