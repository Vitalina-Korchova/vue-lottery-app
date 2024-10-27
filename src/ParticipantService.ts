import { ref, computed, watch } from 'vue'
import type { Participant } from './ParticipantInterface'

class ParticipantService {
  private participants = ref<Participant[]>([])
  private searchTerm = ref('')
  private currentSortType = ref<'none' | 'nameDec' | 'nameInc'>('none')
  private displayedParticipants = ref<Participant[]>([])

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

  public addParticipant(newParticipant: Participant) {
    const maxId = Math.max(0, ...this.participants.value.map((p) => p.id))
    newParticipant.id = maxId + 1
    this.participants.value.push(newParticipant)
  }

  public removeParticipant(id: number) {
    this.participants.value = this.participants.value.filter((p) => p.id !== id)
  }

  public updateParticipant(updatedParticipant: Participant) {
    const index = this.participants.value.findIndex((p) => p.id === updatedParticipant.id)
    if (index !== -1) {
      this.participants.value[index] = { ...this.participants.value[index], ...updatedParticipant }
    }
  }

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
}

export default ParticipantService
