import{ Ability } from '@casl/ability'
const permissions = localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions')):null
export default new Ability(permissions || [{action: 'show', subject: 'auth'}])