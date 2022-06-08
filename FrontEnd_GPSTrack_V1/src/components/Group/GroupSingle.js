import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UseGroups from '../../hooks/UseGroups';
import UserInfos from '../../hooks/UserInfos';
import { dateParser } from '../../utils/Utils';
import Loader from '../other/Loader';
import FriendsSearch from '../friend/FriendsSearch';
import GroupSingleMaterial from '../../ui/group/GroupSingleMaterial';
import AppAvatar from '../../ui/group/AppAvatar';

const GroupSingle = () => {
  const navigate = useNavigate();
  let params = useParams();

  const [isLoad, setIsLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dataSingle, setDataSingle] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState(true);
  const [expandedMember, setExpandedMember] = useState(true);
  const [friendsSearchModal, setFriendsSearchModal] = useState(false);

  const { userData } = UserInfos();
  const {
    GroupSingleAppbar,
    CardSingleGroup,
    CardHeaderSingleGroup,
    DescriptionCard,
    MemberCard,
    CollapseGroupSingle,
    EditDescription,
    EmptyDescription,
    CardContentMember,
    CardHeaderMember,
    AdminTypography,
    AddPersonIcon,
    GroupMenu,
    GroupSingleIcon,
  } = GroupSingleMaterial();
  const { findGroup, findMember, membersData, removeGroup, removeMember } =
    UseGroups();
  const { PhotoGroup, LogoGroupDefault, PhotoMember, LogoMemberDefault } =
    AppAvatar();
  const { addMemberToGroup, reloadMember } = UseGroups();

  const handleExpandDescription = () => {
    setExpandedDescription(!expandedDescription);
  };

  const handleExpandMember = () => {
    setExpandedMember(!expandedMember);
  };

  const handleAddMemberModal = () => {
    setFriendsSearchModal(!friendsSearchModal);
  };

  const handleAddMember = async (id) => {
    setRefresh(!refresh);
    return await addMemberToGroup(id, dataSingle.codeGroupe).then(() =>
      handleAddMemberModal(),
    );
  };

  const handleDelete = async () => {
    await removeGroup(userData.utilisateurId, dataSingle.codeGroupe).then(() =>
      handleBackToHome(),
    );
  };

  const loadGroup = async () => {
    await findMember(userData.utilisateurId, params.codeGroup);
    await findGroup(params.codeGroup).then((res) => {
      setDataSingle(res);
    });
  };

  const resetMember = () => {
    removeMember();
  };

  const refreshMember = async () => {
    reloadMember(userData.utilisateurId, params.codeGroup);
  };

  const handleBackToHome = () => {
    resetMember();
    return navigate('/', { replace: true });
  };

  useEffect(() => {
    if (isLoad && dataSingle?.codeGroupe) {
      refreshMember();
    }
    if (!isLoad && !dataSingle?.codeGroupe) {
      loadGroup();
      setIsLoad(!isLoad);
    }
  }, [refresh]);

  if (dataSingle?.codeGroupe) {
    return (
      <>
        {friendsSearchModal && (
          <FriendsSearch
            userData={userData}
            handleAddMemberModal={handleAddMemberModal}
            handleAddMember={handleAddMember}
          />
        )}
        <div id={friendsSearchModal ? 'blur' : ''}>
          <GroupSingleAppbar
            onClick={handleBackToHome}
            title={dataSingle.nomGroupe}
          ></GroupSingleAppbar>

          <CardSingleGroup>
            <CardHeaderSingleGroup
              avatar={
                dataSingle.photoGroupe
                  ? PhotoGroup(dataSingle)
                  : LogoGroupDefault(dataSingle)
              }
              action={
                <GroupMenu
                  photo={
                    dataSingle.photoGroupe
                      ? PhotoGroup(dataSingle)
                      : LogoGroupDefault(dataSingle)
                  }
                  onClick={handleAddMemberModal}
                  handleDelete={handleDelete}
                ></GroupMenu>
              }
              title={dataSingle.nomGroupe}
              subheader={dateParser(dataSingle.dateGroupe)}
            />

            <DescriptionCard
              subheader='Description: '
              expand={expandedDescription}
              onClick={handleExpandDescription}
              expanded={expandedDescription}
            ></DescriptionCard>

            <CollapseGroupSingle expand={expandedDescription}>
              {dataSingle.description ? (
                <EditDescription
                  subheader={
                    // 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ipsam labore velit sed. Reprehenderit modi voluptates vitae doloribus quis maiores veritatis velit et!'
                    dataSingle.description
                  }
                />
              ) : (
                <EmptyDescription></EmptyDescription>
              )}
            </CollapseGroupSingle>

            <MemberCard
              subheader='Members: '
              expand={expandedMember}
              onClick={handleExpandMember}
              aria-expanded={expandedMember}
            ></MemberCard>

            <CollapseGroupSingle expand={expandedMember}>
              <CardContentMember>
                {membersData ? (
                  membersData.map((member) => (
                    <CardHeaderMember
                      key={member.utilisateurId}
                      avatar={
                        member.photoProfil
                          ? PhotoMember(member)
                          : LogoMemberDefault(member)
                      }
                      subheader={member.pseudo}
                      action={
                        <AdminTypography>
                          {member.admin === 'true' && 'admin'}
                        </AdminTypography>
                      }
                    />
                  ))
                ) : (
                  <AddPersonIcon
                    color='primary'
                    sx={{ mt: -1, ml: 20 }}
                  ></AddPersonIcon>
                )}
              </CardContentMember>
            </CollapseGroupSingle>
            <GroupSingleIcon>See on map</GroupSingleIcon>
          </CardSingleGroup>
        </div>
      </>
    );
  }

  if (isLoad & !dataSingle) return null;

  return <Loader />;
};

export default GroupSingle;
