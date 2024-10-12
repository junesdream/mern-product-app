import { Container, VStack, Text, Link, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } =useProductStore();
useEffect(() => {
    fetchProducts();
}, [fetchProducts]);
console.group("products", products)
  return (
		<div>
			<Container maxW="container.xl" py={12}>
				<VStack spacing={8}>
					<Text
						fontSize={"30"}
						fontWeight={"bold"}
						textAlign={"center"}
						bgGradient="linear(to-, red.400, orange.400, yellow.400, green.400, teal.400, blue.400, purple.400)"
						bgClip="text"
					>
						Available Instruments
					</Text>

					<SimpleGrid
						columns={{
							base: 1,
							md: 2,
							lg: 3,
						}}
						spacing={10}
						w={"full"}
					>
						{products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</SimpleGrid>
{products.length === 0 && ( 
					<Text
						fontSize="xl"
						textAlign={"center"}
						fontWeight={"bold"}
						color={"gray.500"}
					>
						No Instruments found{" "}
						<Link as={ReactRouterLink} to={"/create"}>
							<Text
								as="span"
								color={"blue.500"}
								_hover={{ textDecoration: "underline" }}
							>
								Create a Instrument
							</Text>
						</Link>
					</Text>
)}
				</VStack>
			</Container>
		</div>
  );
}

export default HomePage