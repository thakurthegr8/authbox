import React, { useContext } from "react";
import Page from "@/src/components/utils/Page";
import Layout from "@/src/components/utils/Layout";
import Typography from "@/src/components/utils/Typography";
import Button from "@/src/components/utils/Button";
import Link from "next/link";
import { AuthContext } from "@/src/providers/AuthProvider";

const UnauthenticatedView = () => {
  return (
    <Layout.Col className="justify-center items-center py-24 gap-8">
      <Typography.Title className="lg:text-5xl font-black text-center lg:leading-snug">
        Demonstrating Passwordless
        <br /> authentication by leveraging power of Next.js
      </Typography.Title>
      <Layout.Row className="gap-4">
        <Link href="/register">
          <Button className="btn-primary btn-lg">Get Started</Button>
        </Link>
        <Link href="/login">
          <Button className="btn-outlined-general btn-lg">Login</Button>
        </Link>
      </Layout.Row>
    </Layout.Col>
  );
};

const AuthenticatedView = () => {
  const auth = useContext(AuthContext);
  return (
    <Layout.Card className="p-4">
      <Typography.Title>Profile Details</Typography.Title>
      <Layout.Col>
        {Object.keys(auth.user).map((item) => (
          <>
            <Typography.Heading className="capitalize font-bold">{item}</Typography.Heading>
            <Typography>{auth.user[item]}</Typography>
          </>
        ))}
      </Layout.Col>
    </Layout.Card>
  );
};

export default function Home() {
  const auth = useContext(AuthContext);
  return (
    <Page title="Home">
      <Layout.Col className="py-8 bg-white">
        <Layout.Container className="max-w-5xl px-4 lg:px-0">
          {auth.loggedIn && <AuthenticatedView />}
          {!auth.loggedIn && <UnauthenticatedView />}
        </Layout.Container>
      </Layout.Col>
    </Page>
  );
}
