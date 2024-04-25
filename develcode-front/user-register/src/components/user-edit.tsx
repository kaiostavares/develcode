import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

type FormValues = {
  perfil: FileList;
  nome: string;
  username: string;
  aniversario: string;
};

type UserResponse = {
  imageBase64: string;
  name: string;
  code: string;
  birthDate: string;
};

export function UserEdit() {
  const { userId } = useParams<{ userId: string }>();
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        if (response.ok) {
          const userData: UserResponse = await response.json();
          setUserData(userData);
          setValue('nome', userData.name);
          setValue('username', userData.code);
          setValue('aniversario', userData.birthDate);
          setImagePreview(`data:image/${getImageType(userData.imageBase64)};base64,${userData.imageBase64}`);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId, setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(fileList[0]);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const base64String = imagePreview.split(',')[1];
      const newUserData: UserResponse = {
        imageBase64: base64String == userData?.imageBase64 ? '' :base64String,
        name: data.nome == userData?.name ? '' : data.nome,
        code: data.username == userData?.code ? '' : data.username,
        birthDate: data.aniversario == userData?.birthDate ? '': data.aniversario
      };
      const response = await fetch(`http://localhost:8080/users/${userId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData),
      });

      if (response.ok) {
        window.location.href = '/';
      } else if (response.status === 409) {
        setUsernameError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="mb-4 flex-col items-center justify-center" style={{ textAlign: 'center' }}>
        <label htmlFor="perfil" className="block text-sm font-medium text-gray-700 mb-2">Foto de Perfil:</label>
        <input
          type="file"
          id="perfil"
          accept="image/*"
          {...register('perfil')}
          onChange={handleFileChange}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        />
        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2" style={{ maxWidth: '200px', maxHeight: '200px', display: 'block' }} />}
      </div>
      <div className="mb-4">
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">Nome:</label>
        <input type="text" id="nome" {...register('nome')} required className="border border-gray-300 px-4 py-2 rounded-lg w-full"/>
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username:</label>
        <input
          type="text"
          id="username"
          {...register('username')}
          required
          className={`border ${usernameError ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg w-full`}
          autoComplete='off'
        />
        {usernameError && <p className="text-red-500 text-sm mt-1">Já existe um username com este nome.</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="aniversario" className="block text-sm font-medium text-gray-700 mb-2">Aniversário:</label>
        <input type="date" id="aniversario" {...register('aniversario')} required className="border border-gray-300 px-4 py-2 rounded-lg w-full"/>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg">Enviar</button>
    </form>
  );
}

function getImageType(base64String: string): string {
  const base64Header = base64String.substring(0, 30);

  if (base64Header.includes("image/png")) {
    return "png";
  }
  if (
    base64Header.includes("image/jpeg") ||
    base64Header.includes("image/jpg")
  ) {
    return "jpeg";
  }
  return "png";
}
