import { useDashboardData } from "../data";
import { DataCard } from "./DataCard"

import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SupportIcon from '@mui/icons-material/Support';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PeopleIcon from '@mui/icons-material/People';
import { Grid } from "@mui/material";

export const DashboardCards = () => {

    const { organizations, needs, beneficiaries, activities } = useDashboardData();

    const summaryCards = [
        {
            title: "Needs",
            value: needs?.length.toString() || "0",
            icon: <SupportIcon />,
            color: "warning.main"
        },
        {
            title: "Organizations",
            value: organizations?.length.toString() || "0",
            icon: <CorporateFareIcon />,
            color: "secondary.main"
        },
        {
            title: "Beneficiaries",
            value: beneficiaries?.length.toString() || "0",
            icon: <PeopleIcon />,
            color: "info.main"
        },
        {
            title: "Activities",
            value: activities?.length.toString() || "0",
            icon: <VolunteerActivismIcon />,
            color: "success.main"
        },
    ]

    return (
        <Grid container spacing={3}>

            {summaryCards.map(summary => (
                <Grid item xs={12} md={3}>
                    <DataCard title={summary.title} value={summary.value} icon={summary.icon} color={summary.color} />
                </Grid>
            ))}
        </Grid>);

}