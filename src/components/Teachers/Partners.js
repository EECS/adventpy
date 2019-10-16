import React from "react"

import { Formik, ErrorMessage, Field, Form, FieldArray, getIn } from "formik"
import { getYupValidationSchema } from "../../components/Teachers/PartnerFormValidation"

const initialValues = {
  classSize: "",
  studentNumbers: [],
}

const PartnerError = ({ name }) => (
  <div>
    <Field
      name={name}
      render={({ form }) => {
        const error = getIn(form.errors, name)
        const touch = getIn(form.touched, name)
        return touch && error ? (
          <div>
            <p className="has-text-danger">{error}</p>
          </div>
        ) : null
      }}
    />
  </div>
)

function PartnerForm(props) {
  return (
    <Form>
      <div className="columns is-mobile is-centered">
        <div className="column is-three-quarters">
          <div className="field">
            <label className="label">Class Size</label>
            <div className="control">
              <Field
                name="classSize"
                render={({ field }) => (
                  <input
                    {...field}
                    name="classSize"
                    className="input"
                    placeholder="Enter class size here."
                  />
                )}
              />
              {props.touched.classSize && (
                <ErrorMessage name="classSize">
                  {msg => <p className="has-text-danger">{msg}</p>}
                </ErrorMessage>
              )}
            </div>
          </div>

          {/* Start of input fields for students to avoid. */}
          <div>
            <h1>Partners to Avoid</h1>
            <FieldArray
              name="studentNumbers"
              render={arrayHelpers => (
                <div>
                  {props.values.studentNumbers &&
                  props.values.studentNumbers.length > 0 ? (
                    props.values.studentNumbers.map((student, index) => (
                      <div key={index}>
                        <Field
                          name={`studentNumbers.${index}`}
                          render={({ field }) => (
                            <input
                              {...field}
                              name={`studentNumbers[${index}].id`}
                              className="input"
                              placeholder="Enter student number here."
                              value={student.id && student.id}
                              onChange={e => {
                                arrayHelpers.replace(index, {
                                  id: e.target.value,
                                  excludeStudents: student.excludeStudents,
                                })
                              }}
                            />
                          )}
                        />
                        <PartnerError name={`studentNumbers[${index}].id`} />

                        <Field
                          name={`studentNumbers[${index}].excludeStudents`}
                          render={({ field }) => (
                            <input
                              {...field}
                              name={`studentNumbers[${index}].excludeStudents`}
                              className="input"
                              placeholder="Enter a list of students for the student to avoid."
                              value={
                                student.excludeStudents &&
                                student.excludeStudents
                              }
                              onChange={e => {
                                arrayHelpers.replace(index, {
                                  id: student.id,
                                  excludeStudents: e.target.value,
                                })
                              }}
                            />
                          )}
                        />
                        <PartnerError
                          name={`studentNumbers[${index}].excludeStudents`}
                        />

                        <div
                          className="buttons are-medium"
                          style={{
                            paddingTop: "0.5em",
                            paddingBottom: "0.5em",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <button
                            className="button"
                            type="button"
                            onClick={() => {
                              arrayHelpers.push({
                                id: "",
                                excludeStudents: [],
                              })
                            }}
                          >
                            +
                          </button>
                          <button
                            className="button"
                            type="button"
                            onClick={() => {
                              arrayHelpers.remove(index)
                            }}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <button
                      style={{
                        paddingTop: "0.5em",
                        paddingBottom: "0.5em",
                      }}
                      className="button is-medium"
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          id: "",
                          excludeStudents: [],
                        })
                      }
                    >
                      {/* show this when user has removed all studentNumbers from the list */}
                      Add a Student
                    </button>
                  )}
                </div>
              )}
            />
          </div>

          {/* End of input fields */}

          <div className="field is-grouped">
            <div
              className="control"
              style={{
                paddingTop: "0.5em",
                paddingBottom: "0.5em",
              }}
            >
              <button
                className="button is-link"
                disabled={props.isSubmitting ? true : false}
                type="submit"
              >
                {props.isSubmitting
                  ? "Generating..."
                  : "Generate Classroom Partners"}
              </button>
            </div>
          </div>
          {props.values.partnerList && (
            <Field
              name="partnerList"
              render={({ field }) => (
                <div className="has-text-centered">
                  <h1>Partner List:</h1>
                  {field.value.map((partners, i) => (
                    <p key={`partners-${i}`}>
                      {partners[0]} - {partners[1]}
                    </p>
                  ))}
                </div>
              )}
            />
          )}
        </div>
      </div>
    </Form>
  )
}

function randomChoice(choices) {
  const index = Math.floor(Math.random() * choices.length)
  return choices[index]
}

function generatePartners(studentDict, setFieldError) {
  let partners = []
  let error = false
  while (Object.keys(studentDict).length > 0) {
    // Create sortedStudents array
    const sortedStudents = Object.keys(studentDict).map(function(key) {
      return [key, studentDict[key]]
    })
    // Sort the array based on the number of students to avoid,
    // students with the most to avoid are matched first.
    sortedStudents.sort(function(first, second) {
      return second[1].length - first[1].length
    })

    let currentStudent = sortedStudents[0]

    let unacceptablePartners = [currentStudent[0]].concat(currentStudent[1])

    let potentialPartners = Object.keys(studentDict).filter(
      x => !unacceptablePartners.includes(x)
    )

    let foundPartner = null

    if (potentialPartners.length > 0) {
      foundPartner = randomChoice(potentialPartners)
    }

    if (foundPartner !== null) {
      partners.push([currentStudent[0], foundPartner])
      delete studentDict[parseInt(currentStudent[0])]
      delete studentDict[parseInt(foundPartner)]
    } else {
      setFieldError(
        "classSize",
        "This run did not yield a partner for all students, " +
          "please try again, or adjust how partners are allowed to be paired in class."
      )
      error = true
      break
    }
  }
  if (!error) {
    return partners
  }
  return []
}

function onSubmit(values, { setSubmitting, setFieldError, setFieldValue }) {
  const students = values.studentNumbers
  let partners = {}
  let studentDict = {}
  let error = false
  //Identify only digits in classroom exclusion list.
  const re = /(\d+)/g

  if (parseInt(values.classSize) % 2 != 0) {
    error = true
    setFieldError(`classSize`, "The class size must be an even number.")
  } else {
    //Begin to create student dictionary
    for (let num = 0; num < values.classSize; num++) {
      studentDict[parseInt(num + 1)] = []
    }

    //Determine if student number is greater than the
    //classroom size.
    for (let i = 0; i < students.length; i++) {
      let currentStudent = students[i].id
      if (parseInt(currentStudent) > parseInt(values.classSize)) {
        error = true
        setFieldError(
          `studentNumbers[${i}].id`,
          "This student number is greater than the " + "class size."
        )
      }

      let excludedStudents = values.studentNumbers[i].excludeStudents.match(re)

      //Determine if student numbers in excludedStudents array is greater than the
      //classroom size.
      for (let j = 0; j < excludedStudents.length; j++) {
        let excludeStudent = excludedStudents[j]
        if (parseInt(excludeStudent) > parseInt(values.classSize)) {
          error = true
          setFieldError(
            `studentNumbers[${i}].excludeStudents`,
            "This student number is greater than the " + "class size."
          )
        }
      }

      //Update student dictionary with list of students to avoid if
      //all student numbers are valid.
      if (!error) {
        studentDict[currentStudent] = excludedStudents
      }
    }
  }

  if (!error) {
    partners = generatePartners(studentDict, setFieldError)
    setFieldValue("partnerList", partners)
  }

  setTimeout(() => {
    setSubmitting(false)
  }, 100)
}

export default function PartnerContainer() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getYupValidationSchema}
      render={PartnerForm}
      onSubmit={onSubmit}
    />
  )
}
