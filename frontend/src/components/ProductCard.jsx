import {Box, Heading, HStack, IconButton, Image, Text} from "@chakra-ui/react";
import {useProductStore} from "../store/product.js";
import {useColorModeValue} from "./ui/color-mode.jsx";
import {FaRegEdit} from "react-icons/fa";
import {RiDeleteBinFill} from "react-icons/ri";
import {toaster} from "./ui/toaster.jsx";

export default function ProductCard(props) {
    const {deleteProduct} = useProductStore();
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const product = props.product;
    const handleDeleteProduct = async (product) => {
        console.log("Deleted Product:",product);
        const deletedProduct = await deleteProduct(product._id);
        let toastType = "success";
        if (!deletedProduct.success) {
            toastType = 'error';
        }
        toaster.create({
            title: deletedProduct.message,
            type: toastType,
        })
    }
    const handleUpdateProduct = async (product) => {

    }
    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s ease-in-out'}
            _hover={{transform: 'translateY(-5px)', shadow: 'xl'}}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} height={48} width={'full'} objectFit={'cover'} />
            <Box p={4}>
                <Heading as={'h3'} size={'lg'} mb={4}>{product.name}</Heading>
                <Text fontSize={'xl'} fontWeight={'bold'} mb={4} color={textColor}>${product.price}</Text>
                <HStack>
                    <IconButton> <FaRegEdit /></IconButton>
                    <IconButton onClick={() => { handleDeleteProduct(product) }}> <RiDeleteBinFill /></IconButton>
                </HStack>
            </Box>
        </Box>
    )
}