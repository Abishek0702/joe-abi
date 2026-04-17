import { createContext, useContext, useState } from 'react';

const ValentineContext = createContext();

export function ValentineProvider({ children }) {
  const [lastQuote, setLastQuote] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // { url, tag }
  const [emailSent, setEmailSent] = useState(false);

  return (
    <ValentineContext.Provider
      value={{
        lastQuote,
        setLastQuote,
        selectedImage,
        setSelectedImage,
        emailSent,
        setEmailSent,
      }}
    >
      {children}
    </ValentineContext.Provider>
  );
}

export function useValentine() {
  return useContext(ValentineContext);
}
