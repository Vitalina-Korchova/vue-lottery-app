import * as yup from 'yup'
import ParticipantService from './ParticipantService'

export const createParticipantSchema = (participantService: ParticipantService) => {
  return yup.object({
    name: yup.string().required('Name is required!'),
    dateBirth: yup
      .date()
      .required('Date of Birth is required!')
      .max(new Date(), 'Date of Birth cannot be in the future!'),
    email: yup.string().required('Email is required!').email('Invalid email format!'),
    phoneNumber: yup
      .string()
      .required('Phone Number is required!')
      .matches(/^0\d{9}$/, 'Invalid phone number format!')
  })
}

export const useParticipantForm = (participantService: ParticipantService) => {
  const schema = createParticipantSchema(participantService)

  return {
    schema
  }
}
