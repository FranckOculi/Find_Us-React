import React, { useState } from 'react';
import UseGroups from '../../hooks/UseGroups';
import UserInfos from '../../hooks/UserInfos';
import CardHeader from '@mui/material/CardHeader';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import { Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import UsePosition from '../../hooks/UsePosition';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Checkbox = ({ className, id, type, name, handleClick, isChecked }) => {
  return (
    <input
      className={className}
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

const Switch = ({ className, id, type, name, handleClick, isChecked }) => {
  return (
    <label className='switch'>
      <input
        className={className}
        id={id}
        name={name}
        type={type}
        onChange={handleClick}
        checked={isChecked}
      />
      <span className='slider round'></span>
    </label>
  );
};

const CheckBoxMember = ({
  group,
  MapPhoto,
  MapLogoDefault,
  MapPhotoMember,
  MapLogoMemberDefault,
}) => {
  const { allMembersData } = UseGroups();
  const { userData } = UserInfos();
  const [isCheckAll, setIsCheckAll] = useState(true);
  const [isCheck, setIsCheck] = useState(
    allMembersData.groupes[group.codeGroupe].map((member) => {
      if (member.utilisateurId !== userData.utilisateurId) {
        return member.groupeCode + member.utilisateurId;
      }
    }),
  );
  const { loadStatus, loadAllStatus } = UsePosition();
  const [expandedGroup, setExpandedGroup] = useState(false);

  const handleExpandDescription = () => {
    setExpandedGroup(!expandedGroup);
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(
      allMembersData.groupes[group.codeGroupe].map((member) => {
        if (member.utilisateurId !== userData.utilisateurId) {
          return member.groupeCode + member.utilisateurId;
        }
      }),
    );

    loadAllStatus(!isCheckAll);
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    const memberId = e.target.id.substr(8);
    const status = e.target.checked;
    loadStatus(memberId, status);

    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const catalog = allMembersData.groupes[group.codeGroupe].map((member) => {
    if (member.utilisateurId !== userData.utilisateurId) {
      return (
        <Collapse
          in={expandedGroup}
          timeout='auto'
          unmountOnExit
          sx={{ mb: 2 }}
          key={member.utilisateurId + member.groupeCode}
        >
          {group ? (
            <CardHeader
              sx={{
                mt: -1,
                mb: -3,
                ml: 8.2,
              }}
              avatar={
                member.photoProfil
                  ? MapPhotoMember(member)
                  : MapLogoMemberDefault(member)
              }
              title={member.pseudo}
              action={
                <Switch
                  key={member.groupeCode + member.utilisateurId}
                  type='checkbox'
                  id={member.groupeCode + member.utilisateurId}
                  name={member.pseudo}
                  handleClick={handleClick}
                  isChecked={isCheck.includes(
                    member.groupeCode + member.utilisateurId,
                  )}
                />
              }
              className='map-members-members'
            />
          ) : (
            <Paper elevation={1} sx={{ ml: 2, mr: 2, mt: -1 }}>
              <EditIcon></EditIcon>
              ...
            </Paper>
          )}
        </Collapse>
      );
    }
  });

  return (
    <div>
      {allMembersData && (
        <CardActions disableSpacing>
          <CardHeader
            sx={{ mt: -1, mb: -2.5, ml: 2 }}
            avatar={
              <>
                <Switch
                  type='checkbox'
                  className='selectAll'
                  name='selectAll'
                  handleClick={handleSelectAll}
                  isChecked={isCheckAll}
                />
                {group.photoGroupe ? MapPhoto(group) : MapLogoDefault(group)}
              </>
            }
            title={group.nomGroupe}
            actionprops={{
              mt: 2,
            }}
            className='map-members-groups'
          />
          <ExpandMore
            expand={expandedGroup}
            onClick={handleExpandDescription}
            aria-expanded={expandedGroup}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      )}
      {catalog}
      <Divider />
    </div>
  );
};

export default CheckBoxMember;
