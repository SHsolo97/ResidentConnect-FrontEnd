import { createTheme  } from "@material-ui/core/styles";
import { blue, grey, red,orange } from '@material-ui/core/colors';
import hexToRgb from "./hex-to-rgb.js";
import themeColors from "./colors.js";

export default createTheme ({
    palette: {
        ...themeColors,
        buttonLightLabel: {
          main: "rgba(" + hexToRgb(themeColors.white.main) + ", 0.95)",
        },
        sidebarLinks: {
          main: "rgba(" + hexToRgb(themeColors.black.main) + ", 0.5)",
          dark: "rgba(" + hexToRgb(themeColors.black.main) + ", 0.9)",
        },
        adminNavbarSearch: {
          main: "rgba(" + hexToRgb(themeColors.white.main) + ", 0.6)",
        },
        authNavbarLink: {
          main: "rgba(" + hexToRgb(themeColors.white.main) + ", 0.65)",
          dark: "rgba(" + hexToRgb(themeColors.white.main) + ", 0.95)",
        },
      },
       overrides: {
           
        MuiButton: {
            root: {
              position: "relative",
              textTransform: "none",
              transition: "all .15s ease",
              letterSpacing: ".025em",
              fontSize: ".875rem",
              padding: ".625rem 1.25rem",
              willChange: "transform",
              border: "1px solid transparent",
              lineHeight: "1.5",
              borderRadius: ".375rem",
              userSelect: "none",
              display: "inline-block",
              fontWeight: "600",
              textAlign: "center",
              verticalAlign: "middle",
             // boxShadow: "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)",
              "&:hover": {
                transform: "translateY(-1px)",
              },
            },
    }
  }
}
);