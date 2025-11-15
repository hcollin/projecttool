import { useSnapshot } from "valtio/react";
import ProjectCard from "../ProjectCard";
import ProjectCardHeader from "../ProjectCardHeader";
import activeProjectStore from "../../../stores/activeproject/activeProjectStore";
import { Box, Button, Flex, Select, Slider, SliderProps, Stack, Text, Title } from "@mantine/core";
import {
	actionAddNewEmptyPriceGroupToActiveProject,
	actionRemovePriceGroupFromActiveProject,
	actionUpdatePriceGroupInActiveProject,
} from "../../../stores/activeproject/activeProjectActions";
import { useState } from "react";
import { CURRENCY } from "@frosttroll/projecttoolmodels";
import { IconTrash } from "@tabler/icons-react";
import TextInputEdit from "../../TextInputEdit/TextInputEdit";

const ProjectPriceHourlyPriceGroupsCard = () => {
	const apr = useSnapshot(activeProjectStore);

	const [sliderScope, setSliderScope] = useState<{ min: number; max: number }>({ min: 70, max: 120 });

	function handleAddNewPriceGroup() {
		actionAddNewEmptyPriceGroupToActiveProject();
	}

	function handleRemovePriceGroup(prgGuid: string) {
		// Implement the logic to remove a price group
		actionRemovePriceGroupFromActiveProject(prgGuid);
	}

	function handlePriceChange(prgGuid: string, value: number | string | undefined) {
		if (typeof value === "string") {
			value = parseFloat(value);
		}
		const prg = apr.project?.prices.hourlypricegroups.find((pg) => pg.guid === prgGuid);
		if (!prg) {
			return;
		}
		actionUpdatePriceGroupInActiveProject({ ...prg, price: value ?? 0 });
	}

	function handleCurrencyChange(prgGuid: string, currency: CURRENCY | null) {
		const prg = apr.project?.prices.hourlypricegroups.find((pg) => pg.guid === prgGuid);
		if (!prg) {
			return;
		}
		actionUpdatePriceGroupInActiveProject({ ...prg, currency: currency ?? CURRENCY.EUR });
	}

	const project = apr.project;
	if (!project) {
		return null;
	}

	const slideMins: number[] = [30, 50, 70];
	const slideMaxs: number[] = [120, 180, 250];

	const prgs = project.prices.hourlypricegroups;
	return (
		<>
			<ProjectCardHeader label="Hourly Price Groups" addNewAction={handleAddNewPriceGroup}>
				<Flex align="center" gap="xs">
					<Text size="sm">Price range</Text>
					<Button.Group>
						{slideMins.map((min) => (
							<Button
								key={min}
								variant="filled"
								color={sliderScope.min === min ? "blue.7" : "gray.7"}
								onClick={() => setSliderScope((prev) => ({ ...prev, min }))}
							>
								{min}
							</Button>
						))}
					</Button.Group>
					<Text size="lg">-</Text>
					<Button.Group>
						{slideMaxs.map((max) => (
							<Button
								key={max}
								variant="filled"
								color={sliderScope.max === max ? "blue.7" : "gray.7"}
								onClick={() => setSliderScope((prev) => ({ ...prev, max }))}
							>
								{max}
							</Button>
						))}
					</Button.Group>
				</Flex>
			</ProjectCardHeader>

			<ProjectCard>
				<Stack>
					{prgs.map((prg) => {
						const priceMin = Math.min(prg.price, sliderScope.min);
						const priceMax = Math.max(prg.price, sliderScope.max);

						const steps = 4;

						const stepper = Math.round((priceMax - priceMin) / steps);

						const priceSteps: number[] = [priceMin];
						for (let i = 1; i <= steps; i++) {
							priceSteps.push(priceMin + stepper * i);
						}
						if (priceSteps[priceSteps.length - 1] < priceMax) {
							priceSteps.push(priceMax);
						}

						const marks = priceSteps.map((p) => ({ value: p, label: `${p}` }));

						return (
							<Flex key={prg.guid} align="center" justify="space-between" gap="md">
								<TextInputEdit
									style={{ flex: "0 0 auto", width: "25%" }}
									value={prg.name}
									onChange={(val) => {
										actionUpdatePriceGroupInActiveProject({
											...prg,
											name: val,
										});
									}}
								>
									<Title order={4}>{prg.name}</Title>
								</TextInputEdit>

								<Flex
									style={{
										flex: "1 1 auto",
										// width: "45%",
										alignItems: "center",
										marginRight: "2rem",
									}}
								>
									<Box style={{ width: "80%" }} mr="sm">
										<PriceSlider
											initialValue={prg.price}
											min={priceMin}
											max={priceMax}
											step={1}
											marks={marks}
											onDone={(value) => handlePriceChange(prg.guid, value)}
										/>
									</Box>
									<Text size="md">
										<span
											style={{
												fontWeight: "bold",
												fontSize: "1.25em",
												color: "var(--mantine-primary-color-3)",
											}}
										>
											{prg.price}
										</span>{" "}
										{prg.currency}/h
									</Text>
								</Flex>

								<Box style={{ flex: "0 0 auto", width: "15%" }}>
									<Select
										value={prg.currency}
										data={enumToSelectData(CURRENCY)}
										onChange={(value) => handleCurrencyChange(prg.guid, value as CURRENCY)}
									/>
								</Box>

								<Box style={{ flex: "0 0 auto", width: "5%" }}>
									{!prg.permanent && (
										<Button variant="filled" color="red" onClick={() => handleRemovePriceGroup(prg.guid)}>
											<IconTrash />
										</Button>
									)}
								</Box>
							</Flex>
						);
					})}
				</Stack>
			</ProjectCard>
		</>
	);
};

export default ProjectPriceHourlyPriceGroupsCard;

interface PriceSliderProps extends SliderProps {
	initialValue: number;
	onDone: (value: number) => void;
}

const PriceSlider = (props: PriceSliderProps) => {
	const { initialValue, onDone, ...sliderProps } = props;
	const [value, setValue] = useState<number>(initialValue);
	return <Slider {...sliderProps} value={value} onChange={(val) => setValue(val)} onChangeEnd={(val) => onDone(val)} />;
};

function enumToSelectData<E extends Record<string, string>>(en: E): { value: string; label: string }[] {
	return Object.keys(en).map((key) => ({
		value: en[key],
		label: en[key],
	}));
}
