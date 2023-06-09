import React, { useState } from "react";
import Button from "@/src/components/utils/Button";
import Form from "@/src/components/utils/Form";
import Input from "@/src/components/utils/Form/Input";
import Layout from "@/src/components/utils/Layout";
import Page from "@/src/components/utils/Page";
import Typography from "@/src/components/utils/Typography";
import Link from "next/link";
import { registerWithEmail, verifyUserWitOTP } from "@/src/services/auth";
import Dialog from "@/src/components/utils/Dialogs";
import Confirm from "@/src/components/utils/Dialogs/Confirm";
import OTPVerification from "@/src/components/elements/OTPVerification";
import { useRouter } from "next/router";

export default function Register() {
  const [showDialog, setShowDialog] = useState(false);
  const [email, setEmail] = useState(null);
  const router = useRouter();
  const onSubmitRegsitrationData = async (data) => {
    try {
      const register = await registerWithEmail(data);
      console.log(register);
      setEmail(register.email);
      setShowDialog(true);
    } catch (error) {
      console.log(error);
    }
  };
  const onSuccess = (data) => {
    router.push("/login");
  };
  return (
    <Page title="Register">
      <Layout.Col className="bg-gray-200">
        <Layout.Container className="max-w-sm h-[100vh]">
          <Layout.Col className="justify-center h-full">
            <Layout.Card className="p-4 bg-white">
              <Layout.Col className="gap-4">
                <Typography.Title className="font-black">
                  Register
                </Typography.Title>
                <Typography className="text-gray-400 text-sm">
                  You will receive an OTP on your registered email
                </Typography>
                <Form onSubmit={onSubmitRegsitrationData}>
                  <Layout.Col className="gap-2">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter full name"
                      label="Full name"
                      required
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      label="Email"
                      required
                    />
                    <Button className="btn-primary btn-sm">Submit</Button>
                  </Layout.Col>
                </Form>
                <Link href="/login" className="w-full">
                  <Button className="btn-general btn-sm w-full">Login</Button>
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
              method={verifyUserWitOTP}
            />
          </Confirm>
        </Layout.Container>
      </Layout.Col>
    </Page>
  );
}
