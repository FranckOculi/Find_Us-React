import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import PeopleIcon from '@mui/icons-material/People';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FriendsSearchMaterial = () => {
  const Root = styled('div')(
    ({ theme }) => `
        color: ${
          theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.65)'
            : 'rgba(0,0,0,.85)'
        };
        font-size: 14px;
      `,
  );

  const Label = styled('label')`
    padding: 0 0 4px;
    line-height: 1.5;
    display: block;
  `;

  const InputWrapper = styled('div')(
    ({ theme }) => `
        width: 300px;
        border: 1px solid ${
          theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'
        };
        background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
        border-radius: 4px;
        padding: 1px;
        display: flex;
        flex-wrap: wrap;
      
        &:hover {
          border-color: ${
            theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'
          };
        }
      
        &.focused {
          border-color: ${
            theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'
          };
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
      
        & input {
          background-color: ${
            theme.palette.mode === 'dark' ? '#141414' : '#fff'
          };
          color: ${
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.65)'
              : 'rgba(0,0,0,.85)'
          };
          height: 30px;
          box-sizing: border-box;
          padding: 4px 6px;
          width: 0;
          min-width: 30px;
          flex-grow: 1;
          border: 0;
          margin: 0;
          outline: 0;
        }
      `,
  );

  function Tag(props) {
    const { label, onDelete, ...other } = props;
    return (
      <div {...other}>
        <span>{label}</span>
        <CloseIcon onClick={onDelete} />
      </div>
    );
  }

  Tag.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  const StyledTag = styled(Tag)(
    ({ theme }) => `
        display: flex;
        align-items: center;
        height: 24px;
        margin: 2px;
        line-height: 22px;
        background-color: ${
          theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
        };
        border: 1px solid ${
          theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'
        };
        border-radius: 2px;
        box-sizing: content-box;
        padding: 0 4px 0 10px;
        outline: 0;
        overflow: hidden;
      
        &:focus {
          border-color: ${
            theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'
          };
          background-color: ${
            theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'
          };
        }
      
        & span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      
        & svg {
          font-size: 12px;
          cursor: pointer;
          padding: 4px;
        }
      `,
  );

  const Listbox = styled('ul')(
    ({ theme }) => `
        width: 300px;
        margin: 2px 0 0;
        padding: 0;
        position: absolute;
        list-style: none;
        background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
        overflow: auto;
        max-height: 250px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 1;
      
        & li {
          padding: 5px 12px;
          display: flex;
      
          & span {
            flex-grow: 1;
          }
      
          & svg {
            color: transparent;
          }
        }
      
        & li[aria-selected='true'] {
          background-color: ${
            theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'
          };
          font-weight: 600;
      
          & svg {
            color: #1890ff;
          }
        }
      
        & li[data-focus='true'] {
          background-color: ${
            theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'
          };
          cursor: pointer;
      
          & svg {
            color: currentColor;
          }
        }
      `,
  );
  const InputSearch = ({
    className,
    friendsData,
    label,
    handleAddMember,
    children,
  }) => {
    const {
      getRootProps,
      getInputLabelProps,
      getInputProps,
      getTagProps,
      getListboxProps,
      getOptionProps,
      groupedOptions,
      value,
      focused,
      setAnchorEl,
    } = useAutocomplete({
      multiple: true,
      options: friendsData,
      getOptionLabel: (option) => friendsData.pseudo || '',
    });
    return (
      <Root>
        <div className={className}>
          {children}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                mt: -1,
                marginLeft: -1.3,
                width: 320,
                height: 360,
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}
          >
            <Paper elevation={3}>
              {' '}
              <div {...getRootProps()}>
                <PeopleIcon color='primary' id='iconSearch' />
                <Label {...getInputLabelProps()} id='friendsTitle'>
                  {label}
                </Label>
                <InputWrapper
                  ref={setAnchorEl}
                  className={focused ? 'focused' : ''}
                  id='inputSearch'
                >
                  {value &&
                    value.map((option, index) => (
                      <StyledTag
                        key={option.utilisateurId + option.mail}
                        label={option.pseudo}
                        {...getTagProps({ index })}
                        id='friends-StyledTag'
                      />
                    ))}

                  <input {...getInputProps()} />
                </InputWrapper>
              </div>
              {friendsData[0] && groupedOptions && groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()} id='friends-Listbox'>
                  {groupedOptions.map((option, index) => (
                    <li
                      key={option.utilisateurId + option.mail}
                      {...getOptionProps({ option, index })}
                    >
                      <span>{option.pseudo}</span>
                      <CheckIcon fontSize='small' />
                    </li>
                  ))}
                </Listbox>
              ) : null}
              <Button
                variant='contained'
                // disabled={value[0] ? '' : true}
                size='small'
                onClick={() => handleAddMember(value[0].utilisateurId)}
                id='inputBtn'
              >
                Add
              </Button>
            </Paper>
          </Box>
        </div>
      </Root>
    );
  };

  const FriendSearchBar = ({ onClick, children }) => {
    return (
      <AppBar
        position='static'
        sx={{
          mt: -7,
          mr: 1.4,
          mb: 2,
        }}
      >
        <Toolbar onClick={onClick}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <div>
            <Typography variant='h5' component='div'>
              {children}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    );
  };

  return { InputSearch, FriendSearchBar };
};

export default FriendsSearchMaterial;
