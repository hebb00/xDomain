import { Box, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import BarChartDailySeize from "../../components/BarChartDailySize";
import BarChartFrequency from "../../components/BarChartFrequency";
import BarChartTokenSize from "../../components/BarChartTokenSize";
import BarChartTime from "../../components/BarChartTime";
import TableOpportunities from "../../components/TableOpportunities";
import NumberOpportunitySize from "../../components/NumberOpportunitySize";
import OpportunityBarChart from "../../components/OppertunityBarChart";
import TimeBarChart from "../../components/TimeBarChart";
import DailySize from "../../components/DailySize";
import TokensTable from "../../components/TokensTable";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            my="30px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
          <NumberOpportunitySize isDashboard={true} />
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* <BarChartDailySeize isDashboard={true} /> */}
            <DailySize />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Opportunities
            </Typography>
          </Box>
          <Box overflow="auto"  height="350px">

          <TableOpportunities />
          </Box>
        </Box>

        {/* ROW 4 */}
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Opportunity Amount per Token
            <br />
          </Typography>
          <Box overflow="auto" height="370px">
            <TokensTable />
            {/* <BarChartTokenSize isDashboard={true} /> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 7"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Opportunity size frequency
          </Typography>
          <OpportunityBarChart />
        </Box>
    
        {/* ROW 5 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Average Duration per Size
          </Typography>
          <TimeBarChart />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
