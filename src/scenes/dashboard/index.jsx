import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import WaterOutlinedIcon from '@mui/icons-material/WaterOutlined';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import React, { useEffect, useState } from 'react';
import GasService from './GasService';
import Co2Icon from '@mui/icons-material/Co2';
import OilBarrelIcon from '@mui/icons-material/OilBarrel';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import AirIcon from '@mui/icons-material/Air';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const gasService = new GasService();
  const [gases, setGases] = useState([]);

  useEffect(() => {
    const fetchGases = () => {
      gasService.getAllGases()
        .then(gases => {
          setGases(gases);
        })
        .catch(error => {
          // Handle the error
        });
    };
  
    // Fetch gases immediately
    fetchGases();
  
    // Fetch gases every 2 seconds
    const interval = setInterval(fetchGases, 2000);
    console.log(gases)
  
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);
  const dht22HumidityValue = gases.find(gas => gas.Name === "DHT11_Humidity")?.Value || "N/A";
  const dht22TemperatureValue = gases.find(gas => gas.Name === "DHT11_Temperature")?.Value || "N/A";
  const mg811co2Value = gases.find(gas => gas.Name === "MG811_CO2")?.Value || "N/A";
  const mq2smokeValue = gases.find(gas => gas.Name === "MQ2_Smoke")?.Value || "N/A";
  const mq5lpgValue = gases.find(gas => gas.Name === "MQ5_LPG")?.Value || "N/A";
  const mq8h2Value = gases.find(gas => gas.Name === "MQ8_H2")?.Value || "N/A";
  const mq7coValue = gases.find(gas => gas.Name === "MQ7_CO")?.Value || "N/A";


  console.log(gases)

  return (
    <Box m="20px">
      
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        
      </Box>

      {/* GRID & CHARTS */}
      
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title="25.6"
          subtitle="DHT11_Temperature"
          progress={dht22TemperatureValue}
          increase=" "
          icon={
            <DeviceThermostatIcon
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
          title="67.2"
          subtitle="DHT11_Humidity"
          progress={dht22HumidityValue}
          increase=" "
          icon={
            <WaterOutlinedIcon
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
          title="86"
          subtitle="MG811_CO2"
          progress={mg811co2Value}
          increase=" "
          icon={
            <Co2Icon
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
          title="158"
          subtitle="MQ2_Smoke"
          progress={mq2smokeValue}
          increase=" "
          icon={
            <SmokingRoomsIcon
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
          title="268"
          subtitle="MQ5_LPG"
          progress={mq5lpgValue}
          increase=" "
          icon={
            <LocalGasStationIcon
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
          title="112"
          subtitle="MQ8_H2"
          progress={mq8h2Value}
          increase=" "
          icon={
            <AirIcon
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
          title="82"
          subtitle="MQ7_CO"
          progress={mq7coValue}
          increase=" "
          icon={
            <TrafficIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
      
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Monthly Report
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        
        {/* ROW 3 */}

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Weekly Report
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

      </Box>
      
    </Box>
  );
};

export default Dashboard;