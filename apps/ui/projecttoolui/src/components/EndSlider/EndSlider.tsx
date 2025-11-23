import { Slider, SliderProps } from "@mantine/core";
import { useEffect, useState } from "react";

interface EndSliderProps extends SliderProps {
	initialValue: number;
	onDone: (value: number) => void;
}

const EndSlider = (props: EndSliderProps) => {
	const { initialValue, onDone, ...sliderProps } = props;

	const [value, setValue] = useState<number>(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return <Slider {...sliderProps} value={value} onChange={(val) => setValue(val)} onChangeEnd={(val) => onDone(val)} />;
};

export default EndSlider;
