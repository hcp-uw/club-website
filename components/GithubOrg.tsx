import {
  Image,
  Text,
  VStack,
  Card,
  CardBody,
  CardFooter,
  Box,
  Skeleton,
  Link
} from "@chakra-ui/react";


type GithubProfileProps = {
  username: string;
  pictureUrl: string;
  profileUrl: string;
};

const GithubProfile: React.FC<GithubProfileProps> = ({
  username,
  pictureUrl,
  profileUrl,
}) => {
  return (
    <Card
      variant="elevated"
      size="sm"
      width="300px"
      height="375px"
      borderRadius="15px"
      marginX="25px"
      background="brand.mid_white"
      color="black"
      borderWidth="5px"
      borderColor="black"
    >
      <CardBody alignContent="flex-start">
        <Skeleton isLoaded={pictureUrl !== undefined}>
          <Image
            src={pictureUrl}
            alt={username}
            borderRadius="full"
            boxSize="200px"
            margin="auto"
            marginTop="20px"
          />
        </Skeleton>
        <VStack spacing={4} marginTop="20px">
          <Text fontSize="2xl" fontWeight="bold">
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
  );
};

const GithubOrg: React.FC = () => {
  return (
    <></>
  )
};

export default GithubOrg;