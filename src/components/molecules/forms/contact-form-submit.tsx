import { Button } from "@/components/ui";
import { Loader2, Send, CheckCircle2 } from "@/lib/icons";

interface ContactFormSubmitProps {
  isPending: boolean;
  isSuccess: boolean;
  isValid: boolean;
}

export function ContactFormSubmit({
  isPending,
  isSuccess,
  isValid,
}: ContactFormSubmitProps) {
  return (
    <>
      <Button
        type="submit"
        disabled={isPending || !isValid}
        className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 w-full font-bold transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Sent Successfully!
          </>
        ) : (
          <>
            Send Message <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-muted-foreground text-center text-xs">
        I typically respond within 24 hours
      </p>
    </>
  );
}
