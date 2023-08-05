import { useEffect } from "react";
import styles from '@/styles/About.module.css'
import {
  Center,
  VStack,
  Flex,
  Box,
  Text,
  IconButton,
  Spacer,
} from "@chakra-ui/react";

export default function About() {
  // Scroll to top of page
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

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
        <img src="" alt="some cool design" height='100px' width='30%'></img>
      </Flex>
      <Spacer height='200px'></Spacer>

      <Flex justify="center" margin='auto' width='calc(100vw - 50px)' marginTop='80px'>
        <Flex direction="column" color='white' maxW='600px' width='70%'>
          <Text fontSize='5xl' fontWeight='600'>Our Mission</Text>
          <br></br>
          <Text fontSize='2xl'>
            To create a tech internship-like environment that promotes the growth and development
            of our club members. We provide team-based programming project experience and encouraging
            peer-to-peer learning.
            <br></br><br></br>
            To provide the next generation of programmers & designers with the tools and experience to
            succeed in future tech careers.
          </Text>
        </Flex>
        <img src="@/public/output-onlinegiftools.gif" alt="some cool design" height='100px' width='30%'></img>
      </Flex>
    </>
  );
}