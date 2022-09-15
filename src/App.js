import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Routes, Route, BrowserRouter as Router, } from "react-router-dom";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Events from './pages/Events/Events';
import Join from './pages/Join/Join';

import './App.css';

let theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
        },
        secondary: {
            main: '#7A0BC0',
        },
        dark: {
            light: '#7A0BC0',
            main: '#1A1A40',
            dark: '#270082',
            contrastText: '#FA58B6',
        },
        accent: {
            light: '#FA58B6',
            main: '#FA58B6',
            dark: '#FA58B6',
            contrastText: '#FA58B6',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

theme.typography.h1 = {
    fontFamily: 'pressStart',
    fontWeight: 300
}

theme.typography.h2 = {
    fontFamily: 'pressStart',
    fontWeight: 300,
}

theme.typography.h4 = {
    fontFamily: 'pressStart',
    fontWeight: 300,
    fontSize: '1.5rem',
    '@media (max-width:600px)': {
        fontSize: '1.0rem',
    },
}

theme.typography.h5 = {
    fontFamily: 'pressStart',
    fontWeight: 300,
    fontSize: '1.0rem',
}

theme.typography.subtitle1 = {
    fontWeight: 500,
    fontSize: '1.5rem',
    '@media (max-width:600px)': {
        fontSize: '1.2rem',
    },
}

function App() {
    const pages = [
        {
            name: 'Home',
            path: '/home',
            component: () => <Home />,
        },
        {
            name: 'About Us',
            path: '/about',
            component: () => <About />,
        },
        {
            name: 'Projects',
            path: '/projects',
            component: () => <Projects />,
        },
        {
            name: 'Events',
            path: '/events',
            component: () => <Events />,
        },
        {
            name: 'Join Us',
            path: '/join',
            component: () => <Join />,
        }
    ];

    const renderFrame = (child) => {
        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Header pages={pages} />
                    { child() }
                    <Footer />
                </div>
            </ThemeProvider>
        );
    };

    return (
        <Router>
        <Routes>
            {
                pages.map((route) => {
                    return (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={renderFrame(route.component)}
                        />);
                })
            }
            <Route path="*" element={renderFrame(pages[0].component)} />
        </Routes>
        </Router>
    );
}

export default App;
