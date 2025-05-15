// based on https://mui.com/material-ui/react-slider/#InputSlider.tsx

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { useId } from "react";
import NonLinearSlider from "../SettingsWindow/NonLinearSlider";

interface SliderWithInputProps {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  label: string;
  calculateValue?: (value: number) => number;
  step?: number;
  inputWidth: number;
}

export default function SliderWithInput({
  label,
  value,
  setValue,
  min,
  max,
  step,
  calculateValue = undefined,
  inputWidth = 42,
}: SliderWithInputProps) {
  const handleSliderChange = (
    _event: Event,
    newValue: number | number[],
    _activeThumb: number
  ) => {
    if (calculateValue) {
      setValue(calculateValue(newValue as number));
    } else {
      setValue(newValue as number);
    }
  };
  const Input = styled(MuiInput)`
    width: ${inputWidth}px;
  `;
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (calculateValue) {
      setValue(calculateValue(Number(event.target.value)));
    } else {
      setValue(event.target.value === "" ? 0 : Number(event.target.value));
    }
  };
  const id = `${label}-input-slider-${useId()}`;
  const sliderProps = {
    value: typeof value === "number" ? value : 0,
    onChange: handleSliderChange,
    min,
    max,
    step,
    "aria-labelledby": id,
  };
  let slider;
  if (calculateValue) {
    slider = (
      <NonLinearSlider calculateValue={calculateValue} {...sliderProps} />
    );
  } else {
    slider = <Slider {...sliderProps} />;
  }
  return (
    <>
      <Typography id={id} sx={{ marginBottom: -1 }}>
        {label}
      </Typography>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid size="grow">{slider}</Grid>
        <Grid>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step,
              min,
              max,
              type: "number",
              "aria-labelledby": id,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

// function InputSlider() {
//   const [value, setValue] = useState(30);

//   const handleSliderChange = (event: Event, newValue: number) => {
//     setValue(newValue);
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(event.target.value === "" ? 0 : Number(event.target.value));
//   };

//   const handleBlur = () => {
//     if (value < 0) {
//       setValue(0);
//     } else if (value > 100) {
//       setValue(100);
//     }
//   };

//   return (
//     <Box sx={{ width: 250 }}>
//       <Typography id="input-slider" gutterBottom>
//         Volume
//       </Typography>
//       <Grid container spacing={2} sx={{ alignItems: "center" }}>
//         <Grid>
//           <VolumeUp />
//         </Grid>
//         <Grid size="grow">
//           <Slider
//             value={typeof value === "number" ? value : 0}
//             onChange={handleSliderChange}
//             aria-labelledby="input-slider"
//           />
//         </Grid>
//         <Grid>
//           <Input
//             value={value}
//             size="small"
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             inputProps={{
//               step: 10,
//               min: 0,
//               max: 100,
//               type: "number",
//               "aria-labelledby": "input-slider",
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
