import React from "react";
import { useFormik } from "formik";
import emailjs from "emailjs-com";
// npm i emailjs-com --save
export default function ContactUs() {
  const validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 1) {
      errors.name = "Must be 2 characters or more";
    } else if (values.name.includes("@" || [1 - 9])) {
      errors.name = "can not contain @";
    }
    // problem on 12

    if (!values.email) {
      errors.email = "Required";
    } else if (values.email.length < 4) {
      errors.email = "Must be 5 characters or more";
    }
    if (!values.message) {
      errors.message = "Required";
    } else if (values.message.length < 10) {
      errors.message = "Must be 5 characters or more";
    }

    function sendEmail(e) {
      e.preventDefault();
      emailjs
        .sendForm(
          "gmail",
          "template_KYeLN1ok",
          e.target,
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
      e.target.reset();
    }

    // return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  console.log("Form values", formik.values);

  return (
    <div className="outercontainer">
      <h1>Contact Form </h1>

      <form onSubmit={sendEmail}>
        <label htmlFor="name">Name</label>

        <input
          id="name"
          name="name"
          type="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : null}

        <label htmlFor="name">Email</label>

        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="name">Subject (not req.)</label>

        <input
          id="subject"
          name="subject"
          type="subject"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.subject}
        />
        {formik.touched.subject && formik.errors.subject ? (
          <div className="error">{formik.errors.subject}</div>
        ) : null}

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          type="textarea"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          rows={4}
        />
        {formik.touched.message && formik.errors.message ? (
          <div className="error">{formik.errors.message}</div>
        ) : null}

        <button type="submit">Send it</button>
      </form>
    </div>
  );
}
