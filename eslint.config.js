import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    ignores: ['coverage/**'],
  },
  pluginJs.configs.recommended,
];
// import globals from "globals";
// import pluginJs from "@eslint/js";


// export default [
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
// ];