'use client';

import React, { useState } from 'react';
import {
  CognitoUserAttribute,
  userPool,
  CognitoUser,
} from '@/app/lib/cognito';
import { useRouter } from 'next/navigation'; // ← 追加
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter(); // ← 追加
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [step, setStep] = useState<'signup' | 'confirm'>('signup');

  const handleSignUp = () => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        console.error('SignUp error:', err);
        alert(err.message || 'サインアップ失敗');
        return;
      }

      console.log('SignUp success:', result);
      setStep('confirm');
    });
  };

  const handleConfirm = () => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        console.error('Confirm error:', err);
        alert(err.message || '確認失敗');
        return;
      }

      console.log('Confirm success:', result);
      alert('登録完了！ログインしてください。');
      router.push("/login"); // ← ログイン画面に遷移
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 space-y-6 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400" />
        {step === 'signup' ? (
          <>
          <div className="text-center space-y-2">
            <img
              src="/wani.jpg"
              alt="Cute Dinosaur"
              className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-green-100"
            />
            <h1 className="text-2xl font-bold text-gray-900">サインアップ</h1>
            <p className="text-sm text-gray-500">新しい冒険を始めましょう！</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">メールアドレス</label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="w-full border border-slate-500 rounded-s-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password">パスワード</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="8文字以上のパスワード"
                  className="w-full pr-10 border border-slate-500  rounded-s-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
            <button 
              className="w-full my-3 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white rounded-4xl"
              onClick={handleSignUp}
            >
              登録
            </button>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500">
              すでにアカウントをお持ちの場合は{" "}
              <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                ログイン
              </Link>
            </p>
          </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">確認コードを入力</h2>
            <p className="text-sm mb-4 text-center text-gray-600 dark:text-gray-300">
              メールに届いた確認コードを入力してください。
            </p>
            <input
              type="text"
              placeholder="確認コード"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              className="mb-6 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 text-black dark:text-white"
            />
            <button
              onClick={handleConfirm}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full transition"
            >
              確認
            </button>
          </>
        )}
      </div>
    </div>
  );
}
