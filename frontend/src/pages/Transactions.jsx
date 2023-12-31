import { useEffect, useState } from 'react';
import { supabase } from '../config/config';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@chakra-ui/react';
import { Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const RequestsTable = () => {
  const [Cart, setCart] = useState([]);
  const AuthContext = useAuth();
  const userId = AuthContext.userID;
  const toast = useToast({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data: Data, error: errorData } = await supabase
          .from('Cart')
          .select('*');

        if (errorData) throw errorData;
        else {
          setCart(Data || []);
        }
      } catch (error) {
        toast({
          title: 'Failed to fetch requests',
          status: 'error',
          isClosable: true,
          position: 'top',
        });
      }
    };
    fetchRequests();
  }, [toast]);

  const handleVerifyRequest = async (requestId) => {
    try {
      const { data, error } = await supabase
        .from('Cart')
        .update({ verified: true })
        .eq('id', requestId);

      if (error) {
        console.error('Error updating request:', error);
      } else {
        console.log('Request verified successfully:', data);
        setCart((prevRequests) =>
          prevRequests.map((req) =>
            req.id === requestId ? { ...req, verified: true } : req
          )
        );
      }
    } catch (error) {
      console.error('Error updating request:', error.message);
    }
  };

  return (
    <div>
      <Table variant="striped" colorScheme="teal" size="sm">
        <Thead>
          <Tr>
            <Th>User ID</Th>
            <Th>Donor ID</Th>
            <Th>Sample ID</Th>
            <Th>Verified</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Cart.map((request) => (
            <Tr key={Cart.id}>
              <Td>{Cart.id}</Td>
              <Td>{request.price}</Td>
              <Td>{request.donor_id}</Td>
              <Td>{request.adopter_id}</Td>
              {/*<Td>{request.rsample_id}</Td> */}
              <Td>{request.verified ? 'Yes' : 'No'}</Td>
              <Td>
                {!request.verified ? (
                  <Button onClick={() => handleVerifyRequest(request.id)}>
                    Verify Request
                  </Button>
                ) : (
                  <Button disabled>Verified</Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default RequestsTable;

