import * as yup from 'yup'
import ParticipantService from './ParticipantService'

// Схема для створення учасника
const createParticipantSchema = (participantService: ParticipantService) => {
  return yup.object({
    avatar: yup.string().required('Avatar is required!'),
    name: yup.string().required('Name is required!'),
    email: yup
      .string()
      .required('Email is required!')
      .email('Invalid email format!')
      .test('unique-email', 'This email already exists!', (value) => {
        return !participantService.getAllParticipants().value.some((p) => p.email === value)
      }),
    password: yup
      .string()
      .required('Password is required!')
      .min(6, 'Password must be at least 6 characters!')
  })
}

const updateParticipantSchema = () => {
  return yup.object({
    avatar: yup.string().required('Avatar is required!'),
    name: yup.string().required('Name is required!'),
    password: yup.string().optional().min(6, 'Password must be at least 6 characters!')
  })
}

export const useParticipantForm = (participantService: ParticipantService, isUpdate: boolean) => {
  const schema = isUpdate ? updateParticipantSchema() : createParticipantSchema(participantService)

  return {
    schema
  }
}
