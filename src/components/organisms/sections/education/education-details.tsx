interface EducationDetailsProps {
  degree: string;
  notes?: string | undefined;
}

export const EducationDetails = ({ degree, notes }: EducationDetailsProps) => {
  return (
    <div className="flex flex-1 flex-col justify-start gap-2">
      <h3 className="text-accent text-xl font-bold">{degree}</h3>

      {notes && (
        <p className="text-muted-foreground text-sm leading-relaxed">{notes}</p>
      )}
    </div>
  );
};
