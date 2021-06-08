import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "length must be greather than 2",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "username cannot include an @",
      },
    ];
  }

  if (options.password.length <= 3) {
    return [
      {
        field: "password",
        message: "length mus be greather than 3",
      },
    ];
  }

  return null;
};
