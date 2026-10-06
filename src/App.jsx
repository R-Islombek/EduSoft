import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Courses from "./components/Courses/Courses";
import Mentors from "./components/Mentors/Mentors";
import Pricing from "./components/Pricing/Pricing";
import Testimonials from "./components/Testimonials/Testimonials";
import Register from "./components/Contact/Register";
import SuccessStories from "./components/SuccessStories/SuccessStories"
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Courses />
      <Mentors />
      <Pricing />
      <Testimonials />
      <SuccessStories/>
      <Register />
      <Footer />
    </>
  );
}

export default App;
