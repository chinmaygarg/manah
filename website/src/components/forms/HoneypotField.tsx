interface HoneypotFieldProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * A visually-hidden field bots tend to auto-fill. Real users never see or
 * focus it; a non-empty value server-side flags the submission as a bot.
 * Kept out of the tab order and hidden from assistive tech.
 */
export default function HoneypotField({
  value,
  onChange,
}: HoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        whiteSpace: "nowrap",
      }}
    >
      <label htmlFor="company_website">
        Company website (leave this field empty)
      </label>
      <input
        type="text"
        id="company_website"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
