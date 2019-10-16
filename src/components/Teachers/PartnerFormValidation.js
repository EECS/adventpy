import * as Yup from "yup"

export const getYupValidationSchema = Yup.object().shape({
  classSize: Yup.number()
    .integer("Class size must be a whole number.")
    .min(
      2,
      "A class must be at least 2 people in size, although it would make partner matching pretty easy."
    )
    .max(100, "A class can be no greater than 100 people in size.")
    .required("A class size is required."),
  studentNumbers: Yup.array().of(
    Yup.object().shape({
      id: Yup.number()
        .integer("Student number must be a whole number.")
        .min(1, "The minimum student number is 1.")
        .max(100, "The maximum student number is 100.")
        .required(
          "If a student is to avoid other partners, the student number is needed," +
            " else delete."
        ),
      excludeStudents: Yup.string()
        //Only a student numbers through, no text
        .matches(
          /(\d+)/,
          "Please enter all student numbers to avoid, separated by spaces if needed."
        )
        .required(
          "If a student is to avoid other partners, the partners student numbers are needed," +
            " else delete."
        ),
    })
  ),
})
