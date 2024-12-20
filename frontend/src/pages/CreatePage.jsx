import {Box, Button, Container, Heading, Input, VStack} from "@chakra-ui/react";
import {useColorModeValue} from "../components/ui/color-mode.jsx";
import {useState} from "react";
import {useProductStore} from "../store/product.js";
import {toaster} from "../components/ui/toaster.jsx";

export default function CreatePage() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    })

    const {createProduct} = useProductStore()
    const handleAddProduct = async () => {
        const {success, message} = await createProduct(newProduct)
        console.log(success)
        console.log(message)
        let toastType = "success"
        if (!success) {
            toastType = "error"
        } else {
            setNewProduct({
                name: "",
                price: "",
                image: "",
            })
        }
        toaster.create({
            title: `${message}`,
            type: toastType,
        })
    }

    return (
       <Container maxWidth="container.sm">
            <VStack spacing={8}>
                <Heading as="h1" size="2xl" textAlign="center" mb={8}>
                    Create New Product
                </Heading>
                <Box width="full" bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={8}>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                        <Input
                            placeholder="Price"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
                        <Input
                            placeholder="Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} />
                        <Button colorScheme='blue' onClick={handleAddProduct}>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
       </Container>
    )
}