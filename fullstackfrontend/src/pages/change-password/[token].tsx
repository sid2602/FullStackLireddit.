import { NextPage } from "next";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../../components/InputField";
import { Box, Button, Link, Flex } from "@chakra-ui/react";
import Wrapper from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { useState, FunctionComponent, PropsWithChildren } from "react";
import { withUrqlClient, WithUrqlProps } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";
const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              label="newPassword"
              placeholder="New Password"
              type="password"
            />
            {tokenError && (
              <Flex>
                <Box color="red" mr={2}>
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link>Click here to get new one</Link>
                </NextLink>
              </Flex>
            )}
            <Button
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              ChangePassword
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(
  ChangePassword as FunctionComponent<
    PropsWithChildren<WithUrqlProps | { token: string }>
  >
);
