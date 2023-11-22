import { Flex, Box, Image, Divider, AbsoluteCenter, Text, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, Button, useToast } from "@chakra-ui/react";

import woman from '../../src/assets/woman1.avif'
import { EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../config/config";


const DonorProfilePage = () => {
    const [edit,setEdit] = useState(false);

    const toast = useToast({})

    const AuthContext = useAuth()
    const userid = AuthContext.userID;

    const [personalInfo,setPersonalInfo] = useState({})
    const [physicalAttributes,setPhysicalAttributes] = useState({})
    const [healthInfo,sethealthInfo] = useState({})

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const { data:Data, error: errorData } = await supabase
                    .from('donor_personal_info')
                    .select()
                    .eq('user_id', userid)

                setPersonalInfo(Data[0])

                if (errorData) throw errorData
            } catch (error) {
                toast({
                    title: "failed to fetch profile details",
                    status: "error",
                    isClosable: true,
                    position: "top"
                })
            }
            try {
                const { data:Data, error: errorData } = await supabase
                    .from('donor_physical_attributes')
                    .select()
                    .eq('user_id', userid)

                setPhysicalAttributes(Data[0])

                if (errorData) throw errorData
            } catch (error) {
                toast({
                    title: "failed to fetch profile details",
                    status: "error",
                    isClosable: true,
                    position: "top"
                })
            }
            try {
                const { data:Data, error: errorData } = await supabase
                    .from('donor_health_info')
                    .select()
                    .eq('user_id', userid)

                sethealthInfo(Data[0])

                if (errorData) throw errorData
            } catch (error) {
                toast({
                    title: "failed to fetch profile details",
                    status: "error",
                    isClosable: true,
                    position: "top"
                })
            }
        }

        fetchDetails()

    }, [])
    return ( 
        <Flex w={'100vw'} direction={'column'} h={'100vh'}>
            <Flex h={110} w={'100vw'} bgColor={'blue.100'} alignItems={'center'} justifyContent={'flex-end'} p={8}>
                <Button><EditIcon />Edit Profile</Button>
            </Flex>
            <Box width={200} height={200} borderRadius='120' borderColor={'blue.100'} overflow='hidden' ml={"10%"} mt={-85} borderWidth={'10px'}>
                <Image src={woman} />
            </Box>
            <Flex gap={180} w={'85vw'}>
                <Flex direction={'column'} w={'42%'} mt={4}>
                    <Heading ml={160} fontSize={25} mb={5}>Donor Id : {userid}</Heading>
                    <Box position='relative' padding='5'>
                        <Divider borderWidth={1.5} borderColor={'blue.200'} />
                        <AbsoluteCenter px='4' color={'blue.800'} bg='white' fontWeight={'semibold'} >
                            Basic Information
                        </AbsoluteCenter>
                    </Box>
                    <Flex direction={'column'} ml={10}>
                        <Text fontSize={16}><span style={{ fontWeight: 'bolder' }}>Address : </span>{personalInfo.address}</Text>
                        <Text fontSize={16}><span style={{ fontWeight: 'bolder' }}>City : </span>{personalInfo.city}</Text>
                        <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>State : </span>{personalInfo.state}</Text>
                        <Text fontSize={16}><span style={{ fontWeight: 'bolder' }}>Country : </span>{personalInfo.country}</Text>
                        <Text fontSize={16}><span style={{ fontWeight: 'bolder' }}>Pincode : </span>{personalInfo.pincode}</Text>
                    </Flex>
                </Flex>
                <Flex direction={'column'} mt={-20} >
                <Tabs variant={'soft-rounded'}>
                        <TabList>
                            <Tab>Personal Info</Tab>
                            <Tab>Physical Attributes</Tab>
                            <Tab>Health Info</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel p={4}>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Name : </span>{personalInfo.name}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Age : </span>{personalInfo.age}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>DOB : </span>{personalInfo.dob}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Highest Education Level : </span>{personalInfo.education_level}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Occupation : </span>{personalInfo.occupation}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Phone : </span>{personalInfo.phone}</Text>
                            </TabPanel>
                            <TabPanel p={4}>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Eye Color : </span>{physicalAttributes.eye_color}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Hair Color : </span>{physicalAttributes.hair_color}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Height : </span>{physicalAttributes.height} cm</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Weight : </span>{physicalAttributes.weight} lbs</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Hair Type : </span>{physicalAttributes.hair_type}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Hair Loss : </span>{physicalAttributes.hair_loss}</Text>
                            </TabPanel>
                            <TabPanel p={4}>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Allergies : </span>{healthInfo.allergies}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Cholestrol : </span>{healthInfo.cholestrol}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Eye Disorders : </span>{healthInfo.eye_disorders}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Skin Infection : </span>{healthInfo.skin_infection}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Asthma : </span>{healthInfo.asthma}</Text>
                                <Text fontSize={17}><span style={{ fontWeight: 'bolder' }}>Cancer : </span>{healthInfo.cancer}</Text>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Flex>
            </Flex>
        </Flex>
     );
}
 
export default DonorProfilePage;