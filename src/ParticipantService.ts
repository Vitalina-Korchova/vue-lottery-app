import { ref, computed, watch } from 'vue'
import type { Participant } from './ParticipantInterface'

class ParticipantService {
  private participants = ref<Participant[]>([])
  private searchTerm = ref('')
  private currentSortType = ref<'none' | 'nameDec' | 'nameInc'>('none')
  private displayedParticipants = ref<Participant[]>([])
  private _isLoggedIn = ref(false)

  constructor() {
    this.loadFromStorage()
    watch(
      this.participants,
      () => {
        this.saveToStorage()
        this.resetDisplay()
      },
      { deep: true }
    )
  }

  private loadFromStorage() {
    const storedParticipants = localStorage.getItem('participants')
    if (storedParticipants) {
      this.participants.value = JSON.parse(storedParticipants)
      this.resetDisplay()
    }
  }

  private emptyParticipant = ref<Participant>({
    id: 0,
    avatar: '',
    name: '',
    email: '',
    password: ''
  })

  private saveToStorage() {
    localStorage.setItem('participants', JSON.stringify(this.participants.value))
  }

  public getEmptyParticipant() {
    return this.emptyParticipant
  }

  private resetDisplay() {
    this.displayedParticipants.value = [...this.participants.value]
  }

  public getAllParticipants() {
    return this.participants
  }

  public async createUserViaApi(newParticipant: Participant) {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newParticipant.name,
          email: newParticipant.email,
          password: newParticipant.password,
          avatar: newParticipant.avatar
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const createdUser = await response.json()

      newParticipant.id = createdUser.id
      this.participants.value.push(newParticipant)

      console.log('User created successfully:', createdUser)
    } catch (error) {
      console.error('Error creating user via API', error)
    }
  }

  public removeParticipant(id: number) {
    this.participants.value = this.participants.value.filter((p) => p.id !== id)
  }

  public async updateParticipant(updatedParticipant: Participant) {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/users/${updatedParticipant.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            avatar: updatedParticipant.avatar,
            name: updatedParticipant.name,
            password: updatedParticipant.password
          })
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const updatedUser = await response.json()

      const filteredUser = {
        id: updatedUser.id,
        avatar: updatedUser.avatar,
        name: updatedUser.name,
        password: updatedUser.password,
        email: updatedParticipant.email
      }

      const index = this.participants.value.findIndex((p) => p.id === filteredUser.id)
      if (index !== -1) {
        const currentParticipant = this.participants.value[index]

        this.participants.value[index] = {
          ...currentParticipant,
          ...filteredUser,
          email: currentParticipant.email
        }
      }

      console.log('User updated successfully:', filteredUser)
    } catch (error) {
      console.error('Error updating user via API', error)
    }
  }

  public async Login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const { access_token, refresh_token } = data

      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      this._isLoggedIn.value = true
      console.log('User login!')

      return true
    } catch (error) {
      console.error('Error during login:', error)
      return false
    }
  }

  public logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    this._isLoggedIn.value = false
    console.log('User logout!')
  }

  //перевіряє чи юзер залогінився
  public get isLoggedIn() {
    const token = localStorage.getItem('access_token')
    this._isLoggedIn.value = !!token
    return this._isLoggedIn.value
  }

  public async GetDataFromID(id: number): Promise<Participant | null> {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const userData = await response.json()
      const participant: Participant = {
        id: userData.id,
        avatar: userData.avatar,
        name: userData.name,
        email: userData.email,
        password: userData.password
      }

      return participant
    } catch (error) {
      console.error('Error fetching user data:', error)
      return null
    }
  }

  // public addParticipant(newParticipant: Participant) {
  //   const maxId = Math.max(0, ...this.participants.value.map((p) => p.id))
  //   newParticipant.id = maxId + 1
  //   this.participants.value.push(newParticipant)
  // }

  // public updateParticipant(updatedParticipant: Participant) {
  //   const index = this.participants.value.findIndex((p) => p.id === updatedParticipant.id)
  //   if (index !== -1) {
  //     const currentParticipant = this.participants.value[index]

  //     this.participants.value[index] = {
  //       ...currentParticipant,
  //       ...updatedParticipant,
  //       email: currentParticipant.email
  //     }
  //   }
  // }

  public searchParticipants(query: string) {
    this.searchTerm.value = query
  }

  public filteredParticipants() {
    return computed(() => {
      if (this.searchTerm.value) {
        return this.displayedParticipants.value.filter((p) =>
          p.name.toLowerCase().includes(this.searchTerm.value.toLowerCase())
        )
      }
      return this.displayedParticipants.value
    })
  }

  public sortParticipantsByNameDec() {
    if (this.currentSortType.value !== 'nameDec') {
      this.displayedParticipants.value.sort((a, b) => a.name.localeCompare(b.name))
      this.currentSortType.value = 'nameDec'
    } else {
      this.resetDisplay()
    }
  }

  public sortParticipantsByNameInc() {
    if (this.currentSortType.value !== 'nameInc') {
      this.displayedParticipants.value.sort((a, b) => b.name.localeCompare(a.name))
      this.currentSortType.value = 'nameInc'
    } else {
      this.resetDisplay()
    }
  }

  public async fetchAndStoreUsersFromApi() {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users?limit=3')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const fetchedUsers: Participant[] = data.map((user: any) => ({
        id: user.id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        password: user.password
      }))
      fetchedUsers.forEach((user) => {
        const exists = this.participants.value.some(
          (participant) => participant.email === user.email
        )
        if (!exists) {
          this.participants.value.push(user)
        }
      })
    } catch (er) {
      console.error('Error fetching users from API', er)
    }
  }
}

export default ParticipantService
