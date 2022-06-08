import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfos from '../../hooks/UserInfos';
import UseGroups from '../../hooks/UseGroups';
import GroupFormMaterial from '../../ui/group/GroupFormMaterial';
import InputGroup from '../../ui/group/InputGroup';

const GroupForm = () => {
  const [formData, setFormData] = useState({
    groupName: '',
    groupDescription: '',
  });
  const groupNameRef = useRef();
  const descriptionRef = useRef();

  const navigate = useNavigate();
  const {
    GroupFormPaper,
    GroupFormAppbar,
    GroupFormAvatar,
    DivForm,
    CustomButton,
    CustomButtonDisabled,
  } = GroupFormMaterial();

  const handleBackToHome = () => {
    return navigate('/', { replace: true });
  };
  const { userData } = UserInfos();
  const { createGroup, loadGroupsData } = UseGroups();

  const handleCreate = async (e) => {
    const data = {
      nomGroupe: formData.groupName,
      description: formData.groupDescription,
      createur: userData.utilisateurId,
    };

    e.preventDefault();
    if (formData.groupName) {
      return await createGroup(userData.utilisateurId, data)
        .then(async (res) => {
          if (!res.err) {
            const finalData = [{ groupeCode: res.data.data.codeGroupe }];
            console.log(res);
            console.log(finalData);
            await loadGroupsData(userData.utilisateurId, finalData).then(() =>
              handleBackToHome(),
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <form
      action='formGroup'
      className='groupContainerForm'
      onSubmit={handleCreate}
    >
      <GroupFormPaper>
        <GroupFormAppbar
          onClick={handleBackToHome}
          title='New group'
          subTitle='Add subject'
        ></GroupFormAppbar>
        <GroupFormAvatar></GroupFormAvatar>
      </GroupFormPaper>
      <div className='groupInput'>
        <InputGroup
          required
          type='text'
          id='groupName'
          label='Name'
          name='groupName'
          autoComplete='false'
          onChange={onChange}
          ref={groupNameRef}
        />
        <InputGroup
          required={false}
          type='text'
          id='groupDescription'
          label='Description'
          name='groupDescription'
          autoComplete='false'
          onChange={onChange}
          ref={descriptionRef}
        />
      </div>
      <DivForm>Provide a group subject and optional group icon</DivForm>
      {formData.groupName ? (
        <CustomButton>create</CustomButton>
      ) : (
        <CustomButtonDisabled>create</CustomButtonDisabled>
      )}
    </form>
  );
};

export default GroupForm;
