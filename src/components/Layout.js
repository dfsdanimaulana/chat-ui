import Footer from './Footer/Footer'
import Nav from './Navbar/Nav'
import Navbar from './Navbar/Navbar'
import Navigation from './Navigation/Navigation'

export default function Layout({ children, nav, navbar, navigation, footer }) {
    return (
        <>
            {nav && <Nav />}
            {navbar && <Navbar />}
            {children}
            {navigation && <Navigation />}
            {footer && <Footer />}
        </>
    )
}
