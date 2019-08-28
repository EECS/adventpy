import React from "react"

import { Formik, ErrorMessage, Field } from 'formik'
import getYupValidationSchema from '../components/ContactFormValidation'

const initialValues = {
  name: '',
  email: '',
  message: '',
}

function ContactForm(props){
  const { isSubmitting, handleSubmit, touched } = props;

  return(
    <div className="columns is-mobile is-centered">
      <div className="column is-three-quarters">
        <form onSubmit={(e) => (
            e.preventDefault(),
            handleSubmit()
          )}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
                <Field name="name" className="input" type="text" placeholder="Enter name here."/>
            </div>
            {touched.name && (
              <ErrorMessage name="name">
                {msg => <p className="has-text-danger">{msg}</p>}
              </ErrorMessage>
            )}
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <Field name="email" className="input" type="email" placeholder="Enter email here." />
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
                <Field name="message" className="textarea" render={({field}) => (
                  <textarea {...field} className="textarea" placeholder ="Enter message here." />
                )}/>
            </div>
            {touched.message && (
              <ErrorMessage name="message">
                {msg => <p className="has-text-danger">{msg}</p>}
              </ErrorMessage>
            )}
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-link" disabled={isSubmitting ? true : false}>{isSubmitting ? 'Sending...' : 'Submit'}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  
}

function onSubmit(values, { setSubmitting }) {

  setTimeout(() => {
    setSubmitting(false);
    window.location.pathname = "/contact-thanks";
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
