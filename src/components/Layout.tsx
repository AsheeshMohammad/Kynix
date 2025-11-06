import { Outlet } from 'react-router-dom'
import Header from './Header'
import ScrollIndicator from './ScrollIndicator'
import ScrollToTop from './ScrollToTop'

const Layout = () => {
  return (
    <>
      <ScrollIndicator />
      <Header />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Outlet />
      </main>
      <ScrollToTop />
    </>
  )
}

export default Layout