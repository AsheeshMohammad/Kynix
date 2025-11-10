import Banner from '../components/Banner'
import OurWork from '../components/OurWork'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <main>
      <section id="home">
        <Banner />
      </section>
      <section id="work">
        <OurWork />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </main>
  )
}

export default Home