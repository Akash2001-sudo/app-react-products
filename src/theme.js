import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
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

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#60a5fa',
        },
        secondary: {
            main: '#818cf8',
        },
        background: {
            default: '#1e293b',
            paper: '#2d3a50',
        },
        text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
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
                    backgroundColor: '#2d3a50',
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'rgba(96, 165, 250, 0.1)',
                        borderBottom: 'none',
                        fontWeight: 700,
                    },
                    '& .MuiDataGrid-row': {
                        transition: 'transform 160ms ease, background-color 120ms ease',
                        '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 8px 26px rgba(0, 0, 0, 0.2)',
                            backgroundColor: 'rgba(96, 165, 250, 0.1)',
                        },
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(241, 245, 249, 0.1)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
                    borderRadius: 12,
                    backgroundColor: '#2d3a50',
                },
            },
        },
    },
});

export const getTheme = (mode) => (mode === 'dark' ? darkTheme : lightTheme);

export default lightTheme;
