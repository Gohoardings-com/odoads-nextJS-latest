import React, { useState,createContext, useReducer } from 'react';

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <AccountContext.Provider value={{show, handleClose, handleShow}}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;