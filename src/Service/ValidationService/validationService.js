import { messages } from '../../Localization/en-gb/messages';

export const validateLogin = (values) => {
  const errors = {};

  errors.email = validateEmail(values.email);
  errors.password = validatePassword(values.password);

  return errors;
}

export const validateSignUp = (values) => {
  const errors = {};

  errors.username = validateUsername(values.username);
  errors.email = validateEmail(values.email);
  errors.password = validatePassword(values.password);

  return errors;
}

const validateUsername = (value) => {
  if (!value) return messages.usernameRequired;

  if (value.length < 6 || value.length > 20) return messages.usernameInvalidLength;

  return;
}


const validateEmail = (value) => {
  if (!value) return messages.emailAddressRequired;

  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i.test(value)) return messages.emailAddressInvalid;

  return;
}


const validatePassword = (value) => {
  if (!value) return messages.passwordRequired;

  if (!/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,}$/.test(value)) return messages.passwordInvalid;

  return;
}