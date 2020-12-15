import emailjs from "emailjs-com";
import React from "react";
import { Formik, useField,Form } from "formik";
import * as Yup from "yup";
import "../App.css";
// https://www.youtube.com/watch?v=3sXYK60T6Us&t=329s
// npm install -S yup
// https://www.youtube.com/watch?v=3sXYK60T6Us

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default function ContactUs() {
  function sendEmail(values) {
    
    console.log(values);
    emailjs
      .send(
        "gmail",
        "template_KYeLN1ok",
        values,
        "user_BFbqsy2KIxiAGQL36TMLj"
      )
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        }
      );
    
  }

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        subject: "",
        message: ""
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Must be ath least 2 characters")
          .max(15, "15characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        message: Yup.string().required("Required")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          sendEmail(values);
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
          
        }, 2000); 
        
      }}
      // && {sendEmail} 
    >
      {props => (
        <Form>
          <h1>Contact Form</h1>
          <CustomTextInput
            label="Name"
            name="name"
            type="text"
            placeholder="Frank"
          />
          <CustomTextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Frank@gmail.com"
          />
          <CustomTextInput
            label="Subject (not req.)"
            name="subject"
            type="text"
            placeholder="..."
          />
          <CustomTextInput
            label="Message"
            id="message"
            name="message"
            type="textarea"
            rows="3"
            placeholder="..."
          />
          <button type="submit" className="button">
            {props.isSubmitting ? "Loading..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
