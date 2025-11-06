import Banner from '../components/Banner'
import OurWork from '../components/OurWork'

const Home = () => {
  return (
    <main>
      <section id="home">
        <Banner />
      </section>
      <section id="work">
        <OurWork />
      </section>
    </main>
  )
}

export default Home