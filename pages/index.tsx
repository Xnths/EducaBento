import { GetStaticProps } from "next";
import Header from '../components/Header'
import Carrossel from '../components/Index/Carrossel'
import AnimationInView from '../components/AnimationInView'
import Materias from "../components/Index/Material";
import Team from "../components/Index/Team";
import Materia from "../components/Materia";
import Footer from "../components/Footer";


interface PropTypes {
  posts: object
}

export default function Home({ posts }: PropTypes): JSX.Element {
  return (
    <>
      <Header></Header>
      <AnimationInView>
        <Carrossel />
      </AnimationInView>
      <Materias />
      <Materia materia='matematica' />
      <Team />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {
    },
    revalidate: 10
  };
};
