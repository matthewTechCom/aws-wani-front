'use client';

import React, { useState } from 'react';
import {
  CognitoUser,
  AuthenticationDetails,
  userPool,
} from '@/app/lib/cognito'; // あなたのcognito設定ファイル
import { useUser } from '@/app/context/UserContext'; // Contextをimport
import { useRouter } from 'next/navigation'; // 任意で画面遷移したい場合に使用
import Link from 'next/link';

export default function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken, setEmail } = useUser(); // Contextからsetterを取得
  const router = useRouter(); // 画面遷移したいとき用（任意）
  const clientId = "1cf6e5bu3c4asa0m5dfo5blkjq";
  const cognitoDomain = "https://us-west-2eyqu6wtem.auth.us-west-2.amazoncognito.com";
  const redirectUri = "http://localhost:3000/api/auth/callback/google"; // ← ✅スラッシュなしに戻す
  const loginUrl = `${cognitoDomain}/oauth2/authorize?identity_provider=Google&response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email+openid+profile`;
  
  console.log(loginUrl)


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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center p-4">
    <div className="w-full max-w-md p-6 space-y-6 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400" />
      
      <div className="text-center space-y-2">
        <img
          src="/wani.jpg"
          alt="Cute Dinosaur"
          className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-green-100"
        />
        <h1 className="text-2xl font-bold text-gray-900">ログイン</h1>
        <p className="text-sm text-gray-500">さあ始めましょう！</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            className="w-full border border-slate-500 rounded-s-sm"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password">パスワード</label>
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder="8文字以上のパスワード"
              className="w-full pr-10 border border-slate-500 rounded-s-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              className="w-full my-4 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white rounded-4xl" 
              onClick={handleLogin}
            >
              登録
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500">
          まだアカウントをお持ちでないですか？{" "}
          <Link href="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
            サインアップ
          </Link>
        </p>
      </div>

      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-green-100 rounded-full opacity-50" />
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-100 rounded-full opacity-50" />
    </div>
  </div>
  );
  
}
