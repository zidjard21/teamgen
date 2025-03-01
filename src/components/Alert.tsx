import { useState } from 'react';

const useAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => handleCloseAlert(), 2000);
  };

  return { showAlert, handleShowAlert, handleCloseAlert };
};

export default useAlert;