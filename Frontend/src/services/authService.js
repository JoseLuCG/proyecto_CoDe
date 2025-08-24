export const loginUser = async (phoneNumber, password) => {
    // Aquí puedes realizar una llamada a una API para autenticar al usuario
    // Esta es una simulación de la respuesta de la API.
  
    if (phoneNumber === '1234567890' && password === 'password123') {
      return { success: true };
    } else {
      return { success: false };
    }
  };