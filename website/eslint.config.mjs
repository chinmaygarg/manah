import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/*
 * ESLint flat config (ESLint 9 + Next 16).
 * `next lint` was removed in Next 16, so linting runs through the ESLint CLI
 * (`npm run lint`). eslint-config-next v16 ships native flat-config presets,
 * so they are spread in directly — no FlatCompat bridge needed.
 */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/lib/blur-map.ts",
    ],
  },
];

export default eslintConfig;
