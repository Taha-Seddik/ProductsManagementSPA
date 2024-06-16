import { AddCircleOutline, Clear } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useIsSm } from '../../utils/responsive.utils';
import Tooltip from '@mui/material/Tooltip';

const Container = styled('div')(() => ({}));

type IProps = {
  title: string;
  searchText: string;
  toPath: string;
  topic: string;
  searchPlaceholder?: string;
  handleNewSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearchTxt: () => void;
};

export const ListingUpperBar: React.FC<IProps> = (props) => {
  const { title, searchText, toPath, topic, handleNewSearch, clearSearchTxt } = props;
  const isBelowMd = useIsSm();

  return (
    <Container className='flexStartCenterRow'>
      {/* title  */}
      <Typography variant='h6' mr={4}>
        {title}
      </Typography>
      {/* search Field  */}
      <TextField
        id='searchInput'
        type='text'
        name='searchInput'
        placeholder={props.searchPlaceholder}
        margin='dense'
        size='small'
        value={searchText}
        sx={{ width: '40%', marginx: 'auto' }}
        onChange={handleNewSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {searchText ? (
                <IconButton size='small' aria-label='clear' color='default' onClick={clearSearchTxt}>
                  <Clear />
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
        }}
      />
      <span className='takeTheRest' />
      {/* create btn */}
      <Link to={toPath}>
        {isBelowMd ? (
          <Tooltip title={`Create new ${topic}`}>
            <IconButton color='primary' size='small'>
              <AddCircleOutline />
            </IconButton>
          </Tooltip>
        ) : (
          <Button variant='contained' color='primary' startIcon={<AddCircleOutline />}>
            Create new {topic}
          </Button>
        )}
      </Link>
    </Container>
  );
};
