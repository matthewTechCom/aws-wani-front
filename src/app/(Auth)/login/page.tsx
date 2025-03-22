'use client';

import React, { useState } from 'react';
import {
  CognitoUser,
  AuthenticationDetails,
  userPool,
} from '@/app/lib/cognito'; // あなたのcognito設定ファイル
import { useUser } from '@/app/context/UserContext'; // Contextをimport
import { useRouter } from 'next/navigation'; // 任意で画面遷移したい場合に使用

export default function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken, setEmail } = useUser(); // Contextからsetterを取得
  const router = useRouter(); // 画面遷移したいとき用（任意）

  const handleLogin = () => {
    const userData = {
      Username: inputEmail,
      Pool: userPool,
    };

    const authDetails = new AuthenticationDetails({
      Username: inputEmail,
      Password: password,
    });

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const token = result.getIdToken().getJwtToken();
        const claims = result.getIdToken().decodePayload();

        // ✅ Contextに格納
        setAccessToken(token);
        setEmail(claims.email);

        console.log('✅ Login success:', claims.email);
        alert(`ようこそ ${claims.email} さん！`);

        // 任意でページ遷移
        router.push('/'); // ← 任意
      },

      onFailure: (err) => {
        console.error('❌ Login failed:', err);
        alert('ログインに失敗しました');
      },
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>ログイン</h2>
      <input
        type="email"
        placeholder="メールアドレス"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
}
