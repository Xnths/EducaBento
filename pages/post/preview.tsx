import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import { Document } from 'prismic-javascript/types/documents';
import { useRouter } from 'next/router'
import materiasJson from '../../data/materias.json'
import { FormateData } from '../../utils/functions'
import api from '../../utils/api'

import { client } from '../../utils/prismic_configuration';

import AnimationInView from '../../components/AnimationInView'
import Header from '../../components/Header'
import Presentation from '../../components/Post/Presentation'
import Author,{AuthorProps} from '../../components/Post/Author'
import Post from "../../components/Post";
import Footer from "../../components/Footer";

interface PathProps {
  params: {
    uid: string;
  };
  preview: boolean,
  previewData:any
}

interface PropTypes {
  post: Document,
  author: AuthorProps
}

export default function BlogPost({ post, author }: PropTypes): JSX.Element {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <h1>Carregando...</h1>
  }

  return (
    <>
      <Head>
        <title>Post | {RichText.asText(post.data.title)}</title>
        <meta
          name="og:title"
          property="og:title"
          content={RichText.asText(post.data.title)}
        />
        <meta
          name="description"
          content={RichText.asText(post.data.description)}
        />
      </Head>
      <Header />

      <AnimationInView>
        <Presentation title={RichText.asText(post.data.title)} description={RichText.asText(post.data.description)} date={post.data.formattedDate} image={`/icons${materiasJson.object[RichText.asText(post.data.materia)].icon}`} />
      </AnimationInView>

      <div>
        <Post post={post} />

        <Author author={author}/>
      </div>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await client.query(
    Prismic.Predicates.at('document.type', 'blog_post'),
    { orderings: '[my.post.date desc]' }
  );

  const allBlogPosts = [];

  posts.results.map((post) => {
    allBlogPosts.push({ params: { uid: post.uid } });
  });

  return {
    paths: allBlogPosts,
    fallback: 'blocking',
  };
};


import { Db, Collection } from 'mongodb'
import connectToDataBase from '../../utils/connectToDataBase'

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }: PathProps) => {

  const response = await client.getByUID('blog_posts', previewData, {
    lang: 'pt-br',
  });

  response.data.formattedDate = FormateData({ post: response })

  const db: Db = await connectToDataBase(null)
  const author = await db.collection('members').findOne({ authorID: RichText.asText(response.data.author) })

  return {
    props: {
      post: response,
      author: author
    }
  };
};