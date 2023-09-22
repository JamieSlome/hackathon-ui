import { useQuery } from "react-query";
import { useState } from "react";
import { NeedApi, Organization, OrganizationApi } from "../client/src";

const mockOrganizations: Organization[] = [
    {
      id: 1,
      name: "Mock Organization 1",
      streetAddress: "123 Main St",
      state: "CA",
      zipcode: "90210",
      phoneNumber: "555-555-5555",
      description: "This is a mock organization 1",
      needs: [1, 2, 3],
    },
    {
      id: 2,
      name: "Mock Organization 2",
      streetAddress: "456 Elm St",
      state: "NY",
      zipcode: "10001",
      phoneNumber: "555-555-5555",
      description: "This is a mock organization 2",
      needs: [4, 5, 6],
    },
    {
      id: 3,
      name: "Mock Organization 3",
      streetAddress: "789 Oak St",
      state: "TX",
      zipcode: "75001",
      phoneNumber: "555-555-5555",
      description: "This is a mock organization 3",
      needs: [7, 8, 9],
    },
    {
      id: 4,
      name: "Mock Organization 4",
      streetAddress: "321 Pine St",
      state: "CA",
      zipcode: "90210",
      phoneNumber: "555-555-5555",
      description: "This is a mock organization 4",
      needs: [1, 2, 3],
    },
    {
      id: 5,
      name: "Mock Organization 5",
      streetAddress: "654 Cedar St",
      state: "NY",
      zipcode: "10001",
      phoneNumber: "555-555-5555",
      description: "This is a mock organization 5",
      needs: [4, 5, 6],
    },
    {
      id: 6,
      name: "Mock Organization 6",
      streetAddress: "987 Maple St",
      state: "TX",
      zipcode: "75001",
      phoneNumber: "555-555-5555",
      description: "This is a mock organization 6",
      needs: [7, 8, 9],
    },
    {
      id: 7,
      name: "Mock Organization 7",
      streetAddress: "741 Oak St",
      state: "CA",
      zipcode: "90210",
      phoneNumber: "555-555-5555",
      description: "This is a mock organization 7",
      needs: [1, 2, 3],
    },
    {
      id: 8,
      name: "Mock Organization 8",
      streetAddress: "852 Pine St",
      state: "NY",
      zipcode: "10001",
      phoneNumber: "555-555-5555",
      description: "This is a mock organization 8",
      needs: [4, 5, 6],
    },
    {
      id: 9,
      name: "Mock Organization 9",
      streetAddress: "963 Cedar St",
      state: "TX",
      zipcode: "75001",
      phoneNumber: "555-555-5555",
      description: "This is a mock organization 9",
      needs: [7, 8, 9],
    },
    {
      id: 10,
      name: "Mock Organization 10",
      streetAddress: "159 Maple St",
      state: "CA",
      zipcode: "90210",
      phoneNumber: "555-555-5555",
      description: "This is a mock organization 10",
      needs: [1, 2, 3],
    },
  ];

export const useNeedList = () => {

    const [client] = useState(new NeedApi());

    const {
        data,
        isLoading,
    } = useQuery(['needs'], async () => {
        return client.listNeeds();
    });

    return { data, isLoading };
}