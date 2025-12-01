// IMPORT: General Libraries
import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, Card, Divider, Flex, Stack, Text, Title } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

// IMPORT: Icons
import { IconPlus } from "@tabler/icons-react";

// IMPORT: Custom Components
import DataShell from "../../../components/DataShell/DataShell";
import ProjectCard from "../../../components/ProjectComponents/ProjectCard";

// IMPORT: Custom hooks
import { useTexts } from "../../../api/texts/textsHooks";

// IMPORT: Common models
import { IText } from "@frosttroll/projecttoolmodels";

// IMPORT: Utils
import { formatTs } from "../../../utils/formatingUtils";

export const Route = createFileRoute("/data/texts/")({
	component: TextsComponent,
});

function TextsComponent() {
	const { texts } = useTexts();

	const [lang, setLang] = useState<string | null>(null);

	const [keywords, setKeywords] = useState<string[]>([]);

	const [searchText, setSearchText] = useState<string>("");

	const navigate = useNavigate({ from: "/data/texts" });

	useEffect(() => {
		const keywords = texts.reduce((keywords: Set<string>, txt) => {
			if (txt.keywords && txt.keywords.length > 0) {
				txt.keywords.forEach((kw) => keywords.add(kw.toLowerCase()));
			}
			return keywords;
		}, new Set<string>());
		setKeywords(Array.from(keywords).sort());
	}, [texts]);

	function handleClickText(txt: IText) {
		if (txt.guid) {
			navigate({ to: `/data/texts/edit/${txt.guid}` });
		}
	}

	function handleNewText() {
		navigate({ to: `/data/texts/new` });
	}

	const filteredTexts = (lang ? texts.filter((t) => t.language === lang) : texts).filter((t) => {
		if (searchText.trim() === "" || searchText.trim().length < 2) {
			return true;
		}
		const matcheskeywords = t.keywords?.some((kw) => kw.toLowerCase().includes(searchText.toLowerCase()));
		const matchesName = t.name.toLowerCase().includes(searchText.toLowerCase());

		return matcheskeywords || matchesName;
	});

	return (
		<DataShell>
			<Flex align="center" justify="space-between" mb="md">
				<Title order={1}>Texts</Title>
				<Button size="md" variant="filled" leftSection={<IconPlus />} onClick={handleNewText}>
					New Text
				</Button>
			</Flex>

			<ProjectCard>
				<Flex align="center" justify="space-between" mb="md">
					<Text size="lg" flex="2 2 auto">
						Texts: {filteredTexts.length} / {texts.length}
					</Text>

					<Autocomplete
						flex="3 3 auto"
						placeholder="Filter texts by keywords or name"
						value={searchText}
						onChange={setSearchText}
						data={[...keywords]}
						size="md"
					/>
					<Flex align="center" gap="xs" flex="1 1 auto" justify="flex-end">
						<Button variant="transparent" disabled={lang === "fi"}>
							<img src="/flags/fi.png" alt="Finnish" width={24} height={16} onClick={() => setLang("fi")} />
						</Button>
						<Button variant="transparent" disabled={lang === "en"}>
							<img src="/flags/en.png" alt="English" width={24} height={16} onClick={() => setLang("en")} />
						</Button>
						<Button variant="transparent" onClick={() => setLang(null)} disabled={lang === null}>
							All
						</Button>
					</Flex>
				</Flex>
				<Divider />
				<Stack gap="0">
					<Card>
						<Flex align="center " justify="flex-start">
							<Text size="sm" flex="0 0 auto" fw="bold" style={{ width: "50px" }}>
								Lang
							</Text>
							<Text size="sm" flex="1 1 auto" fw="bold" ml="xs">
								Name
							</Text>
							<Text size="sm" flex="0 0 auto" ml="xs" style={{ width: "150px" }}>
								Created At
							</Text>
							<Text size="sm" flex="0 0 auto" ml="xs" style={{ width: "150px" }}>
								Updated At
							</Text>
							<Text size="sm" flex="0 0 auto" ml="xs" style={{ width: "100px" }}>
								Length
							</Text>
							<Text size="sm" ml="xs" style={{ width: "250px" }}>
								Keywords
							</Text>
							<Text size="sm" ml="xs" style={{ width: "50px" }}>
								Langs
							</Text>
						</Flex>
					</Card>
					{filteredTexts.map((txt) => (
						<TextItem key={txt.guid} txt={txt} onClick={handleClickText} />
					))}
				</Stack>
			</ProjectCard>
		</DataShell>
	);
}

const TextItem = (props: { txt: IText; onClick: (txt: IText) => void }) => {
	const { txt } = props;

	const { metadata } = txt;
	return (
		<Card padding="xs" onClick={() => props.onClick(txt)} style={{ cursor: "pointer" }}>
			<Flex align="center" justify="flex-start" mb="sm" style={{ borderBottom: "solid 1px #8882" }}>
				<Box flex="0 0 auto" style={{ width: "50px", textAlign: "center" }}>
					<img src={`/flags/${txt.language}.png`} alt={txt.language} width={32} height={20} />
				</Box>
				<Title ml="xs" order={5} flex="1 1 auto">
					{txt.name}
				</Title>

				<Text size="sm" flex="0 0 auto" ml="xs" style={{ width: "150px" }}>
					{metadata ? formatTs(metadata.createdAt) : "-"}
				</Text>
				<Text size="sm" flex="0 0 auto" ml="xs" style={{ width: "150px" }}>
					{metadata && metadata.updatedAt ? formatTs(metadata.updatedAt) : "Not updated"}
				</Text>
				<Text size="sm" flex="0 0 auto" ml="xs" style={{ width: "100px" }}>
					{metadata ? metadata.contentLength + " chars" : "??"}
				</Text>

				<Text size="xs" ml="xs" style={{ width: "250px" }}>
					{txt.keywords && txt.keywords.length > 0 ? txt.keywords.slice(0, 5).join(", ").toLocaleLowerCase() : "No keywords"}
				</Text>

				<Text size="xs" ml="xs" style={{ width: "50px" }}>
					{txt.langlinks && Object.keys(txt.langlinks).length > 0 ? Object.keys(txt.langlinks).join(", ") : "-"}
				</Text>
			</Flex>
		</Card>
	);
};
