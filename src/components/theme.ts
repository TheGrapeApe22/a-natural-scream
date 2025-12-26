import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation";

export const appTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: 'cause, sans-serif',
  },
  components: {
    MuiTimeField: {
      defaultProps: {
        slotProps: {
          textField: {
            size: "small",
            variant: "outlined",
            sx: {
              width: "16ch",
              '& .MuiInputBase-input': {
                padding: '0px 0px',
              },
            },
          },
        },
      },
    }
  }
});
