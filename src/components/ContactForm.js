import React from "react"

import { Formik, ErrorMessage, Field } from "formik"
import getYupValidationSchema from "../components/ContactFormValidation"

const initialValues = {
  name: "",
  email: "",
  message: "",
}

function ContactForm(props) {
  const { isSubmitting, handleSubmit, touched } = props

  return (
    <div className="columns is-mobile is-centered">
      <div className="column is-three-quarters">
        <form
          name="contact-form"
          action="/contact-thanks"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={() => {
            handleSubmit()
          }}
        >
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <Field
                name="name"
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      name="name"
                      type="text"
                      className="input"
                      placeholder="Enter name here."
                    />
                    <input type="hidden" name="contact-form" value="name" />
                  </div>
                )}
              />
              {touched.name && (
                <ErrorMessage name="name">
                  {msg => <p className="has-text-danger">{msg}</p>}
                </ErrorMessage>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <Field
                name="email"
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      name="email"
                      type="email"
                      className="input"
                      placeholder="Enter email here."
                    />
                    <input type="hidden" name="contact-form" value="email" />
                  </div>
                )}
              />
            </div>
            {touched.email && (
              <ErrorMessage name="email">
                {msg => <p className="has-text-danger">{msg}</p>}
              </ErrorMessage>
            )}
          </div>

          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <Field
                name="message"
                render={({ field }) => (
                  <div>
                    <textarea
                      {...field}
                      name="message"
                      className="textarea"
                      placeholder="Enter message here."
                    />
                    <input type="hidden" name="contact-form" value="message" />
                  </div>
                )}
              />
            </div>
            {touched.message && (
              <ErrorMessage name="message">
                {msg => <p className="has-text-danger">{msg}</p>}
              </ErrorMessage>
            )}
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                type="submit"
                className="button is-link"
                disabled={isSubmitting ? true : false}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function onSubmit(values, { setSubmitting }) {
  setTimeout(() => {
    setSubmitting(false)
  }, 1000)
}

export default function ContactFormContainer() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getYupValidationSchema}
      onSubmit={onSubmit}
      render={ContactForm}
    />
  )
}
