import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation";

export const appTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiMobileTimePicker: {
      defaultProps: {
        slotProps: {
          textField: {
            size: "small",
            variant: "outlined",
            sx: {
              width: 140,
              '& .MuiInputBase-input': { padding: '6px 8px' },
            },
          },
        },
      },
    },
    // MuiTextField: {
    //   defaultProps: {
    //     size: "small",
    //     variant: "outlined",
    //   },
    //   styleOverrides: {
    //     root: {
    //       width: 140,
    //     },
    //   },
    // },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     input: {
    //       padding: "6px 8px",
    //     },
    //   },
    // },
  },
});
