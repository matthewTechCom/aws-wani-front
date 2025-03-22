// src/lib/cognito.ts
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserAttribute,
  } from 'amazon-cognito-identity-js';
  
  const poolData = {
    UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  };
  
  const userPool = new CognitoUserPool(poolData);
  
  export {
    userPool,
    CognitoUser,
    CognitoUserAttribute,
    AuthenticationDetails,
  };

  export const getCurrentUser = () => {
    return userPool.getCurrentUser();
  };
  