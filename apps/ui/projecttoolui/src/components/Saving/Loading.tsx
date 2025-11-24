import { Loader, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";

const Loading = () => {
    const [dots, setDots] = useState(".");

    useEffect(() => {
        const clear = setInterval(() => {
            setDots((prev) => {
                if (prev.length >= 3) {
                    return ".";
                } else {
                    return prev + ".";
                }
            });
        }, 500);

        return () => clearInterval(clear);
    }, []);

    return (
        <Stack justify="center" align="center" style={{ width: "100%" }}>
            <Loader size={250} />
            <Title order={2} mt="md">
                Loading{dots}
            </Title>
        </Stack>
    );
};

export default Loading;
