import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DoubleBtn, Form, InpField, PremHeader } from "../components/Forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import useAuthentication from "../Hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import usePost from "../Hooks/usePost";
import { collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Constants/Firebase";

const Signup = () => {
  const {
    Signup,
    loading: authLoading,
    error: authError,
    user,
  } = useAuthentication();
  const { postData, loading, error } = usePost(collection(db, "users"));

  const navigate = useNavigate();
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().min(3).required(),
      lastName: Yup.string().min(3).required(),
      email: Yup.string().required().email(),
      password: Yup.string().min(6).required(),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Not equal to password"),
    }),
    onSubmit: (values) => {
      if (formik.isValid) {
        try {
          Signup({
            email: values.email,
            password: values.password,
          })
            .then(() => {
              postData({
                email: values.email,
                first_name: values.firstName,
                last_name: values.lastName,
                background: "",
                image: "",
                biography: "",
                birthday: "",
                city: "",
                country: "",
                skills: [],
                documented: false,
                type: "مؤثر",
                phone: "",
                followers: 0,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
              });
            })
            .then(() => navigate("/"));
        } catch (error) {
          alert(error.message);
        }
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <PremHeader PremText="حساب" NormText="جديد" />
      <div className="w-100 d-flex g-20">
        <InpField
          type="text"
          name="firstName"
          text="الاسم الأول"
          short="ادرج اسمك الأول"
          icon={<FontAwesomeIcon icon={faUser} />}
          formik={formik}
        />
        <InpField
          type="text"
          name="lastName"
          text="الاسم الأخير"
          short="ادرج اسمك الأخير"
          icon={<FontAwesomeIcon icon={faUser} />}
          formik={formik}
        />
      </div>
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
        short="أدخل كلمة مرور قوية، ويفضل أن تحتوي على حروف وعلامات وأرقام"
        icon={<FontAwesomeIcon icon={faEye} />}
        click={{
          type: "text",
          icon: <FontAwesomeIcon icon={faEyeSlash} />,
        }}
        formik={formik}
      />
      <InpField
        type="password"
        name="confirmPassword"
        text="تأكيد كلمة السر"
        short="تأكيد كلمة المرور. تأكد من مطابقته لكلمة المرور"
        icon={<FontAwesomeIcon icon={faLock} />}
        formik={formik}
        error={authError}
      />
      <DoubleBtn
        textOne={authLoading ? "تحميل..." : "حساب جديد"}
        textTwo="تسجيل الدخول"
        nav="/login"
      />
    </Form>
  );
};

export default Signup;
