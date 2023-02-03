import React from "react";
import {Flex, Image} from "@chakra-ui/react";

const Navbar: React.FC = () => {
    return (
        <Flex bg='white' height='48px' padding='6px 12px'>
            <Flex align='center'>
                <Image src='/images/reddit-logo.svg' height='52px'/>
                <Image src='/images/reddit-logo-text.svg' height='38px' marginLeft='-16px' display={{base: 'none', md: "unset"}}/>
            </Flex>
        </Flex>
    )
}

export default Navbar;