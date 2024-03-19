import { supabaseClient } from '../utils/db'

const sb = supabaseClient()

export async function getMembers () {
  const { data, error } = await sb.from('ghmembers').select('*')
  if (error) throw error
  return data
}

export async function getTeams () {
  const { data, error } = await sb.from('ghteams').select('*')
  if (error) throw error
  return data
}

export async function getMembersForTeams () {
  const teams = await getTeams()
  const members = await getMembers()

  const memberMap = {}
  for (const member of members) {
    memberMap[member.id] = member
  }

  const teamMap = {}
  for (const team of teams) {
    teamMap[team.id] = team
  }

  const { data, error } = await sb.from('ghteammembers').select('*')

  if (error) throw error
  if (!data) return {}

  const membersForTeams = {}

  for (const team of teams) membersForTeams[teamMap[team.id].name] = []

  for (const membership of data) {
    const member = memberMap[membership.member_id]
    const team = teamMap[membership.team_id]

    if (member && team) membersForTeams[team.name].push(member)
  }

  return membersForTeams
}
