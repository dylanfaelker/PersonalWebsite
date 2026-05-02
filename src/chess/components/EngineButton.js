import React, { useState } from 'react'
import { useTheme } from '@mui/material'
import { Box } from '@mui/material'

const EngineButton = ({ children }) => {

  const theme = useTheme()

  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    padding: '0.8em 1.8em',
    border: `2px solid ${theme.palette.df.lightGreen}`,
    width: '140px',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '16px',
    transition: '.3s',
    zIndex: 1,
    fontFamily: 'inherit',
    color: isHovered ? theme.palette.df.darkGreen : theme.palette.df.lightGreen,
    cursor: 'pointer',
    display: 'inline-block',
    textDecoration: 'none'
  };

  const beforeStyle = {
    content: '""',
    width: isHovered ? '105%' : '0',
    height: '300%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    background: theme.palette.df.lightGreen,
    transition: '.5s ease',
    display: 'block',
    zIndex: -1,
  };

  return (
    <Box
      sx={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={beforeStyle} />
      {children}
    </Box>
  );
};

export default EngineButton;