import React, { ReactNode } from "react";

export interface TOfSpacing {
  pTop?: number | string;
  pBottom?: number | string;
  mTop?: number | string;
  mBottom?: number | string;
  children?: ReactNode;
}

export default function Spacing({
  pTop,
  pBottom,
  mTop,
  mBottom,
  ...props
}: TOfSpacing) {
  return <div style={{marginTop:mTop,marginBottom:mBottom,paddingTop:pTop,paddingBottom:pBottom}}>{props.children}</div>;
}
