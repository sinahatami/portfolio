import type { ReactNode } from "react";
import type { ErrorInfo } from "react";

export type { ReactNode, ErrorInfo };

// Common types used across the app
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
  title?: string;
  subtitle?: string;
}
