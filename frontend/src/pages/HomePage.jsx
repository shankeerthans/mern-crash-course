import {Container, Link, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import {useProductStore} from "../store/product.js";
import {useEffect} from "react";
import {createProduct} from "../../../backend/controllers/product.controller.js";
import ProductCard from "../components/ProductCard.jsx";

export default function HomePage() {
    const {fetchProducts, products} = useProductStore()
    useEffect(() => {
        fetchProducts();
    }, [createProduct]);
    console.log("Products:",products);
    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={30}
                    fontWeight={"bold"}
                    textAlign={"center"}
                    mb={4}
                    >
                    Current Products 🚀
                </Text>

                <SimpleGrid columns={{
                    base: 1, md: 2, lg: 3
                }}
                gap={10}
                w={"full"}>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}

                </SimpleGrid>
                {products.length === 0 && (
                <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
                    No products found. 😢{" "}
                    <Link href="/create" color="blue.500" _hover={{textDecoration: "underline"}}>
                        <Text as={"span"} color={"blue.500"} _hover={{textDecoration: "underline"}}>
                            Create a product
                        </Text>
                    </Link>
                </Text>
                    )}
            </VStack>
        </Container>
    )
}