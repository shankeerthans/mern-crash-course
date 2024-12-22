import {Box, Dialog, Heading, HStack, IconButton, Image, Input, Text, VStack} from "@chakra-ui/react";
import {useProductStore} from "../store/product.js";
import {useColorModeValue} from "./ui/color-mode.jsx";
import {FaRegEdit} from "react-icons/fa";
import {RiDeleteBinFill} from "react-icons/ri";
import {toaster} from "./ui/toaster.jsx";

import { Button } from "./ui/button.jsx"
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { useState } from "react"

export default function ProductCard(props) {
    const {deleteProduct, updateProduct} = useProductStore();
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const product = props.product;
    const handleDeleteProduct = async (product) => {
        console.log("Deleted Product:",product);
        const deletedStatus = await deleteProduct(product._id);
        let toastType = "success";
        if (!deletedStatus.success) {
            toastType = 'error';
        }
        toaster.create({
            title: deletedStatus.message,
            type: toastType,
        })
    }
    const handleUpdateProduct = async (product) => {
        console.log("Updated Product:",product);
        const updatedStatus = await updateProduct(product._id,product);
        setOpen(false);
        let toastType = "success";
        if (!updatedStatus.success) {
            toastType = 'error';
        }
        toaster.create({
            title: updatedStatus.message,
            type: toastType,
        })
    }

    const [open, setOpen] = useState(false)
    const [updatedProduct, setUpdatedProduct] = useState(product)

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
                    <IconButton onClick={() => setOpen(true)}> <FaRegEdit /></IconButton>
                    <IconButton onClick={() => { handleDeleteProduct(product) }}> <RiDeleteBinFill /></IconButton>
                </HStack>
            </Box>
            <DialogRoot lazyMount={true} open={open} onOpenChange={(e) => setOpen(e.open)}>
                <DialogContent>
                    <DialogHeader>Update Product</DialogHeader>
                    <DialogBody>
                        <VStack spacing={8}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>
                            <Input
                                placeholder="Price"
                                name="price"
                                type="number"
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
                            <Input
                                placeholder="Image URL"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
                        </VStack>
                    </DialogBody>
                    <DialogFooter>
                        <Button onClick={() => handleUpdateProduct(updatedProduct)}>Update</Button>
                        <DialogActionTrigger>
                            <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
        </Box>
    )
}