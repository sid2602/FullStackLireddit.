import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";

import Wrapper from "../components/Wrapper";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useForgotPasswordMutation } from "../generated/graphql";
import { useState } from "react";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [compleate, setCompleate] = useState(false);
  const [, forgetPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgetPassword({ email: values.email });
          setCompleate(true);
        }}
      >
        {({ isSubmitting }) =>
          compleate ? (
            <Box>Email sended</Box>
          ) : (
            <Form>
              <InputField
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
              />

              <Button
                type="submit"
                mt={4}
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
