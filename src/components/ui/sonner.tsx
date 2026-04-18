import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    position="top-center"
    toastOptions={{
      style: {
        background: "rgba(255, 255, 255, 0.10)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.12)",
        color: "#ffffff",
        fontFamily: "Barlow, sans-serif",
        fontSize: "0.875rem",
        borderRadius: "9999px",
        padding: "12px 20px",
      },
    }}
    {...props}
  />
);

export { Toaster };
export { toast } from "sonner";
