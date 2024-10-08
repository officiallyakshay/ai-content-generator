import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Spinner,
  useToast,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { FaMagic } from "react-icons/fa";

export const Home = () => {
  const [platform, setPlatform] = useState("");
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const bg = useColorModeValue("purple.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("purple.300", "purple.600");

  const handleInput = (e: any) => {
    setIdea(e.target.value);
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlatform(e.target.value);
  };

  const sendIdea = async () => {
    if (!platform || !idea) {
      toast({
        title: "Form Incomplete",
        description:
          "Choose a platform and fill out the content genre field to receive video suggestions.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    const payload = { platform, idea };

    try {
      await axios.post("http://localhost:9101", payload);
      setIdea("");
      setPlatform("");
      toast({
        title: "Idea Submitted",
        description: "Your idea has been submitted successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting idea:", error);
      toast({
        title: "Submission Error",
        description:
          "There was an error submitting your idea. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      h="100vh"
      justify="center"
      align="center"
      bg={bg}
      p={{ base: "4", md: "8" }}
    >
      <Flex
        bg={cardBg}
        boxShadow="lg"
        border={`1px solid ${borderColor}`}
        borderRadius="lg"
        flexDir="column"
        p="8"
        maxW="400px"
        w="100%"
        gap="6"
        transition="transform 0.3s ease"
        _hover={{ transform: "scale(1.02)" }}
      >
        <Heading
          textAlign="center"
          size="lg"
          bgGradient="linear(to-r, purple.400, pink.300)"
          bgClip="text"
        >
          AI Content Generator
        </Heading>
        <Select
          placeholder="Select Platform"
          value={platform}
          onChange={handlePlatformChange}
          focusBorderColor="purple.400"
        >
          <option value="Instagram">Instagram</option>
          <option value="TikTok">TikTok</option>
          <option value="YouTube">YouTube</option>
        </Select>
        <Input
          placeholder="Enter Content Genre (e.g., Fitness)"
          value={idea}
          onChange={handleInput}
          focusBorderColor="purple.400"
        />
        <Button
          onClick={sendIdea}
          isLoading={loading}
          loadingText="Generating..."
          colorScheme="purple"
          spinnerPlacement="end"
          leftIcon={<Icon as={FaMagic} />}
          isDisabled={loading}
        >
          Generate Idea
        </Button>
      </Flex>
    </Flex>
  );
};
