import React, { useContext, useState } from "react";
import Button from "@/src/components/utils/Button";
import Form from "@/src/components/utils/Form";
import Input from "@/src/components/utils/Form/Input";
import Layout from "@/src/components/utils/Layout";
import Page from "@/src/components/utils/Page";
import Typography from "@/src/components/utils/Typography";
import Link from "next/link";
import {
  loginUserWithOTP,
  registerWithEmail,
  signInWithEmail,
  verifyUserWitOTP,
} from "@/src/services/auth";
import Dialog from "@/src/components/utils/Dialogs";
import Confirm from "@/src/components/utils/Dialogs/Confirm";
import OTPVerification from "@/src/components/elements/OTPVerification";
import { useRouter } from "next/router";
import { AuthContext } from "@/src/providers/AuthProvider";

export default function Login() {
  const { setUser, setLoggedIn } = useContext(AuthContext);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const router = useRouter();
  const onSubmitLoginData = async (data) => {
    setError(null);
    try {
      const login = await signInWithEmail(data?.email);
      setEmail(data?.email);
      setShowDialog(true);
    } catch (error) {
      const errorMessage = error?.response?.data;
      if (errorMessage === "user is not verified") {
        router.push(`/verify?email=${data?.email}`);
      }
      setError(errorMessage);
    }
  };
  const onSuccess = (data) => {
    console.log(data);
    setUser(data);
    setLoggedIn(true);
    router.push("/");
  };
  return (
    <Page title="Login">
      <Layout.Col className="bg-gray-200">
        <Layout.Container className="max-w-sm h-[100vh]">
          <Layout.Col className="justify-center h-full">
            <Layout.Card className="p-4 bg-white">
              <Layout.Col className="gap-4">
                <Typography.Title className="font-black">
                  Login
                </Typography.Title>
                <Typography className="text-gray-400 text-sm">
                  You will receive an OTP on your registered email
                </Typography>
                <Form onSubmit={onSubmitLoginData}>
                  <Layout.Col className="gap-2">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      label="Email"
                      required
                    />
                    <Button className="btn-primary btn-sm">Submit</Button>
                    <Typography.Caption className="text-red-500 capitalize">
                      {error}
                    </Typography.Caption>
                  </Layout.Col>
                </Form>
                <Link href="/register" className="w-full">
                  <Button className="btn-general btn-sm w-full">
                    Register
                  </Button>
                </Link>
              </Layout.Col>
            </Layout.Card>
          </Layout.Col>
          <Confirm
            open={showDialog}
            toggle={setShowDialog}
            confirm={showDialog}
            showFooter={false}
          >
            <OTPVerification
              email={email}
              onSuccess={onSuccess}
              onError={(err) => null}
              method={loginUserWithOTP}
            />
          </Confirm>
        </Layout.Container>
      </Layout.Col>
    </Page>
  );
}
