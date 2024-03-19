import {
  Image,
  Text,
  Heading,
  VStack,
  Card,
  CardBody,
  Box,
  Skeleton,
  Link,
  Flex,
  Button
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getMembersForGithubTeams } from '../utils/api'
import Head from 'next/head'

type GithubProfileProps = {
  username: string
  pictureUrl: string
  profileUrl: string
}

const GithubProfile: React.FC<GithubProfileProps> = ({
  username,
  pictureUrl,
  profileUrl
}) => {
  return (
    <Card
      variant='elevated'
      size='sm'
      width='300px'
      height='375px'
      borderRadius='15px'
      marginX='25px'
      background='brand.mid_white'
      color='black'
      borderWidth='5px'
      borderColor='black'
    >
      <CardBody alignContent='flex-start'>
        <Skeleton isLoaded={pictureUrl !== undefined}>
          <Image
            src={pictureUrl}
            alt={username}
            borderRadius='full'
            boxSize='200px'
            margin='auto'
            marginTop='20px'
          />
        </Skeleton>
        <VStack spacing={4} marginTop='20px'>
          <Text fontSize='2xl' fontWeight='bold'>
            {username}
          </Text>
          <Box>
            <Link href={profileUrl} isExternal>
              View Profile
            </Link>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )
}

interface GithubTeamProps {
  name: string
  members: GithubProfileProps[]
}

const GithubTeam = ({ name, members }: GithubTeamProps) => {
  return (
    <Box padding='20px'>
      <Flex
        flexWrap='wrap'
        justifyContent='center'
        alignItems='center'
        gap='20px'
      >
        {members.map(profile => (
          <GithubProfile
            key={profile.username}
            username={profile.username}
            pictureUrl={profile.pictureUrl}
            profileUrl={profile.profileUrl}
          />
        ))}
      </Flex>
    </Box>
  )
}

const GithubOrg: React.FC = () => {
  const [teams, setTeams] = useState<GithubTeamProps[]>([])
  const [loading, setLoading] = useState(true)
  const [showing, setShowing] = useState(null as number | null)

  useEffect(() => {
    getMembersForGithubTeams((teamData: any) => {
      console.log('raw team data', teamData)
      const newTeamsState = []
      for (const teamName of Object.keys(teamData)) {
        const members = teamData[teamName].map((member: any) => ({
          username: member.login,
          pictureUrl: member.avatar_url,
          profileUrl: member.html_url
        }))
        newTeamsState.push({ name: teamName, members })
      }
      setTeams(newTeamsState)
      setLoading(false)
    })
  }, [])

  return (
    <Flex flexDirection='row' alignItems='center' flexWrap='wrap'>
      {loading ? (
        <Skeleton height='375px' width='300px' />
      ) : (
        <>
          {showing !== null && <GithubTeam
            name={teams[showing].name}
            members={teams[showing].members}
          />}
          {teams.map((team, i) => (
            <Button key={team.name} onClick={() => setShowing(i)} margin='10px'>
              {team.name}
            </Button>
          ))}
        </>
      )}
    </Flex>
  )
}

export default GithubOrg
