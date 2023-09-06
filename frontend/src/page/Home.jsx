import { Card_container } from '../components/Card_container';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import Carousel from '../components/carousel';
import { Container_button_comprados } from '../components/Container_button_comprados';

export const Home = () => {
 

  return (
    <>
      <Navbar/>
      <Carousel></Carousel>
          <Container_button_comprados />
      <Card_container/>
      <Footer />
    </>
  );
};
