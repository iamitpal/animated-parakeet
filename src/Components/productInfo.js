import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spacer,
  Text,
  SimpleGrid,
  Container,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { CarouselBox_Third } from "./SahilComponents/HomeComponents/CarouselBox_third";

// const getLocalCartData = () => {
//   let newCartData = localStorage.getItem("flowerCart");
//   if (newCartData === []) {
//     return [];
//   } else {
//     return JSON.parse(newCartData);
//   }
// };
// const initialState = {
//   cart: getLocalCartData(),
// };

export const ProductInfo = () => {
  const params = useParams();
  const toast = useToast();
  const id = params._id;
  const [Added, setAdded] = useState(false);
  let dataArr = [];

  const [d, setD] = useState([]);

  const fetchData = async () => {
    return fetch(
      `https://wicked-long-underwear-slug.cyclic.app/products/${params.id}`
    ).then((res) => res.json());
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      let d = await fetchData();
      setD(d);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("Mil gaya kya", d);
  let user_data = useSelector((store) => store.auth.data);

  const postProduct = (el) => {
    if (!user_data.AccessToken) {
      toast({
        title: "You've to Login First",

        status: "warning",
        duration: 2000,
      });
    } else {
      dataArr.push(localStorage.setItem("flowerCart", JSON.stringify(el)));
      // localStorage.setItem('MEDSHOPPE',JSON.stringify(res.data));
      setAdded(true);
    }
    // console.log(token);
  };

  return (
    <>
      <Box
        paddingLeft="50px"
        paddingRight="50px"
        paddingTop="40px"
        paddingBottom="40px"
      >
        {/* <Flex> */}
        <SimpleGrid columns={[1, 1, 3, 3]} gap="0px">
          <Container w="300px" padding="20px">
            <Box borderRadius="5px" padding="10px" border="1px solid grey">
              <Image h="150px" maxW="100%" margin="auto" src={d[0]?.img} />
            </Box>
            <Flex gap="15px" marginTop="10px">
              <Box borderRadius="5px" padding="10px" border="1px solid grey">
                <Image margin="auto" boxSize="100px" src={d[0]?.img} />
              </Box>
              <Box borderRadius="5px" padding="10px" border="1px solid grey">
                <Image margin="auto" boxSize="100px" src={d[0]?.img} />
              </Box>
            </Flex>
            <Text marginTop="10px" color="grey" fontSize="12px">
              Non Returnable
            </Text>
          </Container>
          <Container w={["300px", "450px"]} padding="25px">
            <Text
              fontWeight="bold"
              color="rgb(79, 88, 94)"
              fontSize={["20px", "25px"]}
              fontFamily="sans-serif"
            >
              {d[0]?.title}
            </Text>

            <Flex padding="20px">
              <Box>
                <Flex alignItems="center">
                  <BiRupee fontSize="40px" />
                  <Text fontWeight="bold" fontSize="20px">
                    {d[0]?.price}
                  </Text>
                </Flex>
                <Text fontSize="15px" color="grey">
                  Inclusive of all taxes
                </Text>
              </Box>
              <Spacer />
            </Flex>
            <Box>
              <Button
                onClick={() => postProduct(d[0])}
                _hover={{ bg: "teal.300" }}
                color="white"
                bg="rgb(16,132,126)"
              >
                Add To Cart
              </Button>
            </Box>
          </Container>
          <Container
            w="260px"
            paddingLeft="10px"
            paddingRight="10px"
            paddingTop="100px"
          >
            <Text marginBottom="20px" fontSize="18px" color="rgb(79,88,94)">
              {Added ? "Go To Your Cart..." : "Please add item(s) to proceed"}
            </Text>
            <Link to={"/cart"}>
              <Button
                disabled={Added === false}
                _hover={{ bg: "rgb(149,149,100)" }}
                w="100%"
                color="white"
                bg={Added ? "teal" : "rgb(149,149,149)"}
              >
                View Cart {">"}
              </Button>
            </Link>
          </Container>
        </SimpleGrid>
        {/* </Flex> */}
        <Divider
          marginBottom="20px"
          marginTop="20px"
          orientation="horizontal"
        />
        <Text
          fontWeight="bold"
          color="rgb(79, 88, 94)"
          fontSize="25px"
          fontFamily="sans-serif"
        >
          Shop by Categories
        </Text>
        <section>
          <CarouselBox_Third />
        </section>
      </Box>
           
    </>
  );
};
