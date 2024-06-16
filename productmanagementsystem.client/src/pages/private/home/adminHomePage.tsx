import { ICategoryDTO } from '../../../models/entities/category';
import { useEffect, useState } from 'react';
import { getCategoriesFilled } from '../../../services/categories.service';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

const AdminHomePage: React.FC<{}> = () => {
  const [categories, setCategories] = useState<ICategoryDTO[]>([]);

  useEffect(() => {
    (async () => {
      const categoriesFilled = await getCategoriesFilled();
      setCategories(categoriesFilled.data.categories);
    })();
  }, []);

  return (
    <Box p={5}>
      <Typography variant='h6' mr={4}>
        Categories Chart
      </Typography>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: categories.map((x) => x.nameEn),
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: categories.map((x) => x.products.length),
          },
        ]}
        width={500}
        height={300}
      />
    </Box>
  );
};

export default AdminHomePage;
