import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export const Home = () => {
  const [platform, setPlatform] = useState("");
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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
    <Flex h="100vh" justify="center" p="4" flexDir="column">
      <Flex
        border="1px solid black"
        flexDir="column"
        p="4"
        gap="8"
        borderRadius="lg"
      >
        <Heading textAlign="center">AI Content Generator</Heading>
        <Select
          placeholder="Select Platform"
          value={platform}
          onChange={handlePlatformChange}
        >
          <option value="Instagram">Instagram</option>
          <option value="TikTok">TikTok</option>
          <option value="YouTube">YouTube</option>
        </Select>
        <Input
          placeholder="Enter Content Genre (ex: Fitness)"
          value={idea}
          onChange={handleInput}
        />
        <Button
          onClick={sendIdea}
          variant="outline"
          colorScheme="black"
          isDisabled={loading}
        >
          {loading ? <Spinner /> : "Generate Idea"}
          {!loading && (
            <Box ml="2">
              <span style={{ fontSize: "18px", color: "gray.400" }}>✨</span>
            </Box>
          )}
        </Button>
      </Flex>
    </Flex>
  );
};
