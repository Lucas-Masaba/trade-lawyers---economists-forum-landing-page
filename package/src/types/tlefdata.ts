// TLEF Core Data Types

export type StrategicObjective = {
  id: string
  text: string
}

export type PartnershipPriority = {
  title: string
  description: string
}

export type ValueProposition = {
  title: string
  description: string
}

export type MemberBenefit = {
  icon?: string
  title: string
  description?: string
}

export type TeamMember = {
  id: string
  name: string
  position: string
  bio: string
  imgSrc: string
  expertise?: string[]
}

export type Event = {
  id: string
  title: string
  description: string
}

export type Publication = {
  id: string
  title: string
}
