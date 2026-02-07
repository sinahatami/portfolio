"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AnimationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Animation error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 text-center">
          <p className="text-muted-foreground mb-2 text-sm">
            Animation error occurred
          </p>
          <Button
            onClick={() => this.setState({ hasError: false })}
            size="sm"
            variant="outline"
          >
            <RefreshCw className="mr-2 h-3 w-3" />
            Retry Animation
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
