import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/layout";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
const Home = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Layout>
      <Link>
        <NextLink href="/create-post">Create post</NextLink>
      </Link>
      <div>hi</div>
      {!data ? null : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
