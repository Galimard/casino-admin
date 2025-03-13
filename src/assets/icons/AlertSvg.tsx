import { FC } from 'react';

interface SvgProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

export const AlertSvg: FC<SvgProps> = ({
  width = 22,
  height = 22,
  fill = "none",
  className
}) => {
  return (
    <svg width={width} height={height} fill={fill} className={className}>
      <path d="M10.083 13.75H11.9163V15.5834H10.083V13.75ZM10.083 6.41671H11.9163V11.9167H10.083V6.41671ZM10.9905 1.83337C5.93051 1.83337 1.83301 5.94004 1.83301 11C1.83301 16.06 5.93051 20.1667 10.9905 20.1667C16.0597 20.1667 20.1663 16.06 20.1663 11C20.1663 5.94004 16.0597 1.83337 10.9905 1.83337ZM10.9997 18.3334C6.94801 18.3334 3.66634 15.0517 3.66634 11C3.66634 6.94837 6.94801 3.66671 10.9997 3.66671C15.0513 3.66671 18.333 6.94837 18.333 11C18.333 15.0517 15.0513 18.3334 10.9997 18.3334Z" fill="#ED1E24"/>
    </svg>
  );
}