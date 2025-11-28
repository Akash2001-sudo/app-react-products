
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#4f46e5',
    },
    background: {
      default: '#f3f6fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(37, 99, 235, 0.06)',
            borderBottom: 'none',
            fontWeight: 700,
          },
          '& .MuiDataGrid-row': {
            transition: 'transform 160ms ease, background-color 120ms ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 26px rgba(2, 6, 23, 0.08)',
              backgroundColor: 'rgba(37, 99, 235, 0.06)',
            },
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid rgba(15, 23, 42, 0.04)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 12px 30px rgba(2, 6, 23, 0.06)',
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
