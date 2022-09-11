import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route, BrowserRouter as Router, } from "react-router-dom";

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Events from './components/Events/Events';
import Join from './components/Join/Join';
import './App.css';

let theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
        },
        secondary: {
            main: '#B00093',
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

theme.typography.h4 = {
    fontFamily: 'pressStart',
    fontWeight: 300
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
