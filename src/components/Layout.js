import Footer from './Footer/Footer'
import Nav from './Navbar/Nav'
import Navbar from './Navbar/Navbar'
import Navigation from './Navigation/Navigation'
import { useWindowDimensions } from '../hooks/useWindowDimensions'

export default function Layout({ children, nav, navbar, title }) {
    const { width } = useWindowDimensions()
    return (
        <>
            {nav && (width < 768 ? <Nav title={title} /> : <Navbar />)}
            {navbar && <Navbar />}
            {children}
            <Navigation />
            <Footer />
        </>
    )
}
