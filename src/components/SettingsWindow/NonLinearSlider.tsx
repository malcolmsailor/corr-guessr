import Slider, { type SliderProps } from "@mui/material/Slider";

interface NonLinearSliderProps extends SliderProps {
  calculateValue: (value: number) => number;
}

export default function NonLinearSlider({
  calculateValue,
  ...props
}: NonLinearSliderProps) {
  return <Slider {...props} scale={calculateValue} valueLabelDisplay="auto" />;
}
