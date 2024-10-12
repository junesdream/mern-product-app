import {
	Box,
	Image,
	Heading,
	Text,
	HStack,
	IconButton,
	useColorModeValue,
	useToast,
	Modal,
	useDisclosure,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
    ModalFooter,
	VStack,
	Input,
	Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react"; // Importiere useState für den Modal-Zustand
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
    const [ updatedProduct, setUpdatedProduct ] = useState(product);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteProduct, updateProduct } = useProductStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Product Deleted",
				description: message,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		}
	};

   
	const handleUpdateProduct = async (pid, updatedProduct) => {
		
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow="lg"
			rounded="lg"
			overflow="hidden"
			transition="all 0.3s"
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image
				src={product.image}
				alt={product.name}
				h={48}
				w="full"
				objectFit="cover"
			/>

			<Box>
				<Heading as="h3" size="md" mb="2">
					{product.name}
				</Heading>
				<Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
					${product.price}
				</Text>
				<HStack spacing={2}>
					<IconButton
						icon={<EditIcon />}
						onClick={onOpen}
						colorScheme="blue"
					/>
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteProduct(product._id)}
						colorScheme="red"
					/>
				</HStack>
			</Box>

			{/* Modal für die Produktbearbeitung */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Instrument</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder="Product Name"
								name="name"
								value={updatedProduct.name}
								onChange={(e) =>
									setUpdatedProduct({
										...updatedProduct,
										name: e.target.value,
									})
								}
							/>
							<Input
								placeholder="Price"
								name="price"
								type="number"
								value={updatedProduct.price}
								onChange={(e) =>
									setUpdatedProduct({
										...updatedProduct,
										price: e.target.value,
									})
								}
							/>
							<Input
								placeholder="Description"
								name="description"
								value={updatedProduct.description}
								onChange={(e) =>
									setUpdatedProduct({
										...updatedProduct,
										description: e.target.value,
									})
								}
							/>
							<Input
								placeholder="Count in Stock"
								name="countInStock"
								value={updatedProduct.countInStock}
								onChange={(e) =>
									setUpdatedProduct({
										...updatedProduct,
										countInStock: e.target.value,
									})
								}
							/>
							<Input
								placeholder="Image URL"
								name="image"
								value={updatedProduct.image}
								onChange={(e) =>
									setUpdatedProduct({
										...updatedProduct,
										image: e.target.value,
									})
								}
							/>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() =>
								handleUpdateProduct(product._id, updatedProduct)
							}
						>
							Update
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default ProductCard;
