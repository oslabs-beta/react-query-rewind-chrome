import { TabPanelProps } from '../types';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const CustomTabPanel = ({
  children,
  value,
  index,
  ...other
}: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container style={{ padding: 0 }}>
          <Box sx={{ pt: 3 }}>{children}</Box>
        </Container>
      )}
    </div>
  );
};

export default CustomTabPanel;
