import { RoleType } from '../types/signup.types'

interface Page {
  label?: string
  link: string
  roles?: RoleType[]
}

export const pages: Page[] = [{
  label: 'Home',
  link: '/'
}, {
  label: 'Favorites',
  link: '/favorites',
  roles: ['FULL_ACCESS']
}, {
  link: '/movie/[id]'
}, {
  link: '/tv-show/[id]'
}];
