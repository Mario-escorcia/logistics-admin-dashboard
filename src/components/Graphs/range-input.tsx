// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

/* global requestAnimationFrame, cancelAnimationFrame */
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import {useEffect, useState} from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
// import {styled, withStyles} from '@material-ui/core/styles';
// import Slider from '@material-ui/core/Slider';
// import Button from '@material-ui/core/IconButton';
// import PlayIcon from '@material-ui/icons/PlayArrow';
// import PauseIcon from '@material-ui/icons/Pause';

const PositionContainer = styled('div')({
  position: 'absolute',
  zIndex: 1,
  bottom: '40px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const SliderInput = styled(Slider)(() => ({
  marginLeft: 12,
  width: '40%',
  '& .MuiSlider-valueLabel': {
    whiteSpace: 'nowrap',
    background: 'none',
    color: '#fff',
  },
}));
export default function RangeInput({
  min,
  max,
  value,
  animationSpeed,
  onChange,
  // formatLabel
}: {
  min: number;
  max: number;
  value: number;
  animationSpeed: number;
  // formatLabel: (x: number) => string;
  onChange: (newValue: number) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(true);

  // prettier-ignore
  useEffect(() => {
    let animation : any;

    if (isPlaying) {
      animation = requestAnimationFrame(() => {
        let nextValue = value + animationSpeed;
        if (nextValue > max) {
          nextValue = min;
        }
        onChange(nextValue);
      });
    }

    return () => animation && cancelAnimationFrame(animation);
  });

  return (
    <PositionContainer>
      <Button
        color="primary"
        onClick={() => setIsPlaying(!isPlaying)}
        title={isPlaying ? 'Stop' : 'Animate'}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </Button>
      <SliderInput
        min={min}
        max={max}
        value={value}
        onChange={( newValue : any) => onChange(newValue as number)}
        valueLabelDisplay="on"
        // valueLabelFormat={formatLabel}
      />
    </PositionContainer>
  );
}