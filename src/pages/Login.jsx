import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { DoubleBtn, Form, InpField, PremHeader } from "../components/Forms";
import { useFormik } from "formik";
import useAuthentication from "../Hooks/useAuthentication";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { Login, error } = useAuthentication();
  const navigate = useNavigate();
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().min(6).required(),
    }),
    onSubmit: (values) => {
      if (formik.isValid) {
        try {
          Login({ email: values.email, password: values.password }).then(() =>
            navigate("/")
          );
        } catch (error) {
          alert(error.message);
        }
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <PremHeader PremText="تسجيل" NormText="الدخول" />
      <InpField
        type="email"
        name="email"
        text="الايميل"
        short="ادرج ايميلك"
        icon={<FontAwesomeIcon icon={faEnvelope} />}
        formik={formik}
      />
      <InpField
        type="password"
        name="password"
        text="كلمة السر"
        short="ادرج كلمة السر"
        icon={<FontAwesomeIcon icon={faLock} />}
        formik={formik}
        error={error}
      />
      <DoubleBtn textOne="تسجيل الدخول" textTwo="حساب جديد" nav="/signup" />
    </Form>
  );
};

export default Login;
