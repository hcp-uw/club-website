import { useEffect, useState } from "react";
import {
  Center,
  VStack,
  Flex,
  Box,
  Text,
  IconButton,
  Spacer,
  Image,
} from "@chakra-ui/react";
import { getPeople } from "utils/api";
import { IPeopleInfo } from "utils/parsers";

export default function About() {
  // Scroll to top of page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [people, setPeople] = useState<IPeopleInfo[]>([]);

  useEffect(() => {
    const getData = (data: IPeopleInfo[]) => {
      setPeople(data)
    }
    getPeople(getData);
  }, []);

  function formatName(name: string) {
    // example Rasmus Makiniemi
    const lastInitial = name.split(' ')[1][0] + '.'
    return name.split(' ')[0] + ' ' + lastInitial;
  }

  function formatRole(role: string) {
    // example Onboarding/Education
    if (role.split('/').length != 1) {
      return role.split('/')[0] + " & " + role.split('/')[1];
    }
    else return role;
  }

  const generateAvatars = () => {
    return (
      <>
        <Text textAlign='center' color='white' fontSize='5xl' marginBottom='50px'>Our Team</Text>
        <Flex justifyContent='center' flexWrap='wrap' width='80%' margin='auto'>
          {people.map((i) => {
            return(
              <Flex flexDirection='column' alignItems='center' margin='20px' width='15%'>
                <Box width='150px' height='150px' backgroundImage={i.image} backgroundSize='100%' backgroundPosition='center' borderRadius='50%' marginBottom='30px'></Box>
                <Text fontSize='2xl' color='white' overflowWrap='anywhere' textAlign='center' width='90%'>{formatName(i.name)}</Text>
                <Text fontSize='large' color='#FD72F8' overflowWrap='anywhere' textAlign='center'>{formatRole(i.role)}</Text>
              </Flex>
            )
          })}
        </Flex>
      </>
    )
  }

  return (
    <>
      <Flex justify="center" margin='auto' width='calc(100vw - 50px)' marginTop='80px'>
        <Flex direction="column" color='white' maxW='600px' width='70%'>
          <Text fontSize='5xl' fontWeight='600'>What is the Problem?</Text>
          <br></br>
          <Text fontSize='2xl'>
            The majority of projects offered by CS coursework are solo or in pairs,
            so future programmers miss out on the invaluable experience of working in larger teams.
            The leading motivation to do CS class projects are for grades, rather than for the learning experience.
            <br></br><br></br>
            Getting internships is the best ways to gain real world experience on the job.
            However, it is also quite difficult to obtain without having some prior experience.
            <br></br><br></br>
            This circular logic plagues every generation of programmers.
          </Text>
        </Flex>
        <Box height='100px' width='30%' marginLeft='150px' minWidth='400px'>
          <Image src="/loop-graphic.png" alt="some cool design" width='500px'/>
        </Box>
      </Flex>
      <Spacer height='150px'></Spacer>

      <Flex justify="center" margin='auto' width='calc(100vw - 50px)' marginTop='80px'>
        <Flex direction="column" color='white' maxW='600px' width='70%'>
          <Text fontSize='5xl' fontWeight='600'>Our Mission</Text>
          <br></br>
          <Text fontSize='2xl'>
            To create a tech internship-like environment that promotes the growth and development
            of our club members. We provide team-based programming project experience and encouraging
            <Text as='span' color='#FD72F8'> peer-to-peer learning.</Text>
            <br></br><br></br>
            To provide the next generation of programmers & designers with the tools and experience to
            <Text as='span' color='#FD72F8'> succeed in future tech careers.</Text>
          </Text>
        </Flex>
        <Box height='100px' width='30%' marginLeft='150px' minWidth='400px'>
          <Image src="/output-onlinegiftools.gif" alt="some cool design" width='200%'/>
        </Box>
      </Flex>
      <Spacer height='150px'></Spacer>

      {generateAvatars()}
      <Spacer height='150px'></Spacer>
    </>
  );
}