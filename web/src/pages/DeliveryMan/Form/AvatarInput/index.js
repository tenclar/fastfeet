import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import api from '~/services/api';
import { Container } from './styles';

export default function AvatarInput({ name }) {
  const { defaultValue = {}, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      if (defaultValue !== null) {
        setPreview(defaultValue.id);
        setPreview(defaultValue.url);
      }
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [defaultValue, ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt=""
        />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          name={name}
          ref={ref}
        />
      </label>
      <span>Click para Alterar</span>
    </Container>
  );
}
AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
};
