import { useState } from "react";
import { Activity, ActivityApi, ActivityStatus, ListActivitiesRequest } from "../client/src";
import { useQuery } from "react-query";

const randomStatus = () => { return ['IN_PROGRESS', 'COMPLETED'][Math.floor(Math.random() * 2)]; };


const mockActivities: Activity[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    organizationId: i + 1,
    beneficiaryId: i + 1,
    needId: i + 1,
    startDate: new Date(),
    endDate: new Date(),
    status: randomStatus(),
    comments: `This is comment ${i + 1}`,
  }));


export const useActivityList = (req: ListActivitiesRequest) => {
    const [client] = useState(new ActivityApi());

    const {
        data,
        isLoading,
    } = useQuery(['needs', req], async () => {
        // return client.listActivities(req);
        return mockActivities;
    });

    return { data, isLoading };
}