import { useForm, SubmitHandler } from 'react-hook-form';
import defaultImage from '../assets/default-avatar.png';
import { useState } from 'react';

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

export function UserRegister() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [usernameError, setUsernameError] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const imagePreview = document.getElementById('image-preview') as HTMLImageElement;
        if (imagePreview) {
          imagePreview.src = reader.result as string;
        }
      };
      reader.readAsDataURL(fileList[0]);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = data => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result?.toString().split(',')[1];
      const userResponse: UserResponse = {
        imageBase64: base64String || '',
        name: data.nome,
        code: data.username,
        birthDate: data.aniversario
      };
      console.log(userResponse);
      
      try {
        const response = await fetch('http://localhost:8080/users/signUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userResponse),
        });

        if (response.ok) {
          // Redirecionar em caso de sucesso
          window.location.href = '/';
        } else if (response.status === 409) {
          // Mostrar erro de conflito de username
          setUsernameError(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    reader.readAsDataURL(data.perfil[0]);
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
          required
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        />
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <img src={defaultImage} id="image-preview" alt="Preview" className="mt-2" style={{ maxWidth: '200px', maxHeight: '200px', display: 'inline-block' }} />
        </div>
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
