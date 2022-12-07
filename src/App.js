import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import Events from "./pages/Events/Events";
import Join from "./pages/Join/Join";

import "./App.css";

// Theming for each of the MUI components
let theme = createTheme({
    palette: {
        primary: {
            main: "#FFFFFF",
        },
        secondary: {
            main: "#7A0BC0",
        },
        dark: {
            light: "#7A0BC0",
            main: "#1A1A40",
            dark: "#270082",
            contrastText: "#FA58B6",
        },
        accent: {
            light: "#FA58B6",
            main: "#FA58B6",
            dark: "#FA58B6",
            contrastText: "#FA58B6",
        },
    },
    typography: {
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            "\"Segoe UI\"",
            "Roboto",
            "\"Helvetica Neue\"",
            "Arial",
            "sans-serif",
            "\"Apple Color Emoji\"",
            "\"Segoe UI Emoji\"",
            "\"Segoe UI Symbol\"",
        ].join(","),
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#7A0BC0",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#7A0BC0",
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                gutterBottom: {
                    marginBottom: 12,
                },
            },
        },
    },
});

theme.typography.h1 = {
    fontFamily: "pressStart",
    fontWeight: 300,
};

theme.typography.h2 = {
    fontFamily: "pressStart",
    fontWeight: 300,
};

theme.typography.h4 = {
    fontFamily: "pressStart",
    fontWeight: 300,
    fontSize: "1.5rem",
    "@media (max-width:600px)": {
        fontSize: "1.0rem",
    },
    "&.MuiTypography-gutterBottom": {
        marginBottom: 32,
    },
};

theme.typography.h5 = {
    fontFamily: "pressStart",
    fontWeight: 300,
    fontSize: "1.0rem",
};

theme.typography.subtitle1 = {
    fontWeight: 300,
    fontSize: "1.5rem",
};

theme.typography.subtitle2 = {
    fontWeight: 300,
    fontSize: "1.0rem",
};

theme.typography.subtitle3 = {
    fontWeight: 'bold',
    fontSize: '1.0rem',
};

/**
 * Main Application
 */
function App() {
    // Pages for the application
    const pages = [
        {
            name: "Home",
            path: "/home",
            component: () => <Home />,
        },
        {
            name: "About Us",
            path: "/about",
            component: () => <About />,
        },
        {
            name: "Projects",
            path: "/projects",
            component: () => <Projects />,
        },
        {
            name: "Events",
            path: "/events",
            component: () => <Events />,
        },
        {
            name: "Join Us",
            path: "/join",
            component: () => <Join />,
        },
    ];

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Header pages={pages} />
                    <Routes>
                        {
                            pages.map((route) => {
                                return (
                                    <Route
                                        key={route.name}
                                        path={route.path}
                                        element={route.component()}
                                    />);
                            })
                        }
                        <Route path="*" element={pages[0].component()} />
                    </Routes>
                    <Footer />
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
