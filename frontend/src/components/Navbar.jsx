
import { Container, Flex, Text, HStack, Button, useColorMode} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { LuSun } from 'react-icons/lu';
import { IoMoon } from 'react-icons/io5';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
 
  return (
		<Container maxW={"1140px"} px={4} >
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient="linear(to-r, red.400, orange.400, yellow.400, green.400, teal.400, blue.400, purple.400)"
					bgClip="text"
			
				>
					<Link to="/">Instrument Store 🛒</Link>
				</Text>
				<HStack spacing={4} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
							<PlusSquareIcon fontSize={20} color="#FF007C" />
						</Button>
					</Link>
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? (
							<IoMoon color="#5DADEC" />
						) : (
							<LuSun size="20" color="#FFDB00" />
						)}
					</Button>
				</HStack>
			</Flex>
		</Container>
  );};

export default Navbar