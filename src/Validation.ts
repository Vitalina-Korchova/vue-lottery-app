import * as yup from 'yup'
import ParticipantService from './ParticipantService'

export const createParticipantSchema = (participantService: ParticipantService) => {
  return yup.object({
    avatar: yup.string().required('Avatar is required!'),
    name: yup.string().required('Name is required!'),
    email: yup.string().required('Email is required!').email('Invalid email format!'),
    password: yup
      .string()
      .required('Password is required!')
      .min(6, 'Password must be at least 6 characters!')
  })
}

export const useParticipantForm = (participantService: ParticipantService) => {
  const schema = createParticipantSchema(participantService)

  return {
    schema
  }
}
