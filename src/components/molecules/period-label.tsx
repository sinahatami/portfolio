import type { Period, YearMonth } from "@/domain/portfolio";
import { formatDuration, formatYearMonth, periodMonths } from "@/lib/dates";
import { cn } from "@/lib/utils";

interface PeriodLabelProps {
  period: Period;
  now: YearMonth;
  showDuration?: boolean;
  className?: string;
}

/** "May 2019 – Jun 2021" with machine-readable <time> elements. */
export function PeriodLabel({
  period,
  now,
  showDuration = false,
  className,
}: PeriodLabelProps) {
  return (
    <span className={cn("tabular", className)}>
      <time dateTime={period.start}>{formatYearMonth(period.start)}</time>
      {" – "}
      {period.end ? (
        <time dateTime={period.end}>{formatYearMonth(period.end)}</time>
      ) : (
        "Present"
      )}
      {showDuration ? (
        <span className="text-muted-foreground block text-xs">
          {formatDuration(periodMonths(period, now))}
        </span>
      ) : null}
    </span>
  );
}
