import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface CommandWithOutput {
    command: string;
    output: string;
}

const commandsWithOutput: CommandWithOutput[] = [
    {
        command: "git clone git@github.com:hcp-uw/your-new-project.git",
        output: "Cloning into 'your-new-project'...\nremote: Enumerating objects: 3, done.\nremote: Counting objects: 100% (3/3), done.\nremote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0\nReceiving objects: 100% (3/3), done.",
    },
    { command: "cd your-new-project", output: "" },
    { command: 'echo "# Your New Project" > README.md', output: "" },
    {
        command: "npm init -y",
        output: 'Wrote to /path/to/your-new-project/package.json:\n\n{\n  "name": "your-new-project",\n  "version": "1.0.0",\n  "description": "",\n  "main": "index.js",\n  "scripts": {\n    "test": "echo \\"Error: no test specified\\" && exit 1"\n  },\n  "keywords": [],\n  "author": "",\n  "license": "ISC"\n}',
    },
    {
        command: "npm install react react-dom react-scripts",
        output: "added 1383 packages, and audited 1384 packages in 30s\n\n231 packages are looking for funding\n  run `npm fund` for details\n\nfound 0 vulnerabilities",
    },
    { command: "git add .", output: "" },
    {
        command: 'git commit -m "Initial commit"',
        output: "[main (root-commit) f7ab438] Initial commit\n 2 files changed, 19 insertions(+)\n create mode 100644 README.md\n create mode 100644 package.json",
    },
    {
        command: "git push origin main",
        output: "Enumerating objects: 4, done.\nCounting objects: 100% (4/4), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (3/3), done.\nWriting objects: 100% (3/3), 329 bytes | 329.00 KiB/s, done.\nTotal 3 (delta 0), reused 0 (delta 0), pack-reused 0\nTo github.com:hcp-uw/your-new-project.git\n   f7ab438..3a1b8e9  main -> main",
    },
    // ... (rest of the commands remain the same)
];

interface TerminalItem {
    text: string;
    type: "command" | "output";
}

const Terminal: React.FC = () => {
    const [terminalContent, setTerminalContent] = useState<TerminalItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentChar, setCurrentChar] = useState<number>(0);
    const [isTyping, setIsTyping] = useState<boolean>(true);
    const terminalRef = useRef<HTMLDivElement>(null);

    const bgColor = useColorModeValue("gray.900", "gray.800");
    const textColor = useColorModeValue("green.400", "green.300");

    useEffect(() => {
        const timer = setTimeout(
            () => {
                if (isTyping) {
                    if (
                        currentChar <
                        commandsWithOutput[currentIndex].command.length
                    ) {
                        setTerminalContent((prev) => {
                            const newContent = [...prev];
                            if (
                                newContent.length === 0 ||
                                newContent[newContent.length - 1].type !==
                                    "command"
                            ) {
                                newContent.push({
                                    text: "$ ",
                                    type: "command",
                                });
                            }
                            const lastItem = newContent[newContent.length - 1];
                            lastItem.text =
                                "$ " +
                                commandsWithOutput[currentIndex].command.slice(
                                    0,
                                    currentChar + 1,
                                );
                            return newContent;
                        });
                        setCurrentChar((prev) => prev + 1);
                    } else {
                        setIsTyping(false);
                        setCurrentChar(0);
                    }
                } else {
                    setTerminalContent((prev) => [
                        ...prev,
                        {
                            text: commandsWithOutput[currentIndex].output,
                            type: "output",
                        },
                    ]);
                    setCurrentIndex(
                        (prev) => (prev + 1) % commandsWithOutput.length,
                    );
                    setIsTyping(true);
                }
            },
            isTyping ? 50 : 1000,
        );

        return () => clearTimeout(timer);
    }, [currentIndex, currentChar, isTyping]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminalContent]);

    return (
        <Box
            w="100%"
            h="300px"
            bg={bgColor}
            color={textColor}
            p={4}
            borderRadius="md"
            fontFamily="mono"
            fontSize="xs"
            overflowY="auto"
            position="relative"
            ref={terminalRef}
            css={{
                "&::-webkit-scrollbar": {
                    width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                    width: "6px",
                },
            }}
        >
            {terminalContent.map((item, index) => (
                <Text
                    key={index}
                    color={item.type === "command" ? "yellow.300" : textColor}
                    whiteSpace="pre-wrap"
                >
                    {item.text}
                </Text>
            ))}
            <Box
                position="absolute"
                bottom="0"
                right="0"
                p={2}
                fontSize="xs"
                color="gray.500"
            >
                bash
            </Box>
        </Box>
    );
};

export default Terminal;
